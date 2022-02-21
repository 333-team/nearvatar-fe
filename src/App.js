import React from 'react';
import Homepage from './Homepage.js';
import Dashboard from './Dashboard.js';
import Launchboard from './Launchboard.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mintbaseStore from './mintbase.js';

import {Buffer} from 'buffer';
window.Buffer = Buffer;

mintbaseStore.dispatch({
  type: 'init',
});

console.log(1)
console.log(mintbaseStore.getState());

function App() {
  return (
    <div className="min-w-1640px">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard/:address" element={<Dashboard />} />
          <Route path="/launchboard" element={<Launchboard />} />
        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;