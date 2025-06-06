// App.jsx
import { useState, useEffect } from 'react';
import { PlusCircle, Users, BarChart3, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LeadsList from './components/LeadsList';
import LeadDetails from './components/LeadDetails';
import LeadForm from './components/LeadForm';
import LeadService from './services/api';
import './App.css';
import { toggleChecklist } from './services/api'; // ✅ adjust path if needed


const App = () => {
  const [leads, setLeads] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leads from backend
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const data = await LeadService.getAllLeads();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leads. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (leadData) => {
    try {
      const newLead = await LeadService.createLead(leadData);
      setLeads([...leads, newLead]);
      setShowAddForm(false);
      fetchLeads();
    } catch (err) {
      console.error('Failed to add lead:', err);
    }
  };

  const updateLead = async (leadData) => {
    try {
      const updatedLead = await LeadService.updateLead(leadData._id, leadData);
      setLeads(leads.map(lead => 
        lead._id === updatedLead._id ? updatedLead : lead
      ));
      setEditingLead(null);
      if (selectedLead?._id === updatedLead._id) {
        setSelectedLead(updatedLead);
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await LeadService.deleteLead(id);
      setLeads(leads.filter(lead => lead._id !== id));
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead(null);
        setCurrentView('leads');
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const toggleChecklistItem = async (leadId, index) => {
    try {
      // Optimistically update UI first
      setLeads(prevLeads => 
        prevLeads.map(lead => {
          if (lead._id === leadId) {
            const updatedChecklist = [...lead.checklist];
            // Handle both object and boolean formats
            if (typeof updatedChecklist[index] === 'object') {
              updatedChecklist[index] = {
                ...updatedChecklist[index],
                completed: !updatedChecklist[index].completed
              };
            } else {
              updatedChecklist[index] = !updatedChecklist[index];
            }
            return { ...lead, checklist: updatedChecklist };
          }
          fetchLeads();
          return lead;
        })
      );
  
      // Then make the API call
      const response = await toggleChecklist(leadId, index);
      
      // Sync with server response
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead._id === leadId ? { ...response.data } : lead
        )
      );
    } catch (error) {
      console.error('Failed to update checklist:', error);
      // Revert optimistic update if API call fails
      setLeads(prevLeads => [...prevLeads]);
    }
  };
  
  const uploadDocument = async (leadId, file) => {
    const formData = new FormData();
    formData.append('document', file);
    
    try {
      const document = await LeadService.uploadDocument(leadId, formData);
      
      setLeads(leads.map(lead => {
        if (lead._id === leadId) {
          return { ...lead, documents: [...lead.documents, document] };
        }
        return lead;
      }));
      
      if (selectedLead?._id === leadId) {
        setSelectedLead({
          ...selectedLead,
          documents: [...selectedLead.documents, document]
        });
      }
    } catch (err) {
      console.error('Failed to upload document:', err);
    }
  };

  const sendEmailNotification = async (lead, type) => {
    try {
      await LeadService.sendEmail(lead._id, type);
      alert(`Email notification sent to your registerd emailid}`);
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('Failed to send email notification');
    }
  };

  return (
    <div className="app-container">
      {/* Navigation - same as before */}

      {/* Main Content */}
      <main className="main-content">
        {isLoading && currentView === 'dashboard' ? (
          <div className="loading">Loading dashboard...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {currentView === 'dashboard' && (
              <Dashboard 
                leads={leads} 
                setCurrentView={setCurrentView} 
                setSelectedLead={setSelectedLead}
                isLoading={isLoading}
              />
            )}
            
            {currentView === 'leads' && (
              <LeadsList
                leads={leads}
                setCurrentView={setCurrentView}
                setSelectedLead={setSelectedLead}
                setShowAddForm={setShowAddForm}
                setEditingLead={setEditingLead}
                deleteLead={deleteLead}
                sendEmailNotification={sendEmailNotification}
                isLoading={isLoading}
              />
            )}
            
            {currentView === 'details' && selectedLead && (
              <LeadDetails
                lead={selectedLead}
                setCurrentView={setCurrentView}
                setEditingLead={setEditingLead}
                toggleChecklistItem={toggleChecklistItem}
                uploadDocument={uploadDocument}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {showAddForm && (
        <LeadForm
          onSubmit={addLead}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingLead && (
        <LeadForm
          lead={editingLead}
          onSubmit={updateLead}
          onCancel={() => setEditingLead(null)}
        />
      )}
    </div>
  );
};

export default App; 