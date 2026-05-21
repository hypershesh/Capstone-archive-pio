import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './5videocoverage.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function VideoCoverageRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // States ayon sa iyong eksaktong mockup fields para sa Video Coverage
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceCategory: 'Request for Video Coverage',
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    event: '',
    eventType: '',
    venue: '',
    venueSetup: '',
    details: '',
    includeImageLayout: '' // YES or NO
  });

  // Ginawang tatlo ang state para sa magkakaibang klase ng attachments (image_3ff832.png)
  const [files, setFiles] = useState({ 
    video: null,
    image: null,
    audio: null
  });

  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({ ...prev, includeImageLayout: value }));
  };

  // Dinagdagan ng 'type' parameter para malaman kung anong dropzone ang nagbago
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
        files: [files.video, files.image, files.audio],
      });
      alert('Video Coverage Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vc-request-page">
      <div className="vc-container">
        <div className="vc-main-box">
          
          {/* HEADER SECTION */}
          <div className="vc-header">
            <div className="header-avatar-wrapper">
              <img src={logo} alt="Gumaca Logo" className="header-avatar-img" />
            </div>
            <h1>Gumaca Public information Office</h1>
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
          
          {/* STEP 1: REQUEST INFORMATION */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="vc-request-form">
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
                <button type="submit" className="vc-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {/* STEP 2: REQUEST DETAILS */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="vc-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Pure Video Recording">Pure Video Recording / Documentation</option>
                    <option value="Video Highlights">Video Highlights / Event Reel</option>
                    <option value="Live Stream Broadcast">Live Stream Broadcast</option>
                  </select>
                </div>
              </div>

              {/* Native Date Picker para lumabas ang kalendaryo (image_3fda4c.png) */}
              <div className="form-group">
                <label htmlFor="dateOfEvent">Date of Event:</label>
                <input type="date" id="dateOfEvent" name="dateOfEvent" value={formData.dateOfEvent} onChange={handleChange} required />
              </div>

              {/* Native Time Picker para lumabas ang orasan (image_3fda4c.png) */}
              <div className="form-group">
                <label htmlFor="timeStart">Time Start:</label>
                <input type="time" id="timeStart" name="timeStart" value={formData.timeStart} onChange={handleChange} required />
              </div>

              {/* Native Time Picker para lumabas ang orasan (image_3fda4c.png) */}
              <div className="form-group">
                <label htmlFor="timeEnd">Time End:</label>
                <input type="time" id="timeEnd" name="timeEnd" value={formData.timeEnd} onChange={handleChange} required />
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

              <div className="form-group checkboxes-group">
                <label>Include Image Layout:</label>
                <div className="checkboxes-row">
                  <div className="checkbox-item">
                    <input type="checkbox" id="layoutYes" checked={formData.includeImageLayout === 'YES'} onChange={() => handleCheckboxChange('YES')} />
                    <label htmlFor="layoutYes">YES</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="layoutNo" checked={formData.includeImageLayout === 'NO'} onChange={() => handleCheckboxChange('NO')} />
                    <label htmlFor="layoutNo">NO</label>
                  </div>
                </div>
              </div>

              <div className="form-actions multi-buttons">
                <button type="button" className="vc-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="vc-next-btn">Next</button>
              </div>
            </form>
          )}

          {/* STEP 3: ATTACHMENTS (Binago base sa image_3ff832.png) */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmitAll} className="vc-request-form">
              
              {/* Dropzone 1: Insert Video */}
              <div className="form-group">
                <label>Insert Video(if any):</label>
                <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileChange(e, 'video')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => videoInputRef.current.click()}>
                  <div className="upload-icon-box video-clip-icon"></div>
                  <span className="upload-main-text">click to upload video</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.video && <div className="file-selected-badge">✓ {files.video.name}</div>}
                </div>
              </div>

              {/* Dropzone 2: Insert Image */}
              <div className="form-group">
                <label>Insert image(if any):</label>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="upload-icon-box image-photo-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.image && <div className="file-selected-badge">✓ {files.image.name}</div>}
                </div>
              </div>

              {/* Dropzone 3: Insert Audio */}
              <div className="form-group">
                <label>Insert audio(if any):</label>
                <input type="file" accept="audio/*" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} style={{ display: 'none' }} />
                <div className="upload-dropzone" onClick={() => audioInputRef.current.click()}>
                  <div className="upload-icon-box audio-music-icon"></div>
                  <span className="upload-main-text">click to upload audio</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.audio && <div className="file-selected-badge">✓ {files.audio.name}</div>}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="form-actions multi-buttons">
                <button type="button" className="vc-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="vc-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}

        </div> 

        {/* BACK TO SERVICES LINK */}
        <div className="back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>

      </div>
    </div>
  );
}