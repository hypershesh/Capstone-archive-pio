import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './8streaming.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function StreamingRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form States base sa iyong screenshots (Steps 1, 2, at 3)
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: 'Request for live video streaming',
    requestType: '', // Zoom, Youtube Live, Facebook Live

    // Step 2: Request Details (Eksaktong fields sa screenshot mo)
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    host: '',
    guests: '',
    eventType: '',
    venue: '',
    details: '',
  });

  // Step 3: Attachments State
  const [files, setFiles] = useState({
    video: null,
    image: null,
    audio: null,
  });

  // Refs para sa hidden file inputs
  const videoInputRef = useRef(null);
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
      `Request Type: ${formData.requestType}`,
      `Media Type: ${formData.mediaType}`,
      `Date of Event: ${formData.dateOfEvent}`,
      `Time: ${formData.timeStart} - ${formData.timeEnd}`,
      `Host: ${formData.host}`,
      `Guest/s: ${formData.guests}`,
      `Event Type: ${formData.eventType}`,
      `Venue: ${formData.venue}`,
      `Details: ${formData.details}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [files.video, files.image, files.audio],
      });
      alert('Live Streaming Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="st-request-page">
      <div className="st-container">
        <div className="st-main-box">
          
          {/* HEADER SECTION */}
          <div className="st-header">
            <div className="st-header-avatar-wrapper">
              <img src={logo} alt="Gumaca Logo" className="st-header-avatar-img" />
            </div>
            <h1>Gumaca Public Information Office</h1>
          </div>

          {/* STEP TABS SYSTEM */}
          <div className="st-step-tabs-container">
            <div className={`st-step-tab ${currentStep === 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>
              Request Information
            </div>
            <div className={`st-step-tab ${currentStep === 2 ? 'active' : ''}`} onClick={() => formData.name && setCurrentStep(2)}>
              Request Details
            </div>
            <div className={`st-step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.mediaType && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- FORMS --- */}

          {currentStep === 1 && (
            /* STEP 1: REQUEST INFORMATION */
            <form onSubmit={handleNextStep} className="st-request-form">
              <div className="st-form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Service Category:</label>
                <input type="text" value={formData.serviceCategory} readOnly className="st-readonly-input" />
              </div>
              <div className="st-form-group">
                <label>Select Request Type:</label>
                <div className="st-select-wrapper">
                  <select name="requestType" value={formData.requestType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Zoom">Zoom</option>
                    <option value="Youtube Live">Youtube Live</option>
                    <option value="Facebook Live">Facebook Live</option>
                  </select>
                </div>
              </div>
              <div className="st-form-actions">
                <button type="submit" className="st-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* STEP 2: REQUEST DETAILS (Base sa screenshot 1) */
            <form onSubmit={handleNextStep} className="st-request-form">
              <div className="st-form-group">
                <label>Media Type:</label>
                <div className="st-select-wrapper">
                  <select name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="High Definition">High Definition</option>
                    <option value="Standard Definition">Standard Definition</option>
                  </select>
                </div>
              </div>
              <div className="st-form-group">
                <label>Date of Event:</label>
                <input type="date" name="dateOfEvent" value={formData.dateOfEvent} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Time Start:</label>
                <input type="time" name="timeStart" value={formData.timeStart} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Time End:</label>
                <input type="time" name="timeEnd" value={formData.timeEnd} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Host:</label>
                <input type="text" name="host" value={formData.host} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Guest/s:</label>
                <input type="text" name="guests" value={formData.guests} onChange={handleChange} required id="guests" />
              </div>
              <div className="st-form-group">
                <label>Event Type:</label>
                <input type="text" name="eventType" value={formData.eventType} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Venue:</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
              </div>
              <div className="st-form-group">
                <label>Details:</label>
                <textarea name="details" value={formData.details} onChange={handleChange} required></textarea>
              </div>
              <div className="st-form-actions st-multi-buttons">
                <button type="button" className="st-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="st-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* STEP 3: ATTACHMENTS (Base sa screenshot 2) */
            <form onSubmit={handleSubmitAll} className="st-request-form">
              
              <div className="st-form-group">
                <label>Insert Video(if any):</label>
                <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileChange(e, 'video')} style={{ display: 'none' }} />
                <div className="st-upload-dropzone" onClick={() => videoInputRef.current.click()}>
                  <div className="st-upload-icon-box st-video-icon"></div>
                  <span className="st-upload-main-text">click to upload video<br/><span className="st-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.video && <div className="st-file-selected-badge">✓ {files.video.name}</div>}
                </div>
              </div>

              <div className="st-form-group">
                <label>Insert image(if any):</label>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} style={{ display: 'none' }} />
                <div className="st-upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="st-upload-icon-box st-image-icon"></div>
                  <span className="st-upload-main-text">click to upload image<br/><span className="st-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.image && <div className="st-file-selected-badge">✓ {files.image.name}</div>}
                </div>
              </div>

              <div className="st-form-group">
                <label>Insert audio(if any):</label>
                <input type="file" accept="audio/*" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} style={{ display: 'none' }} />
                <div className="st-upload-dropzone" onClick={() => audioInputRef.current.click()}>
                  <div className="st-upload-icon-box st-audio-icon"></div>
                  <span className="st-upload-main-text">click to upload audio<br/><span className="st-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.audio && <div className="st-file-selected-badge">✓ {files.audio.name}</div>}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="st-form-actions st-multi-buttons">
                <button type="button" className="st-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="st-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}

        </div> 

        <div className="st-back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>

      </div>
    </div>
  );
}