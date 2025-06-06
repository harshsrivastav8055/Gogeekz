// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { BarChart3, Users, FileText } from 'lucide-react';
import { categories } from '../utils/constants'; // Import categories
import './Dashboard.css';

const Dashboard = ({ 
  leads, 
  setCurrentView, 
  setSelectedLead, 
  isLoading 
}) => {
  const [stats, setStats] = useState({
    total: 0,
    byCategory: {},
    completionRates: {}
  });

  useEffect(() => {
    if (leads.length > 0) {
      const newStats = {
        total: leads.length,
        byCategory: {},
        completionRates: {}
      };

      // Calculate category stats
      leads.forEach(lead => {
        newStats.byCategory[lead.category] = 
          (newStats.byCategory[lead.category] || 0) + 1;
      });

      // Calculate completion rates
      Object.keys(newStats.byCategory).forEach(cat => {
        const categoryLeads = leads.filter(lead => lead.category === cat);
        if (categoryLeads.length > 0) {
          const totalItems = categoryLeads.reduce(
            (sum, lead) => sum + categories[cat].checklist.length, 0
          );
          const completedItems = categoryLeads.reduce(
            (sum, lead) => sum + lead.checklist.filter(Boolean).length, 0
          );
          newStats.completionRates[cat] = totalItems > 0 
            ? Math.round((completedItems / totalItems) * 100) 
            : 0;
        } else {
          newStats.completionRates[cat] = 0;
        }
      });

      setStats(newStats);
    }
  }, [leads]);

  if (isLoading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-actions">
          <button
            onClick={() => setCurrentView('leads')}
            className="view-leads-btn"
          >
            <Users size={20} />
            View All Leads
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card total-leads-card">
          <div className="stats-card-content">
            <div className="stats-info">
              <p className="stats-label total-leads-label">Total Leads</p>
              <p className="stats-value">{stats.total}</p>
            </div>
            <Users size={32} className="stats-icon total-leads-icon" />
          </div>
        </div>

        {Object.keys(categories).map(category => (
          <div key={category} className="stats-card category-card">
            <div className="stats-card-content">
              <div className="stats-info">
                <p className="stats-label category-label">{category}</p>
                <p className="stats-value category-value">
                  {stats.byCategory[category] || 0}
                </p>
              </div>
              <FileText size={32} className="stats-icon category-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Completion Rates */}
      <div className="completion-rates-section">
        <h2 className="section-title">
          <BarChart3 size={24} />
          Checklist Completion Rates
        </h2>
        <div className="completion-rates-list">
          {Object.keys(categories).map(category => (
            <div key={category} className="completion-rate-item">
              <span className="completion-category">{category}</span>
              <div className="completion-progress">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${stats.completionRates[category] || 0}%` }}
                  ></div>
                </div>
                <span className="completion-percentage">
                  {stats.completionRates[category] || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-leads-section">
        <h2 className="section-title">Recent Leads</h2>
        <div className="recent-leads-list">
          {leads.slice(0, 5).map(lead => (
            <div key={lead._id} className="recent-lead-item">
              <div className="recent-lead-info">
                <p className="recent-lead-name">{lead.firstName} {lead.lastName}</p>
                <p className="recent-lead-category">{lead.category}</p>
              </div>
              <div className="recent-lead-actions">
                <span className="recent-lead-progress">
                  {lead.checklist.filter(Boolean).length}/{categories[lead.category].checklist.length} completed
                </span>
                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setCurrentView('details');
                  }}
                  className="view-details-btn"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;