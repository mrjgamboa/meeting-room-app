import Navbar from './Navbar';

export default function Header() {
  return (
    <header
      className='shadow-lg w-screen p-4'
    >
      <div className='max-w-screen-lg mx-auto flex justify-between'>
        <h1
          className='text-accent-blue-light text-xl md:text-2xl'
        >
          <span className='align-middle md:hidden'>
            MRA
          </span>
          <span className='hidden md:inline-block'>
            Meeting Room App
          </span>
        </h1>
        <Navbar />
      </div>
    </header>
  );
}
