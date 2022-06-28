import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './components/Booking';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import MeetingRooms from './pages/MeetingRooms';
import MeetingRoom from './components/MeetingRoom';
import MeetingRoomList from './components/MeetingRoomList';
import NotFound from './pages/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path='bookings' element={<Bookings />}>
            <Route path=':bookingId' element={<Booking />} />
            <Route path='new' element={<BookingForm />} />
            <Route index element={<BookingList />} />
          </Route>
          <Route path='meeting-rooms' element={<MeetingRooms />}>
            <Route path=':meetingRoomId' element={<MeetingRoom />} />
            <Route index element={<MeetingRoomList />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
