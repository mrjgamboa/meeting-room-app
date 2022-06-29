import {
  format, formatDistance, fromUnixTime, getUnixTime,
} from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Booking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const {
    data: booking,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/bookings/${bookingId}`);

  const nowInUnix = getUnixTime(new Date());

  const handleClickDelete = () => {
    fetch(`http://localhost:8000/bookings/${bookingId}`, {
      method: 'DELETE',
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='max-w-md mx-auto p-1'>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {booking && (
        <>
          <h4 className='capitalize font-sans text-lg'>
            Host:
            <span className='ml-2'>
              {booking.host}
            </span>
          </h4>
          <small className='opacity-60 text-right block'>
            {formatDistance(
              fromUnixTime(booking.date + booking.startTime),
              fromUnixTime(nowInUnix),
              { addSuffix: true },
            )}
          </small>
          <div className='pl-4'>
            <p>
              Guest:
              <span className='ml-2'>
                {booking.guest}
              </span>
            </p>
            <p>
              Date:
              <span className='ml-2'>
                {format(fromUnixTime(booking.date), 'MMMM dd, yyyy')}
              </span>
            </p>
            <p>
              Time:
              <span className='ml-2'>
                {format(fromUnixTime(booking.date + booking.startTime), 'h:mm:a')}
              </span>
              <span> - </span>
              <span>
                {format(fromUnixTime(booking.date + booking.endTime), 'h:mm:a')}
              </span>
            </p>
            <p>
              Room Name:
              <span className='ml-2 capitalize'>
                {booking.room}
              </span>
            </p>
          </div>
          <button
            type='button'
            onClick={handleClickDelete}
            className='block ml-auto shadow-sm hover:shadow-md p-2
            uppercase text-accent-orange-dark rounded font-sans'
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
