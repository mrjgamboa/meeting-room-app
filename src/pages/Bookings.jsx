import { Outlet } from 'react-router-dom';

export default function Bookings() {
  return (
    <div>
      <h2 className='font-sans text-2xl my-4 text-accent-orange-light md:text-4xl'>
        Bookings
      </h2>
      <Outlet />
    </div>
  );
}
