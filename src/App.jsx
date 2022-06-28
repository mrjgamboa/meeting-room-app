import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <div
      className='App bg-primary text-secondary overflow-x-hidden'
    >
      <Header />
      <main className='font-serif m-4'>
        <div className='max-w-screen-lg mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

//! install json server
