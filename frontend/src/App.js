// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import OldItems from "./components/OldItems";
import NewItems from "./components/NewItems";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/old-items" element={<OldItems />} />
        <Route path="/new-items" element={<NewItems />} />
      </Routes>
    </Router>
  );
}

export default App;
