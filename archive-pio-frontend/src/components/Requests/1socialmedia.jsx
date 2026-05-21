import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './1socialmedia.css';
import { submitRequest } from '../../services/api';
import logo from '../../assets/gmc-logo.png'; // Siguraduhing tama ang relative path mo

export default function SocialMediaRequest() {
  const navigate = useNavigate();
  
  // Tagapamahala kung aling step ang kasalukuyang nakabukas (1, 2, o 3)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Isang bagsakang state para sa lahat ng text/select data ng form
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    serviceCategory: 'Request for Social Media Announcements',
    requestType: '',

    // Step 2
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    eventTitle: '',
    details: ''
  });

  // State para sa mga files sa Step 3
  const [files, setFiles] = useState({
    video: null,
    image: null,
    audio: null
  });

  // HTML Input References para sa custom upload boxes click trigger
  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [type]: e.target.files[0]
      }));
    }
  };

  // Navigation Handlers
  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Final Action kapag pinindot ang Submit sa Step 3
  const handleSubmitAll = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const details = [
      `Request Type: ${formData.requestType}`,
      `Media Type: ${formData.mediaType}`,
      `Date of Event: ${formData.dateOfEvent}`,
      `Time: ${formData.timeStart} - ${formData.timeEnd}`,
      `Event Title: ${formData.eventTitle}`,
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
      alert('Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sm-request-page">
      <div className="sm-container">
        
        {/* MAIN CONTENT BOX */}
        <div className="sm-main-box">
          
          {/* HEADER SECTION */}
          <div className="sm-header">
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
            <div className={`step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.eventTitle && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- KONDISYONAL NA PAGPAPALIT NG MGA FORM BAHAGI --- */}
          
          {currentStep === 1 && (
            /* --- STEP 1: REQUEST INFORMATION FORM --- */
            <form onSubmit={handleNextStep} className="sm-request-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceCategory">Service Category:</label>
                <input
                  type="text"
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  readOnly
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="requestType">Select Request Type:</label>
                <div className="select-wrapper">
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Announcement">Announcement</option>
                    <option value="Infographics">Infographics / Educational</option>
                    <option value="Event Feature">Event Feature</option>
                    <option value="Greeting / Holiday">Greeting / Holiday Layout</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="sm-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* --- STEP 2: REQUEST DETAILS FORM --- */
            <form onSubmit={handleNextStep} className="sm-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select
                    id="mediaType"
                    name="mediaType"
                    value={formData.mediaType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Social Media Post">Social Media Post</option>
                    <option value="LED Billboard">LED Billboard Display</option>
                    <option value="Website Feature">Website Feature</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfEvent">Date of Event:</label>
                <input
                  type="date"
                  id="dateOfEvent"
                  name="dateOfEvent"
                  value={formData.dateOfEvent}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeStart">Time Start:</label>
                <input
                  type="time"
                  id="timeStart"
                  name="timeStart"
                  value={formData.timeStart}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeEnd">Time End:</label>
                <input
                  type="time"
                  id="timeEnd"
                  name="timeEnd"
                  value={formData.timeEnd}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventTitle">Event:</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea
                  id="details"
                  name="details"
                  rows="5"
                  value={formData.details}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-actions multi-buttons">
                <button type="button" className="sm-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="sm-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* --- STEP 3: ATTACHMENTS FORM --- */
            <form onSubmit={handleSubmitAll} className="sm-request-form">
              
              {/* VIDEO UPLOAD BOX */}
              <div className="form-group">
                <label>Insert Video(if any):</label>
                <input 
                  type="file" 
                  accept="video/mp4,video/webm,video/quicktime"
                  ref={videoInputRef}
                  onChange={(e) => handleFileChange(e, 'video')}
                  style={{ display: 'none' }}
                />
                <div className="upload-dropzone" onClick={() => videoInputRef.current.click()}>
                  <div className="upload-icon-box video-icon"></div>
                  <span className="upload-main-text">click to upload video</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.video && <div className="file-selected-badge">✓ {files.video.name}</div>}
                </div>
              </div>

              {/* IMAGE UPLOAD BOX */}
              <div className="form-group">
                <label>Insert image(if any):</label>
                <input 
                  type="file" 
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={(e) => handleFileChange(e, 'image')}
                  style={{ display: 'none' }}
                />
                <div className="upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="upload-icon-box image-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(PNG, JPG, JPEG)</span>
                  {files.image && <div className="file-selected-badge">✓ {files.image.name}</div>}
                </div>
              </div>

              {/* AUDIO UPLOAD BOX */}
              <div className="form-group">
                <label>Insert audio(if any):</label>
                <input 
                  type="file" 
                  accept="audio/mp3,audio/wav,audio/mpeg"
                  ref={audioInputRef}
                  onChange={(e) => handleFileChange(e, 'audio')}
                  style={{ display: 'none' }}
                />
                <div className="upload-dropzone" onClick={() => audioInputRef.current.click()}>
                  <div className="upload-icon-box audio-icon"></div>
                  <span className="upload-main-text">click to upload audio</span>
                  <span className="upload-sub-text">(MP3, WAV, M4A)</span>
                  {files.audio && <div className="file-selected-badge">✓ {files.audio.name}</div>}
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}

              {/* ACTION BUTTONS (Back at Submit) */}
              <div className="form-actions multi-buttons">
                <button type="button" className="sm-back-btn" onClick={handleBackStep}>
                  Back
                </button>
                <button type="submit" className="sm-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}

        </div> {/* END OF MAIN BOX */}

        {/* BACK TO SERVICES LINK */}
        <div className="back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>

      </div>
    </div>
  );
}