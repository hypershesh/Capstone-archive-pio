import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './7radioprogram.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function RadioProgramRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Bagong state management base sa eksaktong wireframe mo
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: '7. Request radio program',
    selectRequestType: '',

    // Step 2: Request Details (Binago base sa image_ca1911.png)
    dateOfEvent: '',
    timeStart: '',
    timeEnd: '',
    guests: '', // Palitan ang 'event' ng 'guests'
    details: '',
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
      `Request Type: ${formData.selectRequestType}`,
      `Date of Event: ${formData.dateOfEvent}`,
      `Time: ${formData.timeStart} - ${formData.timeEnd}`,
      `Guest/s: ${formData.guests}`,
      `Details: ${formData.details}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [],
      });
      alert('Radio Program Request Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rp-request-page">
      <div className="rp-container">
        <div className="rp-main-box">
          {/* HEADER SECTION */}
          <div className="rp-header">
            <div className="rp-header-avatar-wrapper">
              <img
                src={logo}
                alt="Gumaca Logo"
                className="rp-header-avatar-img"
              />
            </div>
            <h1>Gumaca Public Information Office</h1>
          </div>

          {/* STEP TABS SYSTEM */}
          <div className="rp-step-tabs-container">
            <div
              className={`rp-step-tab ${currentStep === 1 ? 'active' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              Request Information
            </div>
            <div
              className={`rp-step-tab ${currentStep === 2 ? 'active' : ''}`}
              onClick={() =>
                formData.name && formData.selectRequestType && setCurrentStep(2)
              }
            >
              Request Details
            </div>
          </div>

          {/* --- FORMS --- */}

          {currentStep === 1 && (
            /* STEP 1: REQUEST INFORMATION */
            <form onSubmit={handleNextStep} className="rp-request-form">
              <div className="rp-form-group">
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

              <div className="rp-form-group">
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

              <div className="rp-form-group">
                <label htmlFor="serviceCategory">Service Category:</label>
                <input
                  type="text"
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  readOnly
                  className="rp-readonly-input"
                />
              </div>

              <div className="rp-form-group">
                <label htmlFor="selectRequestType">Select Request Type:</label>
                <div className="rp-select-wrapper">
                  <select
                    id="selectRequestType"
                    name="selectRequestType"
                    value={formData.selectRequestType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Announcement">Announcement</option>
                    <option value="Guesting">Guesting</option>
                    <option value="Interviews">Interviews</option>
                  </select>
                </div>
              </div>

              <div className="rp-form-actions">
                <button type="submit" className="rp-next-btn">
                  NEXT
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* STEP 2: REQUEST DETAILS (Eksaktong tugma sa image_ca1911.png) */
            <form onSubmit={handleSubmitAll} className="rp-request-form">
              <div className="rp-form-group">
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

              <div className="rp-form-group">
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

              <div className="rp-form-group">
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

              <div className="rp-form-group">
                <label htmlFor="guests">Guest/s:</label>
                <input
                  type="text"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rp-form-group">
                <label htmlFor="details">Details:</label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="rp-form-actions rp-multi-buttons">
                <button type="button" className="rp-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="rp-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="rp-back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>
      </div>
    </div>
  );
}
