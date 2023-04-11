import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search/search';
import NavBar from './components/NavBar/navBar';
import './components/main.css';
import './pages/Home/components/home.css';
import Homepage from './pages/Home/components/homepage';

const Main = () => (
  <div className="homePage">
    <NavBar />
    <Suspense fallback={<p>loading</p>}>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Suspense>
  </div>
);

export default Main;
