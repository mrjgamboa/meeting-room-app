import {
  format, formatDistance, fromUnixTime, getUnixTime,
} from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function BookingList({ url }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const { data: bookings, isPending, error } = useFetch(currentUrl);

  const nowInUnix = getUnixTime(new Date());
  useEffect(() => {
    setCurrentUrl(url);
  }, []);

  return (
    <div className='max-w-md mx-auto p-1'>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {bookings && (
        bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={`${booking.id}`}
              key={booking.id}
            >
              <div
                className='w-full shadow-sm hover:shadow-md my-4 p-1 md:p-4
                rounded bg-black-400'
              >
                <h4 className='capitalize font-sans text-lg'>
                  Host:
                  <span className='ml-2'>
                    {booking.host}
                  </span>
                </h4>
                <small className='opacity-60 text-right block'>
                  {/* {((booking.date + booking.startTime) - nowInUnix)} */}
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
              </div>
            </Link>
          ))
        ) : (
          'No record'
        )
      )}
    </div>
  );
}

BookingList.propTypes = {
  url: PropTypes.string,
};

BookingList.defaultProps = {
  url: 'http://localhost:8000/bookings',
};

export default BookingList;
