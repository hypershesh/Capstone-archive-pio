import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import logo from '../assets/gmc-logo.png';
import header_about from '../assets/About_header_bg.png';

export default function Contact() {
  const navigate = useNavigate();
  
  // State para sa Send Us a Message form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleBackToHome = () => {
    navigate('/'); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent to the Public Information Office.`);
    setFormData({ name: '', email: '', subject: '', message: '' }); 
  };

  return (
    <div className="contact-page">
      {/* HEADER BANNER */}
      <div className="contact-header">
        <img
          src={header_about}
          alt="Contact Header Background"
          className="contact-bg-img"
        />
        <div className="contact-overlay-content contact-page-container">
          <div className="logo-wrapper">
            <img src={logo} alt="Gumaca Logo" className="header-logo" />
            <div className="logo-text-contact">
              <h2>Contact Us</h2>
              <h4>Get in touch with the Gumaca Public Information Office</h4>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="contact-page-wrapper">
        
        {/* UNANG SECTION: CARDS AT FORM LAYOUT */}
        <div className="contact-grid-layout">
          
          {/* KALIWANG BAHAGI: MAIN INFO CARDS */}
          <div className="contact-info-left">
            
            {/* Address Card */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📍</span>
              </div>
              <div className="contact-card-details">
                <h3>Address</h3>
                <p className="highlight-red-text">39 M H Del Pilar,</p>
                <p className="highlight-red-text">Gumaca, Quezon</p>
              </div>
            </div>

            {/* Phone Numbers Card */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Email Address Card */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">✉️</span>
              </div>
              <div className="contact-card-details">
                <h3>Email Address</h3>
                <p className="highlight-red-text font-underline">helpdesk@gumaca.gov.ph</p>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="contact-info-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">⏰</span>
              </div>
              <div className="contact-card-details">
                <h3>Office Hours</h3>
                <p>Monday - Friday</p>
                <p className="highlight-red-text font-bold">8am - 6pm</p>
                <span className="closed-days-note">Closed on wednesday weekends and holidays</span>
              </div>
            </div>

          </div>

          {/* KANANG BAHAGI: MALAKING FORM BOX */}
          <div className="contact-form-right-box">
            <div className="form-box-inside-wrapper">
              <h2>Send Us a Message</h2>
              <p className="form-sub-desc">Have questions or official inquiries? Fill out the form below.</p>
              
              <form onSubmit={handleSubmit} className="actual-embedded-form">
                <div className="contact-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-message-btn">Submit Message</button>
              </form>
            </div>
          </div>

        </div>


        {/* 🔥 IKALAWANG SECTION: EMERGENCY HOTLINE (ITO YUNG BAGONG DAGDAG) */}
        <div className="emergency-hotline-section">
          <h2>Emergency Hotline</h2>
          
          {/* Grid container para sa 3 columns */}
          <div className="hotline-grid">
            
            {/* Card 1 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="hotline-card">
              <div className="contact-card-icon-box">
                <span className="card-emoji-icon">📞</span>
              </div>
              <div className="contact-card-details">
                <h3>Phone Numbers</h3>
                <p className="highlight-red-text font-underline">317-7833</p>
                <p className="highlight-red-text font-underline">0946-333-3911</p>
              </div>
            </div>

          </div>
        </div>


        {/* BACK TO HOME NAVIGATION BUTTON */}
        <div className="back-home-wrapper-contact">
          <button className="back-home-btn-contact" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}