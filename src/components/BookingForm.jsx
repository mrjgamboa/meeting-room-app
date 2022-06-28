import {
  getUnixTime,
  parseISO,
  format,
} from 'date-fns';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import timeToSeconds from '../helper/timeToSeconds';

export default function BookingForm() {
  const { data: roomList, isPending, error } = useFetch('http://localhost:8000/rooms');
  const [formState, setFormState] = useState({});
  const [formUnixTime, setFormUnixTime] = useState({});
  const [formErrorState, setFormErrorState] = useState({});
  const [lastEvent, setLastEvent] = useState(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [emptyFields, setEmptyFields] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);

  const todayInUnix = getUnixTime(parseISO(format(new Date(), 'yyyy-MM-dd')));

  useEffect(() => {
    const formInitialState = {
      room: '',
      host: '',
      guest: '',
      date: '',
      startTime: '',
      endTime: '',
    };
    setFormState(formInitialState);
    setFormErrorState(formInitialState);
    setEmptyFields(Object.values(formInitialState).length);
  }, []);

  const getValidationMessage = (target) => {
    const {
      id,
      value,
      type,
      name,
    } = target;

    if (value === '') return `${name} is required`;
    if (type === 'text') {
      if (value.length < 3) return `${name} name is too short`;
      if (value.length > 50) return `${name} name is too long`;
    }

    switch (id) {
      case 'room':
        break;
      case 'host':
        break;
      case 'guest':
        break;
      case 'date': {
        if (todayInUnix > getUnixTime(parseISO(value))) {
          return 'you cannot book a meeting in the past';
        }
        break;
      }
      case 'startTime': {
        if (timeToSeconds(value) < 28800) return '8AM is the minimum start time';
        if (timeToSeconds(value) > 61200) return '5PM is the maximum start time';
        break;
      }
      case 'endTime': {
        if ((typeof formUnixTime.startTime) !== 'number') {
          return 'set the start time first';
        }
        if (timeToSeconds(value) < 30600) return '8:30AM is the minimum end time';
        if (timeToSeconds(value) > 64800) return '6PM is the maximum end time';
        if ((typeof formUnixTime.startTime === 'number')) {
          if (formUnixTime.startTime > 0) {
            if ((timeToSeconds(value) - formUnixTime.startTime) <= 0) {
              return 'end time should be higher than start time';
            }
            if ((timeToSeconds(value) - formUnixTime.startTime) < 1800) {
              return 'meeting should be 30 minutes or more';
            }
            if ((timeToSeconds(value) - formUnixTime.startTime) > 3600) {
              return 'meeting should not be higher than 1 hour';
            }
          }
        }
        break;
      }
      default: return `No special case validation! Element ID: ${id}`;
    }

    return ''; // empty string since there is no error
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
    setLastEvent(e);
  };

  useEffect(() => {
    if (lastEvent) {
      setFormErrorState({
        ...formErrorState,
        [lastEvent.target.id]: getValidationMessage(lastEvent.target),
      });
    }
  }, [lastEvent]);

  useEffect(() => {
    if (lastEvent) {
      ['date', 'startTime', 'endTime'].forEach(((id) => {
        if (lastEvent.target.id === id) {
          setFormUnixTime({
            ...formUnixTime,
            [id]: (id === 'date') ? (
              getUnixTime(parseISO(lastEvent.target.value))
            ) : (timeToSeconds(lastEvent.target.value)),
          });
        }
      }));
    }
  }, [lastEvent]);

  useEffect(() => {
    if (lastEvent) {
      let count = 0;
      Object.values(formState).forEach((value) => {
        if (value === '') count += 1;
      });
      setEmptyFields(count);
    }
  }, [lastEvent]);

  useEffect(() => {
    if (lastEvent) {
      let count = Object.keys(formErrorState).length;
      Object.values(formErrorState).forEach((value) => {
        if (value === '') count -= 1;
      });
      setErrorCount(count);
    }
  }, [formErrorState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitClicked) setIsSubmitClicked(true);

    if ((emptyFields === 0) && (errorCount === 0)) {
      setIsPendingSubmit(true);
      fetch('http://localhost:8000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          date: formUnixTime.date,
          startTime: formUnixTime.startTime,
          endTime: formUnixTime.endTime,
        }),
      }).then(() => {
        setIsPendingSubmit(false);
      });
    }
  };

  const {
    host,
    guest,
    date,
    startTime,
    endTime,
  } = formState;

  return (
    <div className='mb-8'>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {roomList && (
        <div className='max-w-sm mx-auto'>
          <h3 className='text-lg font-sans text-center'>Add a New Booking</h3>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <label
              htmlFor='room'
              className='block my-2 shadow-sm'
            >
              Meeting Room:
              <select
                id='room'
                className='w-full shadow-sm p-1 rounded-sm bg-primary h-8'
                name='meeting room'
                onChange={handleChange}
              >
                <option value='' hidden>select a room</option>
                {roomList.map((roomListItem) => (
                  <option
                    value={roomListItem.name}
                    key={roomListItem.id + roomListItem.name}
                  >
                    {roomListItem.name}
                  </option>
                ))}
              </select>
            </label>
            {formErrorState.room && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.room}
              </small>
            )}
            <label
              htmlFor='host'
              className='block my-2 shadow-sm'
            >
              Host:
              <input
                id='host'
                type='text'
                className='w-full shadow-sm p-1 rounded-sm md:pl-4'
                name='host'
                value={host}
                onChange={handleChange}
              />
            </label>
            {formErrorState.host && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.host}
              </small>
            )}
            <label
              htmlFor='guest'
              className='block my-2 shadow-sm'
            >
              Guest:
              <input
                id='guest'
                type='text'
                name='guest'
                className='w-full shadow-sm p-1 rounded-sm md:pl-4'
                value={guest}
                onChange={handleChange}
              />
            </label>
            {formErrorState.guest && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.guest}
              </small>
            )}
            <label
              htmlFor='date'
              className='block my-2 shadow-sm'
            >
              Meeting Date:
              <input
                id='date'
                type='date'
                name='Meeting date'
                className='w-full shadow-sm p-1 rounded-sm md:pl-4'
                value={date}
                onChange={handleChange}

              />
            </label>
            {formErrorState.date && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.date}
              </small>
            )}
            <label
              htmlFor='startTime'
              className='block my-2 shadow-sm'
            >
              Start time:
              <input
                id='startTime'
                type='time'
                name='start time'
                className='w-full shadow-sm p-1 rounded-sm md:pl-4'
                value={startTime}
                onChange={handleChange}
              />
            </label>
            {formErrorState.startTime && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.startTime}
              </small>
            )}
            <label
              htmlFor='endTime'
              className='block my-2 shadow-sm'
            >
              End time:
              <input
                id='endTime'
                type='time'
                name='end time'
                className='w-full shadow-sm p-1 rounded-sm md:pl-4'
                value={endTime}
                onChange={handleChange}
              />
            </label>
            {formErrorState.endTime && (
              <small className='text-red-500 ml-2 md:ml-4'>
                {formErrorState.endTime}
              </small>
            )}
            {!isPendingSubmit && (
              <button
                type='submit'
                className='w-auto shadow-md p-1 rounded-sm block ml-auto
                text-accent-blue-light hover:text-accent-blue-dark'
              >
                Submit
              </button>
            )}
            {isPendingSubmit && (
              <button
                type='submit'
                className='w-auto shadow-md p-1 rounded-sm block ml-auto
                text-accent-blue-light hover:text-accent-blue-dark'
                disabled
              >
                Adding blog...
              </button>
            )}
            {isSubmitClicked && (
              <small className='text-red-500 text-right block ml-auto mt-2'>
                {(errorCount > 0) && (
                  `${errorCount} ${errorCount > 1 ? 'errors' : 'error'}`
                )}
                {((errorCount > 0) && (emptyFields > 0)) ? (', ') : ('')}
                {(emptyFields > 0) && (
                  `${emptyFields} empty ${emptyFields > 1 ? 'fields' : 'field'}`
                )}
              </small>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
