import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

function BookingList({ url }) {
  const { data: bookings, isPending, error } = useFetch(url);
  return (
    <div>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {bookings && (
        bookings.map((booking) => (
          <div key={booking.id}>
            {booking.id}
          </div>
        ))
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
