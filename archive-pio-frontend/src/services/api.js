import axios from 'axios';

// ─── Base Axios Instance ──────────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Type Map ─────────────────────────────────────────────────────────
// Maps each form's service category to the backend's request_type key
export const REQUEST_TYPE_MAP = {
  'Request for Social Media Announcements': 'social_media',
  'Request for Image Layout or Editing':    'image_editing',
  'Request for Printed Media or Publications': 'printed_media',
  'Request for Photo Coverage':             'photo_coverage',
  'Request for Video Coverage':             'video_coverage',
  'Request for Video Editing':              'video_editing',
  'Request for Radio Program':              'radio_program',
  // Form 7 uses this exact string:
  '7. Request radio program':               'radio_program',
  'Request for Live Streaming':             'live_streaming',
  // Form 8 uses this exact string:
  'Request for live video streaming':       'live_streaming',
  'Equipment Maintenance and Repair':       'it_repair',
  'Application for leave of absence':       'leave_absence',
};

// ─── Main Submission Function ─────────────────────────────────────────────────
/**
 * Submits a guest request to the Archive-PIO backend.
 *
 * @param {object} params
 * @param {string} params.name         - Requester's full name
 * @param {string} params.email        - Requester's email address
 * @param {string} params.serviceCategory - Must match a key in REQUEST_TYPE_MAP
 * @param {string} params.details      - Full formatted details string
 * @param {File[]} params.files        - Array of File objects (can be empty/null)
 * @returns {Promise<object>}          - The created Request object from the API
 */
export async function submitRequest({ name, email, serviceCategory, details, files = [] }) {
  const requestType = REQUEST_TYPE_MAP[serviceCategory];
  if (!requestType) {
    throw new Error(`Unknown service category: ${serviceCategory}`);
  }

  // ── Step 1: Create the Requester profile ────────────────────────────────────
  const requesterRes = await api.post('/requesters/', {
    agency_name:    name,
    contact_person: name,
    contact_number: 'N/A',   // Forms currently don't collect phone number
    email:          email,
  });
  const requester = requesterRes.data;

  // ── Step 2: Create the Request linked to the Requester ─────────────────────
  const requestRes = await api.post('/requests/', {
    requester:    requester.requester_id,
    request_type: requestType,
    details:      details,
  });
  const request = requestRes.data;

  // ── Step 3: Upload any attachments ─────────────────────────────────────────
  const validFiles = (files || []).filter(Boolean);
  for (const file of validFiles) {
    const formData = new FormData();
    formData.append('request',   request.request_id);
    formData.append('file_name', file.name);
    formData.append('file_path', file);

    await api.post('/attachments/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  return request;
}
