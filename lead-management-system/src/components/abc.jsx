import React, { useState, useEffect } from 'react';
import { categories } from '../utils/constants';
import './LeadForm.css';

const LeadForm = ({ lead, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: 'Express Entry',
    customFields: {}
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setFormData({
        ...lead,
        customFields: lead.customFields || {},
      });
    }
  }, [lead]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData); // ✅ Ensure this returns a Promise and updates parent state
    }
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category,
      customFields: {}
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name*</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Last Name*</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone*</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="form-select"
            >
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Custom Fields */}
          <div className="custom-fields-section">
            <h3 className="custom-fields-title">Category Specific Information</h3>
            {categories[formData.category]?.fields.map((field) => (
              <div key={field} className="form-group">
                <label className="form-label">{field}</label>
                <input
                  type="text"
                  value={formData.customFields[field] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customFields: {
                        ...formData.customFields,
                        [field]: e.target.value,
                      },
                    })
                  }
                  className="form-input"
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {lead ? 'Update Lead' : 'Add Lead'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
