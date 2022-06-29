import { Outlet } from 'react-router-dom';

export default function MeetingRooms() {
  return (
    <div>
      <h2 className='font-sans text-2xl my-4 text-accent-orange-light md:text-4xl'>
        Meeting Rooms
      </h2>
      <Outlet />
    </div>
  );
}
