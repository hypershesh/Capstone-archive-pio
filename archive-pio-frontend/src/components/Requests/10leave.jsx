import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './10leave.css';
import logo from '../../assets/gmc-logo.png';
import { submitRequest } from '../../services/api';

export default function LeaveRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form States para sa Leave of Absence
  const [formData, setFormData] = useState({
    // Step 1: Request Information
    name: '',
    email: '',
    serviceCategory: 'Application for leave of absence',

    // Step 2: Application Details
    leaveType: '', // Vacation, Sick, Maternity, etc.
    startDate: '',
    endDate: '',
    totalDays: '',
    reason: '',
  });

  // Step 3: Attachments State
  const [files, setFiles] = useState({
    document: null,
    image: null,
  });

  const docInputRef = useRef(null);
  const imageInputRef = useRef(null);

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
      `Leave Type: ${formData.leaveType}`,
      `Start Date: ${formData.startDate}`,
      `End Date: ${formData.endDate}`,
      `Total Working Days: ${formData.totalDays}`,
      `Reason: ${formData.reason}`,
    ].join('\n');
    try {
      await submitRequest({
        name: formData.name,
        email: formData.email,
        serviceCategory: formData.serviceCategory,
        details,
        files: [files.document, files.image],
      });
      alert('Leave Application Successfully Submitted!');
      navigate('/services');
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      setSubmitError('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="le-request-page">
      <div className="le-container">
        <div className="le-main-box">
          {/* HEADER SECTION */}
          <div className="le-header">
            <div className="le-header-avatar-wrapper">
              <img
                src={logo}
                alt="Gumaca Logo"
                className="le-header-avatar-img"
              />
            </div>
            <h1>Gumaca Public Information Office</h1>
          </div>

          {/* STEP TABS SYSTEM */}
          <div className="le-step-tabs-container">
            <div
              className={`le-step-tab ${currentStep === 1 ? 'active' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              Request Information
            </div>
            <div
              className={`le-step-tab ${currentStep === 2 ? 'active' : ''}`}
              onClick={() => formData.name && setCurrentStep(2)}
            >
              Leave Details
            </div>
            <div
              className={`le-step-tab ${currentStep === 3 ? 'active' : ''}`}
              onClick={() => formData.leaveType && setCurrentStep(3)}
            >
              Attachments
            </div>
          </div>

          {/* --- FORMS --- */}

          {currentStep === 1 && (
            /* STEP 1: REQUEST INFORMATION */
            <form onSubmit={handleNextStep} className="le-request-form">
              <div className="le-form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="le-form-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="le-form-group">
                <label>Service Category:</label>
                <input
                  type="text"
                  value={formData.serviceCategory}
                  readOnly
                  className="le-readonly-input"
                />
              </div>
              <div className="le-form-actions">
                <button type="submit" className="le-next-btn">
                  NEXT
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            /* STEP 2: LEAVE DETAILS */
            <form onSubmit={handleNextStep} className="le-request-form">
              <div className="le-form-group">
                <label>Type of Leave:</label>
                <div className="le-select-wrapper">
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Vacation Leave">Vacation Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Maternity / Paternity Leave">
                      Maternity / Paternity Leave
                    </option>
                    <option value="Special Privilege Leave">
                      Special Privilege Leave
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="le-row">
                <div className="le-form-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="le-form-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="le-form-group">
                <label>Total Working Days:</label>
                <input
                  type="number"
                  name="totalDays"
                  value={formData.totalDays}
                  onChange={handleChange}
                  required
                  placeholder="0"
                />
              </div>
              <div className="le-form-group">
                <label>Reason for Leave:</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="State your reason here..."
                ></textarea>
              </div>
              <div className="le-form-actions le-multi-buttons">
                <button
                  type="button"
                  className="le-back-btn"
                  onClick={handleBackStep}
                >
                  Back
                </button>
                <button type="submit" className="le-next-btn">
                  Next
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            /* STEP 3: ATTACHMENTS */
            <form onSubmit={handleSubmitAll} className="le-request-form">
              <p className="le-info-text">
                Please attach your accomplished leave form or medical
                certificate if applicable.
              </p>

              <div className="le-form-group">
                <label>Insert Document (PDF/Doc):</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={docInputRef}
                  onChange={(e) => handleFileChange(e, 'document')}
                  style={{ display: 'none' }}
                />
                <div
                  className="le-upload-dropzone"
                  onClick={() => docInputRef.current.click()}
                >
                  <div className="le-upload-icon-box le-doc-icon"></div>
                  <span className="le-upload-main-text">
                    click to upload document
                    <br />
                    <span className="le-upload-sub-text">
                      (Accomplished Form / Certificate)
                    </span>
                  </span>
                  {files.document && (
                    <div className="le-file-selected-badge">
                      ✓ {files.document.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="le-form-group">
                <label>Insert Image Proof (if any):</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={(e) => handleFileChange(e, 'image')}
                  style={{ display: 'none' }}
                />
                <div
                  className="le-upload-dropzone"
                  onClick={() => imageInputRef.current.click()}
                >
                  <div className="le-upload-icon-box le-image-icon"></div>
                  <span className="le-upload-main-text">
                    click to upload image
                    <br />
                    <span className="le-upload-sub-text">(PNG, JPG, JPEG)</span>
                  </span>
                  {files.image && (
                    <div className="le-file-selected-badge">
                      ✓ {files.image.name}
                    </div>
                  )}
                </div>
              </div>

              {submitError && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{submitError}</div>
              )}
              <div className="le-form-actions le-multi-buttons">
                <button type="button" className="le-back-btn" onClick={handleBackStep}>Back</button>
                <button type="submit" className="le-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="le-back-services-link">
          <span onClick={() => navigate('/services')}>← Back to Services</span>
        </div>
      </div>
    </div>
  );
}
