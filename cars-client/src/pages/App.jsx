import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Contact from './contact';
import About from './about';
import Home from './home';
import DenseAppBar from './denseAppBar';


export default function App() {
  return (
    <>
      <DenseAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
