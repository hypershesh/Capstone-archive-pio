import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './9equipment.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function EquipmentRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form States para sa Equipment Module
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: 'Equipment Maintenance and Repair',
    requestType: '', // Maintenance, Repair

    // Step 2: Request Details
    equipmentName: '',
    propertyNumber: '',
    dateOfReport: '',
    issueDescription: '',
    location: '',
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
      `Equipment/Item Name: ${formData.equipmentName}`,
      `Property Number: ${formData.propertyNumber}`,
      `Date of Report: ${formData.dateOfReport}`,
      `Location: ${formData.location}`,
      `Issue Description: ${formData.issueDescription}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [files.video, files.image, files.audio],
      });
      alert('Equipment Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="eq-request-page">
      <div className="eq-container">
        <div className="eq-main-box">
          
          {/* HEADER SECTION */}
          <div className="eq-header">
            <div className="eq-header-avatar-wrapper">
              <img src={logo} alt="Gumaca Logo" className="eq-header-avatar-img" />
            </div>
            <h1>Gumaca Public Information Office</h1>
          </div>

          {/* STEP TABS SYSTEM */}
          <div className="eq-step-tabs-container">
            <div className={`eq-step-tab ${currentStep === 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>
              Request Information
            </div>
            <div className={`eq-step-tab ${currentStep === 2 ? 'active' : ''}`} onClick={() => formData.name && setCurrentStep(2)}>
              Request Details
            </div>
            <div className={`eq-step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.equipmentName && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- FORMS --- */}

          {currentStep === 1 && (
            /* STEP 1: REQUEST INFORMATION */
            <form onSubmit={handleNextStep} className="eq-request-form">
              <div className="eq-form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="eq-form-group">
                <label>Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="eq-form-group">
                <label>Service Category:</label>
                <input type="text" value={formData.serviceCategory} readOnly className="eq-readonly-input" />
              </div>
              <div className="eq-form-group">
                <label>Select Request Type:</label>
                <div className="eq-select-wrapper">
                  <select name="requestType" value={formData.requestType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                  </select>
                </div>
              </div>
              <div className="eq-form-actions">
                <button type="submit" className="eq-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* STEP 2: REQUEST DETAILS */
            <form onSubmit={handleNextStep} className="eq-request-form">
              <div className="eq-form-group">
                <label>Equipment / Item Name:</label>
                <input type="text" name="equipmentName" value={formData.equipmentName} onChange={handleChange} required />
              </div>
              <div className="eq-form-group">
                <label>Property Number / Serial No. (if any):</label>
                <input type="text" name="propertyNumber" value={formData.propertyNumber} onChange={handleChange} />
              </div>
              <div className="eq-form-group">
                <label>Date of Report:</label>
                <input type="date" name="dateOfReport" value={formData.dateOfReport} onChange={handleChange} required />
              </div>
              <div className="eq-form-group">
                <label>Location / Office / Department:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="eq-form-group">
                <label>Description of Issue / Concerns:</label>
                <textarea name="issueDescription" value={formData.issueDescription} onChange={handleChange} required></textarea>
              </div>
              <div className="eq-form-actions eq-multi-buttons">
                <button type="button" className="eq-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="eq-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* STEP 3: ATTACHMENTS */
            <form onSubmit={handleSubmitAll} className="eq-request-form">
              
              <div className="eq-form-group">
                <label>Insert Video(if any):</label>
                <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileChange(e, 'video')} style={{ display: 'none' }} />
                <div className="eq-upload-dropzone" onClick={() => videoInputRef.current.click()}>
                  <div className="eq-upload-icon-box eq-video-icon"></div>
                  <span className="eq-upload-main-text">click to upload video<br/><span className="eq-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.video && <div className="eq-file-selected-badge">✓ {files.video.name}</div>}
                </div>
              </div>

              <div className="eq-form-group">
                <label>Insert image(if any):</label>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} style={{ display: 'none' }} />
                <div className="eq-upload-dropzone" onClick={() => imageInputRef.current.click()}>
                  <div className="eq-upload-icon-box eq-image-icon"></div>
                  <span className="eq-upload-main-text">click to upload image<br/><span className="eq-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.image && <div className="eq-file-selected-badge">✓ {files.image.name}</div>}
                </div>
              </div>

              <div className="eq-form-group">
                <label>Insert audio(if any):</label>
                <input type="file" accept="audio/*" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} style={{ display: 'none' }} />
                <div className="eq-upload-dropzone" onClick={() => audioInputRef.current.click()}>
                  <div className="eq-upload-icon-box eq-audio-icon"></div>
                  <span className="eq-upload-main-text">click to upload audio<br/><span className="eq-upload-sub-text">(MP4, WebM, MOV)</span></span>
                  {files.audio && <div className="eq-file-selected-badge">✓ {files.audio.name}</div>}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="eq-form-actions eq-multi-buttons">
                <button type="button" className="eq-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="eq-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}

        </div> 

        <div className="eq-back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>

      </div>
    </div>
  );
}