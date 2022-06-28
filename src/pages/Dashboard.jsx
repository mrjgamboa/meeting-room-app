import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <h2 className='font-sans text-2xl my-4 text-accent-orange-light md:text-4xl'>
        Dashboard
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Link to='bookings'>View Bookings</Link>
        <div className='bg-red-200'>02</div>
        <div className='bg-red-200'>03</div>
        <div className='bg-red-200'>04</div>
        <div className='bg-red-200'>05</div>
        <div className='bg-red-200'>06</div>
        <div className='bg-red-200'>07</div>
        <div className='bg-red-200'>08</div>
        <div className='bg-red-200'>09</div>
      </div>
    </>
  );
}
