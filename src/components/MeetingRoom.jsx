import { getUnixTime } from 'date-fns';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import BookingList from './BookingList';

export default function MeetingRoom() {
  const { meetingRoomId } = useParams();
  const nowInUnix = getUnixTime(new Date());
  console.log(nowInUnix);

  const {
    data: room,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/rooms/${meetingRoomId}`);
  return (
    <div className='max-w-md mx-auto p-1'>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {room && (
        <>
          <h4 className='capitalize font-sans text-lg'>
            {room.name}
          </h4>
          <p>Status:</p>
          <p className='text-right'>num upcoming</p>
          <p className='text-right'>num total</p>
          <BookingList url={`http://localhost:8000/bookings?room=${room.name}`} />
        </>
      )}
    </div>
  );
}
