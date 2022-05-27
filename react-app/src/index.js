import { createRoot } from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateBooking from "./pages/CreateBooking";
import BookingHistory from "./pages/BookingHistory";
import Admin from './pages/Admin';
import NoPage from "./pages/NoPage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<RequireLogout>
            <Register /></RequireLogout>} />
          <Route path="login" element={<RequireLogout>
            <Login /></RequireLogout>} />
          <Route path="createbooking" element={<RequireLogin>
            <CreateBooking /> </RequireLogin>} />
          <Route path="bookinghistory" element={<RequireLogin>
            <BookingHistory /> </RequireLogin>} />
          <Route path="admin" element={<RequireAdmin>
            <Admin /> </RequireAdmin>} />
          <Route path="profile" element={<RequireLogin>
            <Profile /> </RequireLogin>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

function RequireAdmin({ children }) {
  const authedAdmin = isAdmin();

  return authedAdmin === true ? children : <Navigate to="/profile" replace />;
}

function isAdmin() {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  if (parsedUser.role === "Admin") {
    return true;
  }
  else {
    return false;
  }
}

function RequireLogin({ children }) {
  const authed = isLoggedIn();

  return authed === true ? children : <Navigate to="/login" replace />;
}

function RequireLogout({ children }) {
  const notAuthed = isLoggedIn();

  return notAuthed === false ? children : <Navigate to="/profile" replace />
}

function isLoggedIn() {
  const user = localStorage.getItem("user");

  if (user) {
    return true;
  }
  else {
    return false;
  }
}