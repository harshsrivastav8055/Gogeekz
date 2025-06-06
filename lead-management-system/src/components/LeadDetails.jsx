// LeadDetails.jsx
import { Edit3, FileCheck, Upload, Download, CheckCircle, Circle, FileText } from 'lucide-react';
import { categories } from '../utils/constants';
import './LeadDetails.css';

const LeadDetails = ({ 
  lead, 
  setCurrentView, 
  setEditingLead, 
  toggleChecklistItem,
  uploadDocument
}) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(lead._id, file);
    }
    e.target.value = null; // Reset input
  };

  const getCategoryInfo = () => {
    if (!lead || !lead.category) return { checklist: [], fields: [] };
    return categories[lead.category] || { checklist: [], fields: [] };
  };

  // Safe document type display
  const getDocumentType = (doc) => {
    if (!doc.type) return 'FILE';
    if (doc.type.includes('pdf')) return 'PDF';
    if (doc.type.includes('image')) return 'IMAGE';
    return doc.type.toUpperCase();
  };

  const categoryInfo = getCategoryInfo();

  if (!lead) {
    return (
      <div className="lead-details">
        <div className="header">
          <h1 className="title">Lead Not Found</h1>
          <button
            onClick={() => setCurrentView('leads')}
            className="btn btn-secondary"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-details">
      <div className="header">
        <h1 className="title">
          {lead.firstName} {lead.lastName}
        </h1>
        <div className="header-buttons">
          <button
            onClick={() => setCurrentView('leads')}
            className="btn btn-secondary"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="content-grid">
        {/* Lead Information */}
        <div className="card">
          <h2 className="card-title">Contact Information</h2>
          <div className="contact-info">
            <div className="field">
              <label className="field-label">Full Name</label>
              <p className="field-value">{lead.firstName} {lead.lastName}</p>
            </div>
            <div className="field">
              <label className="field-label">Email</label>
              <p className="field-value">{lead.email}</p>
            </div>
            <div className="field">
              <label className="field-label">Phone</label>
              <p className="field-value">{lead.phone}</p>
            </div>
            <div className="field">
              <label className="field-label">Category</label>
              <span className="category-badge">
                {lead.category}
              </span>
            </div>
          </div>

          {/* Custom Fields */}
          <h3 className="section-title">Category Details</h3>
          <div className="custom-fields">
            {Object.entries(lead.customFields || {}).map(([field, value]) => (
              <div key={field} className="field">
                <label className="field-label">{field}</label>
                <p className="field-value">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="card">
  <h2 className="card-title-with-icon">
    <FileCheck size={24} />
    Process Checklist
  </h2>
  
  <div className="checklist">
    {categoryInfo.checklist.map((item, index) => (
      <div key={index} className="checklist-item">
        <button
          onClick={() => toggleChecklistItem(lead._id, index)}
          className={`checklist-button ${lead.checklist[index]?.completed ? 'completed' : 'incomplete'}`}
        >
          {lead.checklist[index]?.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        <span className={`checklist-text ${lead.checklist[index]?.completed ? 'completed' : ''}`}>
          {item}
        </span>
      </div>
    ))}
  </div>

  {/* Progress Info - Place this right after the checklist items */}
  <div className="progress-info">
    <p className="progress-text">
      Progress: {lead.checklist?.filter(item => 
        item && (item.completed || item === true)
      ).length || 0} of {categoryInfo.checklist.length} items completed
    </p>
  </div>
</div>
        </div>
      {/* Documents Section */}
      <div className="card documents-section">
        <h2 className="card-title-with-icon">
          <Upload size={24} />
          Documents
        </h2>
        
        <div className="upload-section">
          <label className="upload-button">
            <Upload size={18} />
            Upload Document
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
              className="file-input"
            />
          </label>
          <p className="upload-info">Accepted formats: PDF, JPG, PNG</p>
        </div>
        <div className="documents-list">
  {lead.documents && lead.documents.length > 0 ? (
    lead.documents.map((docPath, index) => {
      const filePath = typeof docPath === 'string' ? docPath : docPath?.path;
      if (!filePath) return null; // skip invalid entries

      const filename = filePath.split('-').slice(1).join('-');
      const fileUrl = `http://localhost:5000/${filePath}`;

      return (
        <div key={index} className="document-item">
          <div className="document-info">
            <FileText size={20} className="document-icon" />
            <span className="document-name">{filename}</span>
            <span className="document-type">
              {filename.split('.').pop().toUpperCase()} file
            </span>
          </div>
          <a
            href={fileUrl}
            download={filename}
            className="download-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={18} />
            Download
          </a>
        </div>
      );
    })
  ) : (
    <p className="no-documents">No documents uploaded yet</p>
  )}
</div>


      </div>
    </div>
  );
};

export default LeadDetails;