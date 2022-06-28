import { NavLink } from 'react-router-dom';

const navLinkClassNameHelper = (isActive) => (isActive ? (
  'flex items-center text-accent-orange-light font-semibold'
) : (
  'flex items-center text-secondary hover:text-accent-orange-dark'
));

export default function Navbar() {
  return (
    <nav
      className='flex w-2/5 md:w-1/2 justify-evenly'
      aria-label='main'
    >
      <NavLink
        to='/'
        className={({ isActive }) => navLinkClassNameHelper(isActive)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 md:h-4 md:w-4 mr-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
        <span className='hidden md:inline-block'>
          Dashboard
        </span>
      </NavLink>
      <NavLink
        to='meeting-rooms'
        className={({ isActive }) => navLinkClassNameHelper(isActive)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 md:h-4 md:w-4 mr-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4
            4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
          />
        </svg>
        <span className='hidden md:inline-block'>
          Meeting Rooms
        </span>
      </NavLink>
      <NavLink
        to='bookings'
        className={({ isActive }) => navLinkClassNameHelper(isActive)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 md:h-4 md:w-4 mr-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2
            2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        <span className='hidden md:inline-block'>
          Bookings
        </span>
      </NavLink>
    </nav>
  );
}
