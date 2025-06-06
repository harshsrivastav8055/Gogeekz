import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});



// Add interceptors for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// api.js
export const toggleChecklist = (leadId, itemIndex) =>
  api.put(`/leads/${leadId}/checklist/${itemIndex}`);

const LeadService = {
  // Lead endpoints
  getAllLeads: () => api.get('/leads'),
  getLeadById: (id) => api.get(`/leads/${id}`),
  createLead: (leadData) => api.post('/leads', leadData),
  updateLead: (id, leadData) => api.put(`/leads/${id}`, leadData),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  
  // Document endpoints
  uploadDocument: (leadId, formData) => api.post(`/leads/${leadId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // Email endpoint
  sendEmail: (leadId, emailType) => api.post(`/leads/${leadId}/send-email`, { emailType }),
};

export default LeadService;