import React, { useState, useRef } from 'react';
import { useNavigate as useReactNavigate } from 'react-router-dom';
import './4photocoverage.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function PhotoCoverageRequest() {
  const navigate = useReactNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form states base sa mga mockups mo
  const [formData, setFormData] = useState({
    // Step 1: Request Information (Tinanggal ang requestType base sa image_8b88af.png)
    name: '',
    email: '',
    serviceCategory: 'Request for Photo Coverage',

    // Step 2: Request Details (Tugma sa image_3e1ad5.png)
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    event: '',
    eventType: '',       
    venue: '',           
    venueSetup: '',      
    details: '',
    includeImageLayout: '' // 'YES' o 'NO'
  });

  // Step 3: Single Attachment State base sa image_3e1f51.png
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({ ...prev, includeImageLayout: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    const details = [
      `Media Type: ${formData.mediaType}`,
      `Date of Event: ${formData.dateOfEvent}`,
      `Time: ${formData.timeStart} - ${formData.timeEnd}`,
      `Event: ${formData.event}`,
      `Event Type: ${formData.eventType}`,
      `Venue: ${formData.venue}`,
      `Venue Setup: ${formData.venueSetup}`,
      `Details: ${formData.details}`,
      `Include Image Layout: ${formData.includeImageLayout}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [selectedImage],
      });
      alert('Photo Coverage Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pc-request-page">
      <div className="pc-container">
        
        <div className="pc-main-box">
          
          {/* HEADER SECTION */}
          <div className="pc-header">
            <div className="header-avatar-wrapper">
              <img src={logo} alt="Gumaca Logo" className="header-avatar-img" />
            </div>
            <h1>Gumaca Public information Office</h1>
          </div>

          {/* STEP TABS */}
          <div className="step-tabs-container">
            <div className={`step-tab ${currentStep === 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>
              Request Information
            </div>
            <div className={`step-tab ${currentStep === 2 ? 'active' : ''}`} onClick={() => formData.name && setCurrentStep(2)}>
              Request Details
            </div>
            <div className={`step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.event && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- KONDISYONAL NA MGA FIELD NG FORM --- */}
          
          {currentStep === 1 && (
            /* --- STEP 1: REQUEST INFORMATION (Tugma sa image_8b88af.png) --- */
            <form onSubmit={handleNextStep} className="pc-request-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="serviceCategory">Service Category:</label>
                <input type="text" id="serviceCategory" name="serviceCategory" value={formData.serviceCategory} readOnly className="readonly-input" />
              </div>

              <div className="form-actions">
                <button type="submit" className="pc-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* --- STEP 2: REQUEST DETAILS (Tugma sa image_3e1ad5.png) --- */
            <form onSubmit={handleNextStep} className="pc-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Pure Photography">Pure Photography / Documentation</option>
                    <option value="Photo and Video">Photo and Video Highlights</option>
                    <option value="Live Streaming">Live Streaming with Photo Documentation</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfEvent">Date of Event:</label>
                <input type="date" id="dateOfEvent" name="dateOfEvent" value={formData.dateOfEvent} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="timeStart">Time Start:</label>
                <div className="select-wrapper">
                  <select id="timeStart" name="timeStart" value={formData.timeStart} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeEnd">Time End:</label>
                <div className="select-wrapper">
                  <select id="timeEnd" name="timeEnd" value={formData.timeEnd} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="event">Event:</label>
                <input type="text" id="event" name="event" value={formData.event} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="eventType">Event Type:</label>
                <input type="text" id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="venueSetup">Venue Setup:</label>
                <input type="text" id="venueSetup" name="venueSetup" value={formData.venueSetup} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" value={formData.details} onChange={handleChange} required></textarea>
              </div>

              <div className="form-group options-group">
                <label>Include Image Layout:</label>
                <div className="checkboxes-row">
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="layoutYes" 
                      checked={formData.includeImageLayout === 'YES'} 
                      onChange={() => handleCheckboxChange('YES')} 
                    />
                    <label htmlFor="layoutYes">YES</label>
                  </div>
                  <div className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id="layoutNo" 
                      checked={formData.includeImageLayout === 'NO'} 
                      onChange={() => handleCheckboxChange('NO')} 
                    />
                    <label htmlFor="layoutNo">NO</label>
                  </div>
                </div>
              </div>

              <div className="form-actions multi-buttons">
                <button type="button" className="pc-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="pc-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* --- STEP 3: ATTACHMENTS (Tugma sa image_3e1f51.png) --- */
            <form onSubmit={handleSubmitAll} className="pc-request-form">
              <div className="form-group">
                <label>Insert image(if any):</label>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="upload-icon-box image-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {selectedImage && <div className="file-selected-badge">✓ {selectedImage.name}</div>}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="form-actions multi-buttons">
                <button type="button" className="pc-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="pc-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}

        </div> 

        <div className="back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>

      </div>
    </div>
  );
}