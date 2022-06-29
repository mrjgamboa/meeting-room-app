import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function MeetingRoomList() {
  const { data: rooms, isPending, error } = useFetch('http://localhost:8000/rooms');

  return (
    <div className='max-w-md mx-auto p-1'>
      {error && (<div>{error}</div>)}
      {isPending && (<div>Loading...</div>)}
      {rooms && (
        (rooms.length > 0) ? (
          rooms.map((room) => (
            <Link
              to={`${room.id}`}
              key={room.id}
            >
              <div
                className='w-full shadow-sm hover:shadow-md my-4 p-1 md:p-4
                rounded bg-black-400'
              >
                <h3 className='capitalize font-sans text-lg'>
                  {room.name}
                </h3>
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
