import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './6videoediting.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function VideoEditingRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form States para sa Video Editing base sa disenyo ng Request Details mockup
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: 'Request for Video Editing',

    // Step 2: Request Details (Binago base sa iyong UI wireframe)
    mediaType: '',         // e.g., Reel, Tiktok, Vlog, Documentation
    dateOfEvent: '',       // Petsa ng event o footage
    timeStart: '',         // Simula ng oras
    timeEnd: '',           // Tapos ng oras
    event: '',             // Pangalan ng Kaganapan / Pamagat
    details: ''            // Mga detalye at tagubilin sa pag-edit
  });

  // Step 3: Attachments
  const [files, setFiles] = useState({ rawFootage: null, images: null, audio: null });
  
  const rawInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [type]: e.target.files[0] }));
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
      `Details: ${formData.details}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [files.rawFootage, files.images, files.audio],
      });
      alert('Video Editing Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ve-request-page">
      <div className="ve-container">
        
        <div className="ve-main-box">
          
          {/* HEADER SECTION */}
          <div className="ve-header">
            <div className="header-avatar-wrapper">
              <img src={logo} alt="Gumaca Logo" className="header-avatar-img" />
            </div>
            <h1>Gumaca Public Information Office</h1>
          </div>

          {/* STEP TABS SYSTEM */}
          <div className="step-tabs-container">
            <div className={`step-tab ${currentStep === 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>
              Request Information
            </div>
            <div className={`step-tab ${currentStep === 2 ? 'active' : ''}`} onClick={() => formData.name && setCurrentStep(2)}>
              Request Details
            </div>
            <div className={`step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.mediaType && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- FORMS --- */}
          
          {currentStep === 1 && (
            /* STEP 1: REQUEST INFORMATION */
            <form onSubmit={handleNextStep} className="ve-request-form">
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
                <button type="submit" className="ve-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* STEP 2: REQUEST DETAILS (TUGMA SA MOCKUP MO) */
            <form onSubmit={handleNextStep} className="ve-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Social Media Reel / Tiktok">Social Media Reel / Tiktok</option>
                    <option value="Documentation / Vlog">Documentation / Vlog</option>
                    <option value="News Clip / Announcement">News Clip / Announcement</option>
                    <option value="Event Highlights">Event Highlights</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfEvent">Date of Event:</label>
                <input type="date" id="dateOfEvent" name="dateOfEvent" value={formData.dateOfEvent} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="timeStart">Time Start:</label>
                <input type="time" id="timeStart" name="timeStart" value={formData.timeStart} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="timeEnd">Time End:</label>
                <input type="time" id="timeEnd" name="timeEnd" value={formData.timeEnd} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="event">Event:</label>
                <input type="text" id="event" name="event" value={formData.event} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" value={formData.details} onChange={handleChange} required></textarea>
              </div>

              <div className="form-actions multi-buttons">
                <button type="button" className="ve-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="ve-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* STEP 3: ATTACHMENTS */
            <form onSubmit={handleSubmitAll} className="ve-request-form">
              
              <div className="form-group">
                <label>Insert Video (if any):</label>
                <input type="file" accept="video/*" ref={rawInputRef} onChange={(e) => handleFileChange(e, 'rawFootage')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => rawInputRef.current.click()}>
                  <div className="upload-icon-box video-icon"></div>
                  <span className="upload-main-text">click to upload video</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.rawFootage && <div className="file-selected-badge">✓ {files.rawFootage.name}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Insert image (if any):</label>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'images')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="upload-icon-box image-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(PNG, JPG, JPEG)</span>
                  {files.images && <div className="file-selected-badge">✓ {files.images.name}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Insert audio (if any):</label>
                <input type="file" accept="audio/*" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => audioInputRef.current.click()}>
                  <div className="upload-icon-box audio-icon"></div>
                  <span className="upload-main-text">click to upload audio</span>
                  <span className="upload-sub-text">(MP3, WAV, M4A)</span>
                  {files.audio && <div className="file-selected-badge">✓ {files.audio.name}</div>}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="form-actions multi-buttons">
                <button type="button" className="ve-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="ve-submit-btn" disabled={isSubmitting}>
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