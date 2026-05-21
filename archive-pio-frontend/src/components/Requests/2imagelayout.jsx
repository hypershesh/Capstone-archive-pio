import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './2imagelayout.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function ImageLayoutRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Kumpletong pinagsamang states para sa text inputs, numeric parameters, at features
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    serviceCategory: 'Request for Image Layout or Editing',
    requestType: '',

    // Step 2
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    eventType: '',
    venue: '',
    details: '',

    // Step 3 (In-update base sa bagong screenshot)
    imageType: '',
    materialWidth: '',
    materialHeight: '',
    includePrinting: '' // Tatanggap ng 'YES' o 'NO'
  });

  // Files object para sa dalawang imaheng hinihingi
  const [files, setFiles] = useState({
    includedImage: null,
    logoCopy: null
  });

  const includedImageInputRef = useRef(null);
  const logoCopyInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Switch mechanism para sa custom checkbox design ng Printing options
  const handlePrintingCheck = (option) => {
    setFormData((prev) => ({ ...prev, includePrinting: option }));
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
      `Event Type: ${formData.eventType}`,
      `Venue: ${formData.venue}`,
      `Details: ${formData.details}`,
      `Image Type: ${formData.imageType}`,
      `Material Size: ${formData.materialWidth} x ${formData.materialHeight}`,
      `Include Printing: ${formData.includePrinting}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [files.includedImage, files.logoCopy],
      });
      alert('Image Layout Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="im-request-page">
      <div className="im-container">
        
        <div className="im-main-box">
          
          {/* HEADER SECTION */}
          <div className="im-header">
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
            <div className={`step-tab ${currentStep === 3 ? 'active' : ''}`} onClick={() => formData.eventType && setCurrentStep(3)}>
              Attachments
            </div>
          </div>

          {/* --- STEP 1 --- */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="im-request-form">
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
              <div className="form-group">
                <label htmlFor="requestType">Select Request Type:</label>
                <div className="select-wrapper">
                  <select id="requestType" name="requestType" value={formData.requestType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Tarpaulin Layout">Tarpaulin Layout</option>
                    <option value="Poster Design">Poster Design</option>
                    <option value="Logo Branding">Logo / Branding Editing</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="im-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* --- STEP 2 --- */
            <form onSubmit={handleNextStep} className="im-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Digital Formatting">Digital Format</option>
                    <option value="Print Ready">Print Format</option>
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
                <label htmlFor="eventType">Event Type:</label>
                <input type="text" id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="details">Details:</label>
                <textarea id="details" name="details" rows="5" value={formData.details} onChange={handleChange} required></textarea>
              </div>
              <div className="form-actions multi-buttons">
                <button type="button" className="im-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="im-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* --- STEP 3: ANG BAGONG ATTACHMENT STRUCTURE BASE SA SCREENSHOT --- */
            <form onSubmit={handleSubmitAll} className="im-request-form">
              
              {/* Image Type Dropdown */}
              <div className="form-group">
                <label htmlFor="imageType">Image Type:</label>
                <div className="select-wrapper">
                  <select
                    id="imageType"
                    name="imageType"
                    value={formData.imageType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Tarpaulin">Tarpaulin</option>
                    <option value="Poster">Poster / Banner</option>
                    <option value="Social Media Graphic">Social Media Graphic</option>
                    <option value="Infographics">Infographics</option>
                  </select>
                </div>
              </div>

              {/* Material Size Row Layout */}
              <div className="form-group">
                <label>Material Size:</label>
                <div className="material-size-row">
                  <div className="size-field-box">
                    <span>Width</span>
                    <input 
                      type="text" 
                      name="materialWidth" 
                      value={formData.materialWidth} 
                      onChange={handleChange} 
                      placeholder="e.g. 4ft"
                      required
                    />
                  </div>
                  <span className="size-separator">x</span>
                  <div className="size-field-box">
                    <span>Height</span>
                    <input 
                      type="text" 
                      name="materialHeight" 
                      value={formData.materialHeight} 
                      onChange={handleChange} 
                      placeholder="e.g. 6ft"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Upload Card 1: Insert Image Assets */}
              <div className="form-group">
                <label>Insert image/s to be included if any (preferably high resolution):</label>
                <input 
                  type="file" 
                  accept="image/*"
                  ref={includedImageInputRef}
                  onChange={(e) => handleFileChange(e, 'includedImage')}
                  style={{ display: 'none' }}
                />
                <div className="upload-dropzone" onClick={() => includedImageInputRef.current.click()}>
                  <div className="upload-icon-box image-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.includedImage && <div className="file-selected-badge">✓ {files.includedImage.name}</div>}
                </div>
              </div>

              {/* Upload Card 2: Logo Copy Attachments */}
              <div className="form-group">
                <label>Soft copy of logo/s to be included if any (preferably high resolution):</label>
                <input 
                  type="file" 
                  accept="image/*"
                  ref={logoCopyInputRef}
                  onChange={(e) => handleFileChange(e, 'logoCopy')}
                  style={{ display: 'none' }}
                />
                <div className="upload-dropzone" onClick={() => logoCopyInputRef.current.click()}>
                  <div className="upload-icon-box image-icon"></div>
                  <span className="upload-main-text">click to upload image</span>
                  <span className="upload-sub-text">(MP4, WebM, MOV)</span>
                  {files.logoCopy && <div className="file-selected-badge">✓ {files.logoCopy.name}</div>}
                </div>
              </div>

              {/* Printing Checkbox Component */}
              <div className="form-group">
                <label>Include Printing request(if required):</label>
                <div className="printing-options-wrapper">
                  
                  <div className="checkbox-item-block" onClick={() => handlePrintingCheck('YES')}>
                    <span className="checkbox-label-text">YES</span>
                    <div className={`custom-square-box ${formData.includePrinting === 'YES' ? 'checked' : ''}`}></div>
                  </div>

                  <div className="checkbox-item-block" onClick={() => handlePrintingCheck('NO')}>
                    <span className="checkbox-label-text">NO</span>
                    <div className={`custom-square-box ${formData.includePrinting === 'NO' ? 'checked' : ''}`}></div>
                  </div>

                </div>
              </div>

              {/* ERROR MESSAGE */}
              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              {/* BUTTON ACTIONS */}
              <div className="form-actions multi-buttons">
                <button type="button" className="im-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="im-submit-btn" disabled={isSubmitting}>
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