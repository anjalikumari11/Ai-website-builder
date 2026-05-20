import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Builder from './pages/Builder';
import Preview from './pages/Preview';

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;