import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, FileText, Mail } from 'lucide-react';
import './LeadsList.css';

const LeadsList = ({ 
  leads, 
  setCurrentView, 
  setSelectedLead, 
  setShowAddForm, 
  setEditingLead, 
  deleteLead,
  sendEmailNotification,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const filteredLeads = leads.filter(lead =>
    `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Loading leads...</div>;
  }

  return (
    <div className="leads-container">
      <div className="leads-header">
        <h1 className="leads-title">All Leads</h1>
        <div className="header-actions">
  <input
    type="text"
    placeholder="Search leads..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
  <button
    onClick={() => setShowAddForm(true)}
    className="add-lead-btn"
  >
    <PlusCircle size={20} />
    Add New Lead
  </button>
  <br />
  <button
    onClick={() => setCurrentView('dashboard')}
    className="add-lead-btn"
  >
    Go Back to Dashboard
  </button>
</div>

      </div>

      <div className="leads-table-container">
        {filteredLeads.length === 0 ? (
          <div className="no-leads">
            <p>No leads found. Create your first lead!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="add-first-lead-btn"
            >
              <PlusCircle size={16} />
              Add Lead
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="leads-table">
            <thead className="table-header">
              <tr>
                <th className="table-cell header-cell">Name</th>
                <th className="table-cell header-cell">Email</th>
                <th className="table-cell header-cell">Phone</th>
                <th className="table-cell header-cell">Category</th>
                <th className="table-cell header-cell">Progress</th>
                <th className="table-cell header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
  {filteredLeads.map((lead, index) => {
    const checklist = lead.checklist || [];
    const completed = checklist.filter(item => item?.completed === true).length;
    const total = checklist.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    const uniqueKey = lead._id ? lead._id : `lead-${index}`;

    return (
      <tr key={uniqueKey} className="table-row">
        <td className="table-cell">
          <div className="lead-name">
            {lead.firstName || "-"} {lead.lastName  || "-"}
          </div>
        </td>
        <td className="table-cell lead-email">{lead.email || "-"}</td>
        <td className="table-cell lead-phone">{lead.phone || "-"}</td>
        <td className="table-cell">
          <span className="category-badge">{lead.category || "-"}</span>
        </td>
        <td className="table-cell">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </td>
        <td className="table-cell">
          <div className="actions-container">
            <button
              onClick={() => {
                setSelectedLead(lead);
                setCurrentView('details');
              }}
              className="action-btn view-btn"
              title="View Details"
            >
              <FileText size={18} />
            </button>
            <button
              onClick={() => setEditingLead(lead)}
              className="action-btn edit-btn"
              title="Edit"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => deleteLead(lead._id)}
              className="action-btn delete-btn"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => sendEmailNotification(lead, 'Status Update')}
              className="action-btn email-btn"
              title="Send Email"
            >
              <Mail size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsList;