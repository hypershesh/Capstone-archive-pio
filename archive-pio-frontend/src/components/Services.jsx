import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import logo from '../assets/gmc-logo.png';
import header_about from '../assets/About_header_bg.png';

export default function Services() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const pioServices = [
    { id: 1, title: 'Request for Social Media', path: '/request/social-media' },
    {
      id: 2,
      title: 'Request for Image Layout or Editing',
      path: '/request/image-layout',
    },
    {
      id: 3,
      title: 'Request for Printed Media',
      path: '/request/printed-media',
    },
    { id: 4, title: 'Request Photo Coverage', path: '/request/photo-coverage' },
    { id: 5, title: 'Request Video Coverage', path: '/request/video-coverage' },
    { id: 6, title: 'Request video editing', path: '/request/video-editing' },
    { id: 7, title: 'Request Radio Program', path: '/request/radio-program' },
    {
      id: 8,
      title: 'Request for Live Video Streaming',
      path: '/request/streaming',
    },
    { id: 9, title: 'Request for IT Equipment', path: '/request/equipment' }, // Itinama ang path para mag-match sa App.jsx route
    {
      id: 10,
      title: 'Application for leave of absence',
      path: '/request/leave-absence',
    },
  ];

  const handleOpenService = (path) => {
    if (path) {
      navigate(path);
    } else {
      alert('Ang service na ito ay hindi pa available.');
    }
  };

  return (
    <div className="services-page">
      {/* HEADER BANNER */}
      <div className="services-header">
        <img
          src={header_about}
          alt="Services Header Background"
          className="services-bg-img"
        />
        <div className="services-overlay-content container">
          <div className="logo-wrapper">
            <img src={logo} alt="Gumaca Logo" className="header-logo" />
            <div className="logo-text-services">
              <h2>PIO Services</h2>
              <h4>
                Public Information Office Online Request and Management Services
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SERVICES CONTENT */}
      <div className="container services-content-wrapper">
        <div className="request-services-section">
          <h2 className="services-main-title">
            Available PIO Request Services
          </h2>

          <div className="services-cards-grid">
            {pioServices.map((service) => (
              <div key={service.id} className="service-card-item">
                <div className="service-card-top"></div>
                <div className="service-card-bottom">
                  <h3>{service.title}</h3>
                  <button
                    className="service-open-btn"
                    onClick={() => handleOpenService(service.path)}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="back-home-wrapper">
            <button className="back-home-btn" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}