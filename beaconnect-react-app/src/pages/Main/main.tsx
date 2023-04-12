import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search/search';
import Profile from './pages/Profile/profile';
import NavBar from './components/NavBar/navBar';
import './components/main.css';
import './pages/Home/components/home.css';
import Homepage from './pages/Home/components/homepage';

const Main = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <div className="homePage">
    <NavBar isLoggedIn={isLoggedIn} />
    <Suspense fallback={<p>loading</p>}>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Suspense>
  </div>
);

export default Main;
