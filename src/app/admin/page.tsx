'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  RefreshCw, 
  Database, 
  Lock, 
  Check, 
  AlertCircle, 
  Search, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Image as ImageIcon, 
  X, 
  ArrowLeft,
  Eye,
  Users,
  Building,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  MessageCircle,
  Download,
  Clock,
  CheckCircle2,
  PhoneCall,
  StickyNote
} from 'lucide-react';
import { Project } from '@/types';
import { ImageUploadZone } from '@/components/admin/ImageUploadZone';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  preferredDate?: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed' | 'lost';
  notes?: string;
  source?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Top Tab Switcher
  const [activeTab, setActiveTab] = useState<'properties' | 'leads'>('properties');

  // Properties State
  const [properties, setProperties] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbSource, setDbSource] = useState<string>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<LeadItem | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [deleteLeadCandidate, setDeleteLeadCandidate] = useState<LeadItem | null>(null);

  // Modal States for Properties
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Project | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    slug: '',
    tagline: '',
    location: '',
    city: 'Amaravati / Vijayawada',
    priceFrom: '',
    pricePerSqYd: '',
    totalArea: '',
    plotSizes: '',
    lpNumber: '',
    reraId: 'AP RERA Approved',
    overview: '',
    highlightsText: '',
    images: ['/projects/anvi-homes-1.jpg', '/projects/anvi-homes-2.jpg'],
    approvalsText: 'CRDA Approved Layout\nAP RERA Registered\nBank Loan Facility Available',
    bankTieUpsText: 'State Bank of India (SBI)\nHDFC Bank\nICICI Bank',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Check auth session
  useEffect(() => {
    const saved = sessionStorage.getItem('pavan_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      fetchProperties();
      fetchLeads();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'pavan2025' || pinInput === 'admin123' || pinInput === '9030444978') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pavan_admin_auth', 'true');
      setAuthError('');
      fetchProperties();
      fetchLeads();
    } else {
      setAuthError('Invalid Admin PIN. (Default: pavan2025)');
    }
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Fetch properties from MongoDB API
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.success) {
        setProperties(data.data || []);
        setDbSource(data.source || 'mongodb');
      } else {
        showToast(data.error || 'Failed to load properties', 'error');
      }
    } catch (err: any) {
      showToast('Error connecting to property API', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads from MongoDB API
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
      }
    } catch (err: any) {
      console.warn('Failed to load leads from database:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Lead status updated to ${newStatus}`, 'success');
        setLeads(prev => prev.map(l => (l.id === leadId ? { ...l, status: newStatus as any } : l)));
      } else {
        showToast(data.error || 'Failed to update status', 'error');
      }
    } catch (err: any) {
      showToast('Error updating lead status', 'error');
    }
  };

  // Save Lead Notes
  const handleSaveNotes = async () => {
    if (!selectedLeadForNotes) return;
    try {
      const res = await fetch(`/api/leads/${selectedLeadForNotes.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesInput }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Broker notes saved successfully', 'success');
        setLeads(prev => prev.map(l => (l.id === selectedLeadForNotes.id ? { ...l, notes: notesInput } : l)));
        setSelectedLeadForNotes(null);
      } else {
        showToast(data.error || 'Failed to save notes', 'error');
      }
    } catch (err) {
      showToast('Error saving broker notes', 'error');
    }
  };

  // Delete Lead
  const handleDeleteLeadConfirm = async () => {
    if (!deleteLeadCandidate) return;
    try {
      const res = await fetch(`/api/leads/${deleteLeadCandidate.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('Lead deleted successfully', 'success');
        setLeads(prev => prev.filter(l => l.id !== deleteLeadCandidate.id));
        setDeleteLeadCandidate(null);
      } else {
        showToast(data.error || 'Failed to delete lead', 'error');
      }
    } catch (err) {
      showToast('Error deleting lead', 'error');
    }
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('No inquiries available to export.', 'error');
      return;
    }

    const headers = ['Date', 'Customer Name', 'Phone', 'Email', 'Property Interest', 'Preferred Date', 'Status', 'Message', 'Broker Notes'];
    const rows = leads.map(l => [
      `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.projectInterest || ''}"`,
      `"${l.preferredDate || ''}"`,
      `"${l.status || 'new'}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pavan_Properties_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Customer inquiries exported to CSV successfully!', 'success');
  };

  // Seed default data
  const handleSeedDatabase = async () => {
    if (!confirm('Seed default projects (Anvi Homes, Capital Heights) to MongoDB?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/properties/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, 'success');
        fetchProperties();
      } else {
        showToast(data.error || 'Seed failed. Check MongoDB connection.', 'error');
      }
    } catch (err) {
      showToast('Error triggering database seed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProperty(null);
    setFormData(initialFormState);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (property: Project) => {
    setEditingProperty(property);
    setFormData({
      name: property.name || '',
      slug: property.slug || '',
      tagline: property.tagline || '',
      location: property.location || '',
      city: property.city || 'Amaravati / Vijayawada',
      priceFrom: property.priceFrom || '',
      pricePerSqYd: property.pricePerSqYd || '',
      totalArea: property.totalArea || '',
      plotSizes: property.plotSizes || '',
      lpNumber: property.lpNumber || '',
      reraId: property.reraId || 'AP RERA Approved',
      overview: property.overview || '',
      highlightsText: (property.highlights || []).join('\n'),
      images: Array.isArray(property.images) && property.images.length > 0 ? property.images : ['/projects/anvi-homes-1.jpg'],
      approvalsText: (property.approvals || []).join('\n'),
      bankTieUpsText: (property.bankTieUps || []).join('\n'),
    });
    setIsFormModalOpen(true);
  };

  // Submit Add / Edit Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const highlights = formData.highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const approvals = formData.approvalsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const bankTieUps = formData.bankTieUpsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const images = Array.isArray(formData.images) && formData.images.length > 0
      ? formData.images
      : ['/projects/anvi-homes-1.jpg'];

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: formData.tagline,
      location: formData.location,
      city: formData.city,
      priceFrom: formData.priceFrom,
      pricePerSqYd: formData.pricePerSqYd,
      totalArea: formData.totalArea,
      plotSizes: formData.plotSizes,
      lpNumber: formData.lpNumber,
      reraId: formData.reraId,
      overview: formData.overview,
      highlights,
      images,
      approvals,
      bankTieUps,
    };

    try {
      if (editingProperty) {
        // Update (PUT)
        const idToUpdate = editingProperty.id || (editingProperty as any)._id || editingProperty.slug;
        const res = await fetch(`/api/properties/${idToUpdate}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Property updated successfully in MongoDB!', 'success');
          setIsFormModalOpen(false);
          fetchProperties();
        } else {
          showToast(data.error || 'Failed to update property.', 'error');
        }
      } else {
        // Create (POST)
        const res = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Property created successfully in MongoDB!', 'success');
          setIsFormModalOpen(false);
          fetchProperties();
        } else {
          showToast(data.error || 'Failed to create property.', 'error');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Error processing request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm and Execute Delete Property
  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    setSubmitting(true);
    try {
      const idToDelete = deleteCandidate.id || (deleteCandidate as any)._id || deleteCandidate.slug;
      const res = await fetch(`/api/properties/${idToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Property deleted successfully.', 'success');
        setDeleteCandidate(null);
        fetchProperties();
      } else {
        showToast(data.error || 'Failed to delete property.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting property.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.lpNumber && p.lpNumber.toLowerCase().includes(q)) ||
      (p.city && p.city.toLowerCase().includes(q))
    );
  });

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const q = leadSearchQuery.toLowerCase();
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.phone && l.phone.includes(q)) ||
      (l.projectInterest && l.projectInterest.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q));

    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  // ==========================================
  // 1. PIN AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#f9f6ee]">
        <div className="w-full max-w-md bg-[#ffffff] rounded-2xl border border-[#eae3e0] shadow-xl p-8 space-y-6 text-center">
          
          <div className="w-14 h-14 rounded-full bg-[#f4f0ea] border border-[#c9ad98] flex items-center justify-center mx-auto text-[#142334]">
            <Lock className="w-6 h-6 text-[#a67d64]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343]">
              Pavan Properties Admin
            </span>
            <h1 className="font-serif font-bold text-2xl text-[#142334]">
              Advisor Portal Access
            </h1>
            <p className="text-xs text-[#5c4438]">
              Enter security passcode to manage MongoDB properties and customer inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Passcode (e.g. pavan2025)"
                className="w-full px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eae3e0] text-center font-mono text-base tracking-widest text-[#142334] focus:outline-none focus:border-[#a67d64]"
              />
            </div>

            {authError && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary py-3 text-xs tracking-wider uppercase font-semibold justify-center"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="pt-2 border-t border-[#eae3e0] flex items-center justify-center gap-1 text-[11px] text-[#715343]">
            <span>Passcode reminder:</span>
            <code className="bg-[#f4f0ea] px-1.5 py-0.5 rounded font-mono text-[#142334]">pavan2025</code>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border animate-in slide-in-from-bottom-5 duration-300 ${
            toastMsg.type === 'success'
              ? 'bg-[#142334] text-white border-[#c9ad98]'
              : 'bg-red-600 text-white border-red-700'
          }`}
        >
          {toastMsg.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eae3e0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343]">
              Pavan Properties Admin Management
            </span>
            <span className="badge-verified text-[10px] py-0.5 px-2">Live Cloud DB</span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334] mt-1">
            Real Estate Advisory Control Portal
          </h1>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-xs text-[#715343] flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[#142334] font-medium">
              Database: <strong className="font-mono uppercase">{dbSource}</strong>
            </span>
          </div>

          <button
            onClick={() => {
              fetchProperties();
              fetchLeads();
            }}
            disabled={loading || leadsLoading}
            className="p-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f0ea] border border-[#eae3e0] text-[#142334] transition-colors"
            title="Refresh from MongoDB"
          >
            <RefreshCw className={`w-4 h-4 ${loading || leadsLoading ? 'animate-spin' : ''}`} />
          </button>

          {activeTab === 'properties' && (
            <>
              <button
                onClick={handleSeedDatabase}
                disabled={loading}
                className="px-3 py-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f0ea] border border-[#eae3e0] text-xs font-semibold text-[#142334] transition-colors flex items-center gap-1.5"
                title="Populate MongoDB with default initial projects"
              >
                <Database className="w-3.5 h-3.5 text-[#a67d64]" />
                <span>Seed DB</span>
              </button>

              <button
                onClick={handleOpenAdd}
                className="btn-primary text-xs py-2 px-4 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </>
          )}

          {activeTab === 'leads' && (
            <button
              onClick={handleExportCSV}
              className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#a67d64]" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-3 border-b border-[#eae3e0]">
        <button
          onClick={() => setActiveTab('properties')}
          className={`pb-3.5 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'properties'
              ? 'border-[#142334] text-[#142334]'
              : 'border-transparent text-[#715343] hover:text-[#142334]'
          }`}
        >
          <Building className="w-4 h-4 text-[#a67d64]" />
          <span>Properties Portfolio ({properties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3.5 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'leads'
              ? 'border-[#142334] text-[#142334]'
              : 'border-transparent text-[#715343] hover:text-[#142334]'
          }`}
        >
          <Users className="w-4 h-4 text-[#a67d64]" />
          <span>Customer Inquiries & Leads ({leads.length})</span>
          {newLeadsCount > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              {newLeadsCount} NEW
            </span>
          )}
        </button>
      </div>

      {/* ========================================================== */}
      {/* TAB 1: PROPERTIES MANAGEMENT */}
      {/* ========================================================== */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          {/* Search Bar & Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, location, LP No..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-xs text-[#142334] focus:outline-none focus:border-[#c9ad98]"
              />
            </div>

            <div className="text-xs text-[#715343] self-end sm:self-center">
              Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.length}</strong> active listings
            </div>
          </div>

          {/* Property Cards Grid */}
          {loading && properties.length === 0 ? (
            <div className="p-16 text-center text-xs text-[#715343]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#a67d64] mb-2" />
              <span>Loading properties from database...</span>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="editorial-panel p-12 text-center space-y-3 bg-[#ffffff]">
              <AlertCircle className="w-8 h-8 mx-auto text-[#a67d64]" />
              <h3 className="font-serif font-bold text-lg text-[#142334]">No Properties Found</h3>
              <p className="text-xs text-[#5c4438] max-w-sm mx-auto">
                {searchQuery
                  ? 'No properties match your search query.'
                  : 'Your MongoDB database is currently empty. Click "Seed DB" to load default properties or "+ Add Property" to create your first listing.'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button onClick={handleSeedDatabase} className="btn-secondary text-xs py-2 px-4">
                  Seed Default Properties
                </button>
                <button onClick={handleOpenAdd} className="btn-primary text-xs py-2 px-4">
                  Add New Property
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id || property.slug}
                  className="editorial-card overflow-hidden bg-[#ffffff] border border-[#eae3e0] hover:border-[#c9ad98] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-[16/10] bg-[#f4f0ea] overflow-hidden">
                      <img
                        src={property.images?.[0] || '/projects/anvi-homes-1.jpg'}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 text-[#142334] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#eae3e0]">
                        {property.lpNumber || 'LP PENDING'}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-white/95 text-[#142334] text-[10px] px-2 py-0.5 rounded border border-[#eae3e0]">
                        {property.reraId || 'RERA APPROVED'}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#142334] line-clamp-1">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-[#715343] mt-0.5">
                          <MapPin className="w-3 h-3 text-[#a67d64]" />
                          <span className="line-clamp-1">{property.location}</span>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div className="p-2.5 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-[#715343] block">Starting Price</span>
                          <span className="font-bold text-[#142334]">{property.priceFrom}</span>
                        </div>
                        {property.pricePerSqYd && (
                          <div className="text-right">
                            <span className="text-[10px] text-[#715343] block">Rate</span>
                            <span className="text-[#142334]">{property.pricePerSqYd}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-[#5c4438] line-clamp-2">
                        {property.overview || property.tagline || 'No description provided.'}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 grid grid-cols-3 gap-2 border-t border-[#eae3e0]/60 mt-2">
                    <Link
                      href={`/property/${property.slug}`}
                      target="_blank"
                      className="btn-secondary text-[11px] py-1.5 px-2 flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(property)}
                      className="btn-secondary text-[11px] py-1.5 px-2 flex items-center justify-center gap-1 hover:border-[#a67d64]"
                    >
                      <Edit3 className="w-3 h-3 text-[#a67d64]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteCandidate(property)}
                      className="py-1.5 px-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: CUSTOMER INQUIRIES & LEADS MANAGEMENT */}
      {/* ========================================================== */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          
          {/* Top Filter & Search Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  placeholder="Search by buyer name, phone, project..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-xs text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-[#f9f6ee] p-1 rounded-lg border border-[#eae3e0] text-xs">
                {['all', 'new', 'contacted', 'scheduled', 'closed'].map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => setLeadStatusFilter(statusKey)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                      leadStatusFilter === statusKey
                        ? 'bg-[#142334] text-white shadow-sm'
                        : 'text-[#715343] hover:text-[#142334]'
                    }`}
                  >
                    {statusKey === 'scheduled' ? 'Visit Set' : statusKey}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#715343] self-end md:self-center">
              Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> inquiries (Alerts dispatched to <strong className="text-[#142334]">propertiespavan@gmail.com</strong>)
            </div>
          </div>

          {/* Leads Table / Cards */}
          {leadsLoading && leads.length === 0 ? (
            <div className="p-16 text-center text-xs text-[#715343]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#a67d64] mb-2" />
              <span>Loading customer inquiries from MongoDB...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="editorial-panel p-12 text-center space-y-3 bg-[#ffffff]">
              <Users className="w-8 h-8 mx-auto text-[#a67d64]" />
              <h3 className="font-serif font-bold text-lg text-[#142334]">No Inquiries Found</h3>
              <p className="text-xs text-[#5c4438] max-w-sm mx-auto">
                {leadSearchQuery || leadStatusFilter !== 'all'
                  ? 'No customer inquiries match your current filter settings.'
                  : 'Customer site visit requests submitted on your website will appear here in real-time.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => {
                const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                const waMessage = encodeURIComponent(
                  `Hello ${lead.name}, this is Pavan Kumar from Pavan Properties. Thank you for inquiring about ${lead.projectInterest || 'our verified layouts'}. I would be glad to coordinate your site visit schedule.`
                );
                const waLink = `https://wa.me/91${cleanPhone}?text=${waMessage}`;

                return (
                  <div
                    key={lead.id}
                    className={`editorial-card p-5 sm:p-6 bg-[#ffffff] border transition-all ${
                      lead.status === 'new'
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : 'border-[#eae3e0]'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Buyer & Property Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif font-bold text-lg text-[#142334]">
                            {lead.name}
                          </h3>

                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              lead.status === 'new'
                                ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                                : lead.status === 'contacted'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : lead.status === 'scheduled'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : lead.status === 'closed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {lead.status === 'scheduled' ? '🗓️ Visit Scheduled' : lead.status}
                          </span>

                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        {/* Contact Info Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="font-bold text-[#142334] hover:text-[#a67d64] flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#a67d64]" />
                            <span>+91 {cleanPhone}</span>
                          </a>

                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-[#715343] hover:underline flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#a67d64]" />
                              <span>{lead.email}</span>
                            </a>
                          )}

                          <div className="text-[#142334] font-medium flex items-center gap-1.5 bg-[#f9f6ee] px-2.5 py-1 rounded-md border border-[#eae3e0]">
                            <Building className="w-3.5 h-3.5 text-[#a67d64]" />
                            <span>{lead.projectInterest || 'General Inquiry'}</span>
                          </div>

                          {lead.preferredDate && (
                            <div className="text-[#715343] flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#a67d64]" />
                              <span>Pref Date: <strong>{lead.preferredDate}</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Customer Message */}
                        {lead.message && (
                          <div className="p-3 bg-[#f9f6ee] rounded-lg border border-[#eae3e0] text-xs text-[#344f6d] italic max-w-2xl">
                            &quot;{lead.message}&quot;
                          </div>
                        )}

                        {/* Broker Notes if any */}
                        {lead.notes && (
                          <div className="flex items-start gap-1.5 text-xs text-[#715343] bg-amber-50/70 p-2 rounded border border-amber-100 max-w-2xl">
                            <StickyNote className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span><strong>Broker Note:</strong> {lead.notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Quick Follow-up Actions */}
                      <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-[#eae3e0] pt-3 lg:pt-0 lg:pl-5">
                        
                        <div className="flex items-center gap-2">
                          {/* 1-Click WhatsApp */}
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* 1-Click Phone Call */}
                          <a
                            href={`tel:${cleanPhone}`}
                            className="px-3 py-1.5 rounded-lg bg-[#142334] hover:bg-[#1e344d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                            title="Call customer directly"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </div>

                        {/* Status Switcher Dropdown */}
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-[11px] text-[#715343]">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="px-2 py-1 rounded bg-[#ffffff] border border-[#eae3e0] text-xs font-semibold text-[#142334] focus:outline-none focus:border-[#a67d64]"
                          >
                            <option value="new">🟢 New Inquiry</option>
                            <option value="contacted">🔵 Contacted</option>
                            <option value="scheduled">🗓️ Visit Scheduled</option>
                            <option value="closed">🟣 Deal Closed</option>
                            <option value="lost">⚪ Lost / Inactive</option>
                          </select>
                        </div>

                        {/* Note & Delete Actions */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setSelectedLeadForNotes(lead);
                              setNotesInput(lead.notes || '');
                            }}
                            className="text-[11px] text-[#715343] hover:text-[#142334] font-medium flex items-center gap-1 underline"
                          >
                            <StickyNote className="w-3 h-3" />
                            <span>{lead.notes ? 'Edit Notes' : '+ Add Note'}</span>
                          </button>

                          <button
                            onClick={() => setDeleteLeadCandidate(lead)}
                            className="text-[11px] text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================== */}
      {/* 3. ADD / EDIT PROPERTY MODAL */}
      {/* ========================================== */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl my-8 bg-[#ffffff] rounded-2xl border border-[#eae3e0] shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#eae3e0] bg-[#f9f6ee]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#142334]">
                  {editingProperty ? `Edit: ${editingProperty.name}` : 'Add New Property to MongoDB'}
                </h3>
                <p className="text-xs text-[#715343]">
                  Fill out property parameters, legal documentation reference, and imagery.
                </p>
              </div>

              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#142334] hover:bg-[#eae3e0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Row 1: Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Property Name <span className="text-[#a67d64]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anvi Homes"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    URL Slug (Auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. anvi-homes-kesarapalli"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-mono text-[11px] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>
              </div>

              {/* Row 2: Location & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Exact Location <span className="text-[#a67d64]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kesarapalli, 100 Ft Airport Road"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    City / Zone
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Vijayawada / Amaravati"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>
              </div>

              {/* Row 3: Pricing & Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Starting Price <span className="text-[#a67d64]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.priceFrom}
                    onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                    placeholder="e.g. ₹32.5 Lakhs / ₹1.20 Cr*"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Rate per Sq.Yd (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.pricePerSqYd}
                    onChange={(e) => setFormData({ ...formData, pricePerSqYd: e.target.value })}
                    placeholder="e.g. ₹18,500 / sq.yd"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>
              </div>

              {/* Row 4: LP Number & RERA ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    CRDA / LP Number <span className="text-[#a67d64]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lpNumber}
                    onChange={(e) => setFormData({ ...formData, lpNumber: e.target.value })}
                    placeholder="e.g. LP No. 30/2025"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-mono focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    RERA Registration ID
                  </label>
                  <input
                    type="text"
                    value={formData.reraId}
                    onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                    placeholder="e.g. AP RERA Approved"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>
              </div>

              {/* Row 5: Total Area & Plot Sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Total Layout Area
                  </label>
                  <input
                    type="text"
                    value={formData.totalArea}
                    onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })}
                    placeholder="e.g. 40+ Acres"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142334] mb-1">
                    Plot Sizes
                  </label>
                  <input
                    type="text"
                    value={formData.plotSizes}
                    onChange={(e) => setFormData({ ...formData, plotSizes: e.target.value })}
                    placeholder="e.g. 167, 200, 267 & 500 Sq. Yds"
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                  />
                </div>
              </div>

              {/* Overview Description */}
              <div>
                <label className="block font-semibold text-[#142334] mb-1">
                  Project Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="Comprehensive description of the layout, amenities, and connectivity..."
                  className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] focus:outline-none focus:border-[#c9ad98]"
                />
              </div>

              {/* Highlights (1 per line) */}
              <div>
                <label className="block font-semibold text-[#142334] mb-1">
                  Key Highlights (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.highlightsText}
                  onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                  placeholder="100 Feet Airport-West Bypass Road Facing&#10;3.5 Km to International Airport&#10;40 Feet CC Roads with Underground Drainage"
                  className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-mono text-[11px] focus:outline-none focus:border-[#c9ad98]"
                />
              </div>

              {/* Direct Image Upload Component */}
              <div className="pt-2 border-t border-[#eae3e0]">
                <ImageUploadZone
                  images={formData.images}
                  onChange={(newImages) => setFormData({ ...formData, images: newImages })}
                  label="Property Photographs & Layout Drawings"
                  maxImages={20}
                />
              </div>

              {/* Bank Tie-ups */}
              <div>
                <label className="block font-semibold text-[#142334] mb-1">
                  Bank Tie-Ups (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.bankTieUpsText}
                  onChange={(e) => setFormData({ ...formData, bankTieUpsText: e.target.value })}
                  placeholder="State Bank of India (SBI)&#10;HDFC Bank&#10;ICICI Bank"
                  className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-mono text-[11px] focus:outline-none focus:border-[#c9ad98]"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#eae3e0]">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="btn-secondary py-2 px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary py-2 px-5 text-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving to MongoDB...' : editingProperty ? 'Update Property' : 'Create Property'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. BROKER NOTES MODAL */}
      {/* ========================================== */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl border border-[#eae3e0] shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#eae3e0] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#142334]">
                  Private Notes for {selectedLeadForNotes.name}
                </h3>
                <p className="text-xs text-[#715343]">
                  Internal advisor record (client phone: +91 {selectedLeadForNotes.phone})
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="text-slate-400 hover:text-[#142334]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              rows={4}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="e.g. Budget 1.25 Cr, looking for 200 sq.yd East facing plot in Anvi Homes. Visiting this Saturday at 11am with family."
              className="w-full p-3 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] text-xs text-[#142334] focus:outline-none focus:border-[#a67d64]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="btn-primary py-1.5 px-4 text-xs"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. DELETE PROPERTY CONFIRMATION MODAL */}
      {/* ========================================== */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#ffffff] rounded-2xl border border-red-200 shadow-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#142334]">
                Confirm Property Deletion
              </h3>
              <p className="text-xs text-[#5c4438]">
                Are you sure you want to permanently delete{' '}
                <strong className="text-[#142334]">"{deleteCandidate.name}"</strong> ({deleteCandidate.lpNumber}) from MongoDB?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="btn-secondary py-2 px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteConfirm}
                className="py-2 px-5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm transition-colors disabled:opacity-50"
              >
                {submitting ? 'Deleting...' : 'Yes, Delete Property'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. DELETE LEAD CONFIRMATION MODAL */}
      {/* ========================================== */}
      {deleteLeadCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#ffffff] rounded-2xl border border-red-200 shadow-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#142334]">
                Delete Customer Inquiry
              </h3>
              <p className="text-xs text-[#5c4438]">
                Are you sure you want to delete inquiry for <strong className="text-[#142334]">{deleteLeadCandidate.name}</strong> (+91 {deleteLeadCandidate.phone})?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteLeadCandidate(null)}
                className="btn-secondary py-2 px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteLeadConfirm}
                className="py-2 px-5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
