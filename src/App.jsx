import { Outlet } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      {/* nav */}
      {/* main start */}
      <Outlet />
      {/* main end */}
    </div>
  );
}
