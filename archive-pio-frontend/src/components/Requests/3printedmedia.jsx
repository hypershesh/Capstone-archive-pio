import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './3printedmedia.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function PrintedMediaRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pinag-isang Form States para sa Step 1, Step 2, at Step 3
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: 'Request for Printed Media or Publications',
    requestType: '',

    // Step 2: Request Details
    mediaType: '',
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    event: '',
    details: '',

    // Step 3: Attachments Section (Base sa image_8cd62c.png)
    imageType: '',
    materialWidth: '',
    materialHeight: '',
    additionalNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      `Event: ${formData.event}`,
      `Details: ${formData.details}`,
      `Image Type: ${formData.imageType}`,
      `Material Size: ${formData.materialWidth} x ${formData.materialHeight}`,
      `Additional Notes: ${formData.additionalNotes}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [],
      });
      alert('Printed Media Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pm-request-page">
      <div className="pm-container">
        
        {/* MAIN CONTENT BOX */}
        <div className="pm-main-box">
          
          {/* HEADER SECTION */}
          <div className="pm-header">
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
            /* --- STEP 1: REQUEST INFORMATION --- */
            <form onSubmit={handleNextStep} className="pm-request-form">
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
                    <option value="Newsletter">Newsletter / Gazette Feature</option>
                    <option value="Brochure">Brochure / Pamphlet</option>
                    <option value="Souvenir Program">Souvenir Program</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="pm-next-btn">NEXT</button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* --- STEP 2: REQUEST DETAILS --- */
            <form onSubmit={handleNextStep} className="pm-request-form">
              <div className="form-group">
                <label htmlFor="mediaType">Media Type:</label>
                <div className="select-wrapper">
                  <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Print Component">Printed Material / Hard Copy</option>
                    <option value="Digital Archive">Digital Publication (PDF)</option>
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
                <textarea id="details" name="details" rows="5" value={formData.details} onChange={handleChange} required></textarea>
              </div>

              <div className="form-actions multi-buttons">
                <button type="button" className="pm-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="pm-next-btn">Next</button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* --- STEP 3: ATTACHMENTS (BAGONG LAYOUT) --- */
            <form onSubmit={handleSubmitAll} className="pm-request-form">
              
              <div className="form-group">
                <label htmlFor="imageType">Image Type:</label>
                <div className="select-wrapper">
                  <select id="imageType" name="imageType" value={formData.imageType} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Tarpaulin Banner">Tarpaulin Banner</option>
                    <option value="Flyer / Leaflet">Flyer / Leaflet Layout</option>
                    <option value="Poster / Booklet Cover">Poster / Booklet Cover</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Material Size:</label>
                <div className="size-inputs-container">
                  <div className="size-field">
                    <span>Width</span>
                    <input type="text" name="materialWidth" value={formData.materialWidth} onChange={handleChange} required />
                  </div>
                  <span className="size-multiplier">x</span>
                  <div className="size-field">
                    <span>Height</span>
                    <input type="text" name="materialHeight" value={formData.materialHeight} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes:</label>
                <textarea id="additionalNotes" name="additionalNotes" rows="6" value={formData.additionalNotes} onChange={handleChange} required></textarea>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="form-actions multi-buttons">
                <button type="button" className="pm-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="pm-submit-btn" disabled={isSubmitting}>
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