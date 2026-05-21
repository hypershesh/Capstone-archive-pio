import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Component
import Navbar from './components/Navbar';

// Page Components
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// MGA REQUEST COMPONENTS MULA SA REQUESTS FOLDER
import SocialMediaRequest from './components/Requests/1socialmedia';
import ImageLayoutRequest from './components/Requests/2imagelayout';
import PrintedMediaRequest from './components/Requests/3printedmedia';
import PhotoCoverageRequest from './components/Requests/4photocoverage';
import VideoCoverageRequest from './components/Requests/5videocoverage';
import VideoEditingRequest from './components/Requests/6videoediting';
import RadioProgramRequest from './components/Requests/7radioprogram';
import StreamingRequest from './components/Requests/8streaming';
import EquipmentRequest from './components/Requests/9equipment';
import LeaveRequest from "./components/Requests/10leave";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* NAV BAR - Ito yung may 4 links na centered */}
        <Navbar />

        {/* ROUTES CONFIGURATION */}
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* ABOUT PAGE */}
          <Route path="/about" element={<About />} />

          {/* SERVICES PAGE */}
          <Route path="/services" element={<Services />} />

          {/* ROUTE PARA SA REQUEST FOR SOCIAL MEDIA */}
          <Route
            path="/request/social-media"
            element={<SocialMediaRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR IMAGE LAYOUT OR EDITING */}
          <Route
            path="/request/image-layout"
            element={<ImageLayoutRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR PRINTED MEDIA OR PUBLICATIONS */}
          <Route
            path="/request/printed-media"
            element={<PrintedMediaRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR PHOTO COVERAGE */}
          <Route
            path="/request/photo-coverage"
            element={<PhotoCoverageRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR VIDEO COVERAGE */}
          <Route
            path="/request/video-coverage"
            element={<VideoCoverageRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR VIDEO EDITING */}
          <Route
            path="/request/video-editing"
            element={<VideoEditingRequest />}
          />

          {/* ROUTE PARA SA REQUEST FOR RADIO PROGRAM */}
          <Route
            path="/request/radio-program"
            element={<RadioProgramRequest />}
          />

          {/* RUTA PARA SA REQUEST FOR LIVE STREAMING */}
          <Route path="/request/streaming" element={<StreamingRequest />} />

          {/* RUTA PARA SA EQUIPMENT MAINTENANCE AND REPAIR */}
          <Route path="/request/equipment" element={<EquipmentRequest />} />

          {/* RUTA PARA SA APPLICATION FOR LEAVE OF ABSENCE */}
          <Route path="/request/leave-absence" element={<LeaveRequest />} />

          {/* CONTACT PAGE */}
          <Route path="/contact" element={<Contact />} />

          {/* Fallback route para sa mga maling URL */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}