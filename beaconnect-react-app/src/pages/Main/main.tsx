import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import Search from './pages/Search/search';
import Profile from './pages/Profile/profile';
import Setting from './pages/Setting/setting';
import NavBar from './components/NavBar/navBar';
import Help from './pages/Help/help';
import './components/main.css';
import './pages/Home/components/home.css';
import Homepage from './pages/Home/homepage';

function Main({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="homePage">
      <NavBar isLoggedIn={isLoggedIn} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/search" element={<Search isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Homepage isLoggedIn={isLoggedIn} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Main;
