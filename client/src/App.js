import React from 'react';
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import Channel from './Channel';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/player/:id" element={<Player />}></Route>
              <Route path="/channel/:id" element={<Channel />}></Route>
          </Routes>
      </BrowserRouter>
  );
}
export default App;
