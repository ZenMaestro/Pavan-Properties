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
  Eye
} from 'lucide-react';
import { Project } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [properties, setProperties] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbSource, setDbSource] = useState<string>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Modal States
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
    imagesText: '/projects/anvi-homes-1.jpg\n/projects/anvi-homes-2.jpg',
    approvalsText: 'CRDA Approved Layout\nAP RERA Registered\nBank Loan Facility',
    bankTieUpsText: 'State Bank of India (SBI)\nHDFC Bank\nICICI Bank',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Check auth session
  useEffect(() => {
    const saved = sessionStorage.getItem('pavan_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      fetchProperties();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'pavan2025' || pinInput === 'admin123' || pinInput === '9030444978') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pavan_admin_auth', 'true');
      setAuthError('');
      fetchProperties();
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
      imagesText: (property.images || []).join('\n'),
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

    const images = formData.imagesText
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
      images: images.length > 0 ? images : ['/projects/anvi-homes-1.jpg'],
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

  // Confirm and Execute Delete
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
      showToast('Error deleting property.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered properties based on search
  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q) ||
      p.lpNumber?.toLowerCase().includes(q) ||
      p.city?.toLowerCase().includes(q)
    );
  });

  // 1. PIN Authentication Barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="editorial-panel p-8 sm:p-10 max-w-md w-full bg-[#ffffff] border border-[#eae3e0] shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-[#142334] text-[#f9f6ee] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6 text-[#c9ad98]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#715343] font-semibold">
              Pavan Properties
            </span>
            <h1 className="font-serif font-bold text-2xl text-[#142334]">
              Admin Property Portal
            </h1>
            <p className="text-xs text-[#5c4438]">
              Enter administrative PIN to manage MongoDB properties and listings.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN (Default: pavan2025)"
                className="w-full px-4 py-3 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] text-[#142334] text-center text-sm font-mono tracking-widest focus:outline-none focus:border-[#c9ad98] focus:ring-1 focus:ring-[#c9ad98]"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-3 text-sm">
              <span>Access Management Dashboard</span>
            </button>
          </form>

          <p className="text-[11px] text-[#715343]">
            Default passcode: <code className="font-mono font-bold text-[#142334]">pavan2025</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed top-24 right-6 z-50 p-4 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 border ${
            toastMsg.type === 'success'
              ? 'bg-[#142334] text-white border-[#c9ad98]'
              : 'bg-red-900 text-white border-red-700'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <Check className="w-4 h-4 text-[#c9ad98]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Top Header & DB Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#eae3e0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#715343]">
            <Link href="/" className="hover:text-[#142334] flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Website
            </Link>
            <span>•</span>
            <span className="font-mono text-[#a67d64]">Admin v1.2</span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334] mt-1">
            Property Inventory Management
          </h1>
          <p className="text-xs text-[#5c4438] mt-0.5">
            Add, update, or remove verified listings stored in MongoDB.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* DB Mode Indicator */}
          <div className="px-3 py-2 rounded-lg bg-[#f4f0ea] border border-[#eae3e0] flex items-center gap-2 text-xs">
            <Database className="w-3.5 h-3.5 text-[#a67d64]" />
            <span className="text-[#142334] font-medium">
              Mode: <strong className="font-mono uppercase">{dbSource}</strong>
            </span>
          </div>

          {/* Seed DB Button */}
          <button
            onClick={handleSeedDatabase}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f0ea] border border-[#eae3e0] text-xs font-semibold text-[#142334] transition-colors flex items-center gap-1.5"
            title="Populate MongoDB with default initial projects"
          >
            <Database className="w-3.5 h-3.5 text-[#a67d64]" />
            <span>Seed DB</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchProperties}
            disabled={loading}
            className="p-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f0ea] border border-[#eae3e0] text-[#142334] transition-colors"
            title="Refresh from MongoDB"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Add Property Button */}
          <button
            onClick={handleOpenAdd}
            className="btn-primary text-xs py-2 px-4 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

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

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-bold text-base text-[#142334] leading-snug line-clamp-1">
                      {property.name}
                    </h3>
                    <p className="text-xs text-[#715343] flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3 h-3 text-[#a67d64] shrink-0" />
                      <span>{property.location}</span>
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#715343] block">Pricing</span>
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

              {/* Images (1 URL per line) */}
              <div>
                <label className="block font-semibold text-[#142334] mb-1">
                  Image URLs (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.imagesText}
                  onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                  placeholder="/projects/anvi-homes-1.jpg&#10;/projects/anvi-homes-2.jpg&#10;/projects/anvi-homes-3.jpg"
                  className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-mono text-[11px] focus:outline-none focus:border-[#c9ad98]"
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
      {/* 4. DELETE CONFIRMATION MODAL */}
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

            <div className="p-3 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] text-xs text-[#715343]">
              This action cannot be undone. The property will immediately disappear from live listings.
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="btn-secondary py-2 px-4 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="py-2 px-5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Deleting...' : 'Yes, Delete Property'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
