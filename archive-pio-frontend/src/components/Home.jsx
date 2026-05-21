import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. I-import ang useNavigate
import './Home.css';
import logo from '../assets/gmc-logo.png';
import fb from '../assets/fb-home.png';
import email from '../assets/email-home.png';
import phone from '../assets/phone-home.png';
import home_img from '../assets/Home-img.png';

export default function Home() {
  const navigate = useNavigate(); // 👈 2. I-initialize ang navigate function

  // Functions para sa paglipat ng page
  const handleNavigateToAbout = () => {
    navigate('/about'); 
  };


  // 👈 BAGONG FUNCTION: Para sa View More Services button papuntang Services Page
  const handleNavigateToServices = () => {
    navigate('/services');
  };

  // 👈 BAGONG FUNCTION: Para sa mga Open button ng bawat individual card
  const handleOpenForm = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      {/* HEADER */}
      <div className="home_heading">
        <div className="container header-content">
          {/* LEFT */}
          <div className="logo-wrapper">
            <img src={logo} alt="Logo" />
            <div className="logo-text">
              <h2>Municipality of Gumaca</h2>
              <h4>Province of Quezon</h4>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-section">
            <div className="info-item">
              <img src={fb} alt="Facebook" />
              <p>We love Gumaca</p>
            </div>

            <div className="info-item">
              <img src={email} alt="Email" />
              <p>gumaca@gmail.com</p>
            </div>

            <div className="info-item">
              <img src={phone} alt="Phone" />
              <p>09102312232</p>
            </div>


          </div>
        </div>
      </div>

      {/* HOME SECTION */}
      <div className="home-main">
        {/* LEFT IMAGE */}
        <div className="home-left">
          <img src={home_img} alt="Home" />
        </div>

        {/* RIGHT (blank or content) */}
        <div className="home-right">{/* video ilalagay ko dito so huwag ginalaw */}</div>
      </div>

      {/* PUBLIC INFO & MUNICIPAL PROFILE SECTION */}
      <div className="home-info-section">
        <div className="container">
          
          {/* GUMACA PIO ROW */}
          <div className="info-row">
            <div className="info-text">
              <h1>Gumaca Public Information Office</h1>
              <p>Delivering timely and accessible public information through digital innovation and community engagement.</p>
            </div>
            <div className="info-image">
              <img src={home_img} alt="Gumaca Town Hall" />
            </div>
          </div>

          {/* MUNICIPAL PROFILE ROW */}
          <div className="info-row">
            <div className="info-text">
              <h1>Municipal Profile</h1>
              <p>"One of the oldest and most progressive municipalities in Quezon Province, serving as a center of trade, religion, and governance."</p>
            </div>
            <div className="info-image">
              <img src={home_img} alt="Gumaca Town Hall" />
            </div>
          </div>

          {/* STATS / INFO BOXES */}
          <div className="stats-container">
            <div className="stat-box">
              <span>Province</span>
              <strong>Quezon Province</strong>
            </div>
            <div className="stat-box">
              <span>Classification</span>
              <strong>1st class municipality</strong>
            </div>
            <div className="stat-box">
              <span>Barangays</span>
              <strong>59</strong>
            </div>
          </div>

          {/* LEARN MORE BUTTON */}
          <div className="learn-more-wrapper">
            <button className="learn-more-btn" onClick={handleNavigateToAbout}>
              Learn More
            </button>
          </div>
          
          {/* REQUEST SERVICES SECTION */}
          <div className="request-services-section">
            <hr className="services-divider" />
            <h2 className="services-main-title">Request Services</h2>
            
            <div className="services-cards-grid">
              {/* Card 1 - Social Media */}
              <div className="service-card-item">
                <div className="service-card-top"></div>
                <div className="service-card-bottom">
                  <h3>Request for Social Media</h3>
                  {/* 👈 Idinagdag ang onClick papuntang /request/social-media */}
                  <button className="service-open-btn" onClick={() => handleOpenForm('/request/social-media')}>
                    Open
                  </button>
                </div>
              </div>

              {/* Card 2 - Radio Program */}
              <div className="service-card-item">
                <div className="service-card-top"></div>
                <div className="service-card-bottom">
                  <h3>Request Radio Program</h3>
                  {/* 👈 Idinagdag ang onClick papuntang /request/radio-program */}
                  <button className="service-open-btn" onClick={() => handleOpenForm('/request/radio-program')}>
                    Open
                  </button>
                </div>
              </div>

              {/* Card 3 - Printed Media */}
              <div className="service-card-item">
                <div className="service-card-top"></div>
                <div className="service-card-bottom">
                  <h3>Request for Printed Media</h3>
                  {/* 👈 Idinagdag ang onClick papuntang /request/printed-media */}
                  <button className="service-open-btn" onClick={() => handleOpenForm('/request/printed-media')}>
                    Open
                  </button>
                </div>
              </div>
            </div>

            {/* VIEW MORE SERVICES BUTTON */}
            <div className="view-more-wrapper">
              {/* 👈 Binago ang onClick mula handleNavigateToAbout patungong handleNavigateToServices */}
              <button className="view-more-btn" onClick={handleNavigateToServices}>
                View More Services
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}