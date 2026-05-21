import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const date = time.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const day = time.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* BLUE TOPBAR */}
      <div className="topbar">
        <div className="container topbar-container">
          <div className="topbar-left">
            Welcome to the Information of Gumaca, Quezon website.
          </div>
          <div className="topbar-right">
            {date} | {day} | {currentTime}
          </div>
        </div>
      </div>

      {/* RED NAVBAR */}
      <nav className="navbar">
        <div className="container nav-container">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  );
}