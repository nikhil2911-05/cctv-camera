import React, { useState } from 'react';
import { 
  UserCheck, 
  Shield, 
  Search, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Phone, 
  Award, 
  CheckCircle2, 
  Lock, 
  Download, 
  User, 
  UserPlus, 
  Trash2, 
  X, 
  Plus, 
  ShieldAlert, 
  Filter, 
  Check,
  Upload,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

const MOCK_TARGET_DOSSIERS = [
  {
    id: 'TGT-8821',
    name: 'Rajesh Kumar @ "Raju Kahlon"',
    category: 'High Risk / Watchlist A',
    riskLevel: 'CRITICAL',
    aadhaarPassport: 'XXXX-XXXX-9912 / IND-P892019',
    age: 38,
    nationality: 'Indian National',
    primaryBop: 'CHK-11 Gujarat / BOP-14 Punjab',
    lastSeen: '12:04 PM today at CHK-11 Creek Post',
    frsConfidence: '94.1%',
    biometricHash: '8f92a1c0...e349b1',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    details: 'Subject wanted in connection with cross-border contraband smuggling & unlicensed radio equipment possession.',
    associates: ['Target #4419 (Vikram S.)', 'Driver of MH12 AB 1234'],
    sightings: [
      { location: 'CHK-11 Gujarat Creek Post', time: '12:04 PM Today', camera: 'CAM-104 Coastal PTZ', confidence: '94.1%' },
      { location: 'BOP-14 Punjab Checkpoint 09', time: 'Yesterday 09:15 PM', camera: 'CAM-101 Thermal IR', confidence: '89.6%' },
      { location: 'Amritsar Transport Hub', time: '14 Sep 2025 04:30 PM', camera: 'ANPR Gate 2', confidence: '91.2%' }
    ]
  },
  {
    id: 'TGT-4419',
    name: 'Vikram Singh @ "Vicky"',
    category: 'Watchlist B / Suspect',
    riskLevel: 'HIGH',
    aadhaarPassport: 'XXXX-XXXX-4410 / IND-K102938',
    age: 42,
    nationality: 'Indian National',
    primaryBop: 'BOP-14 Punjab Gate 2',
    lastSeen: 'Yesterday 08:30 PM at BOP-14 Punjab',
    frsConfidence: '88.5%',
    biometricHash: '3d11b9a2...c882d4',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    details: 'Repeated unauthorized presence near perimeter fence line during zero-line patrol shifts.',
    associates: ['Target #8821'],
    sightings: [
      { location: 'BOP-14 Punjab Gate 2', time: 'Yesterday 08:30 PM', camera: 'CAM-101 Infrared', confidence: '88.5%' }
    ]
  }
];

const INITIAL_OFFICERS = [
  {
    id: 'OFF-101',
    name: 'Capt. Vikram Sharma',
    serviceId: 'BSF-OFF-2025-992',
    rank: 'Commanding Duty Officer',
    unit: 'BSF 14th Battalion · Western Command',
    sector: 'Punjab Frontier',
    dutyStatus: 'ON DUTY',
    shiftTime: '06h 42m elapsed',
    clearance: 'LEVEL 5 (TOP SECRET)',
    contact: '+91 7807483763',
    location: 'BSF Tactical Operations Center (TOC)',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    stats: { alertsHandledToday: 42, incidentsApproved: 18, avgResponseMinutes: '1.4 mins' }
  },
  {
    id: 'OFF-102',
    name: 'Inspector Anita Roy',
    serviceId: 'BSF-OFF-2025-410',
    rank: 'Senior Intelligence Analyst',
    unit: 'BSF Biometric Surveillance Cell',
    sector: 'Gujarat Creek Sector',
    dutyStatus: 'ON DUTY',
    shiftTime: '04h 15m elapsed',
    clearance: 'LEVEL 4 (SECRET)',
    contact: '+91 98123-45678',
    location: 'CHK-11 Gujarat Control Outpost',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    stats: { alertsHandledToday: 35, incidentsApproved: 12, avgResponseMinutes: '1.8 mins' }
  },
  {
    id: 'OFF-103',
    name: 'Sub-Inspector Rajesh Singh',
    serviceId: 'BSF-OFF-2025-331',
    rank: 'Field Patrol Commander',
    unit: '8th Battalion Rapid Response Unit',
    sector: 'Rajasthan Thar Sector',
    dutyStatus: 'STANDBY',
    shiftTime: '01h 10m elapsed',
    clearance: 'LEVEL 3 (CONFIDENTIAL)',
    contact: '+91 97654-32109',
    location: 'CHK-07 Thar Patrol Base',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    stats: { alertsHandledToday: 19, incidentsApproved: 8, avgResponseMinutes: '2.1 mins' }
  },
  {
    id: 'OFF-104',
    name: 'Specialist Sunita Meena',
    serviceId: 'BSF-OFF-2025-508',
    rank: 'AI Drone & Thermal Operator',
    unit: 'BSF Airborne Reconnaissance Wing',
    sector: 'Jammu Riverine Sector',
    dutyStatus: 'OFF DUTY',
    shiftTime: 'Shift Starts 18:00',
    clearance: 'LEVEL 4 (SECRET)',
    contact: '+91 99887-76655',
    location: 'Jammu Base Airfield',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    stats: { alertsHandledToday: 28, incidentsApproved: 9, avgResponseMinutes: '1.2 mins' }
  }
];

export default function PersonalDetailsSection() {
  const [activeTab, setActiveTab] = useState('officers'); // 'officers' | 'targets'
  const [selectedTarget, setSelectedTarget] = useState(MOCK_TARGET_DOSSIERS[0]);
  const [targetSearch, setTargetSearch] = useState('');

  // Officer Management State
  const [officers, setOfficers] = useState(INITIAL_OFFICERS);
  const [selectedOfficer, setSelectedOfficer] = useState(INITIAL_OFFICERS[0]);
  const [officerSearch, setOfficerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ON DUTY' | 'STANDBY' | 'OFF DUTY'
  
  // Add Officer Modal & Notice State
  const [showAddModal, setShowAddModal] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');
  const [newOfficer, setNewOfficer] = useState({
    name: '',
    serviceId: '',
    rank: 'Inspector',
    unit: 'BSF 14th Battalion',
    sector: 'Punjab Frontier',
    dutyStatus: 'ON DUTY',
    clearance: 'LEVEL 4 (SECRET)',
    contact: '+91 7807483763',
    location: 'BSF Tactical Command',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  });

  // Filter Targets
  const filteredTargets = MOCK_TARGET_DOSSIERS.filter(t => 
    t.name.toLowerCase().includes(targetSearch.toLowerCase()) ||
    t.id.toLowerCase().includes(targetSearch.toLowerCase())
  );

  // Filter Officers
  const filteredOfficers = officers.filter(off => {
    const matchesSearch = 
      off.name.toLowerCase().includes(officerSearch.toLowerCase()) ||
      off.serviceId.toLowerCase().includes(officerSearch.toLowerCase()) ||
      off.rank.toLowerCase().includes(officerSearch.toLowerCase()) ||
      off.sector.toLowerCase().includes(officerSearch.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || off.dutyStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Add Officer Submit
  const handleAddOfficer = (e) => {
    e.preventDefault();
    if (!newOfficer.name || !newOfficer.serviceId) return;

    const createdOfficer = {
      ...newOfficer,
      id: `OFF-${Date.now().toString().slice(-4)}`,
      shiftTime: '00h 05m elapsed',
      stats: { alertsHandledToday: 0, incidentsApproved: 0, avgResponseMinutes: '0.0 mins' }
    };

    setOfficers([createdOfficer, ...officers]);
    setSelectedOfficer(createdOfficer);
    setShowAddModal(false);
    
    // Reset Form
    setNewOfficer({
      name: '',
      serviceId: '',
      rank: 'Inspector',
      unit: 'BSF 14th Battalion',
      sector: 'Punjab Frontier',
      dutyStatus: 'ON DUTY',
      clearance: 'LEVEL 4 (SECRET)',
      contact: '+91 7807483763',
      location: 'BSF Tactical Command',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    });

    setNoticeMessage(`✓ Added Officer ${createdOfficer.name} (${createdOfficer.serviceId}) to active duty roster.`);
    setTimeout(() => setNoticeMessage(''), 4000);
  };

  // Handle Remove Officer
  const handleRemoveOfficer = (officerId) => {
    const targetOff = officers.find(o => o.id === officerId);
    if (!targetOff) return;

    const confirmRemove = window.confirm(`Are you sure you want to remove Officer ${targetOff.name} (${targetOff.serviceId}) from the active roster?`);
    if (!confirmRemove) return;

    const updated = officers.filter(o => o.id !== officerId);
    setOfficers(updated);
    if (selectedOfficer?.id === officerId) {
      setSelectedOfficer(updated[0] || null);
    }

    setNoticeMessage(`🗑️ Removed Officer ${targetOff.name} from BSF Roster.`);
    setTimeout(() => setNoticeMessage(''), 4000);
  };

  // Handle Photo Upload for New Officer Form
  const handleNewOfficerPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewOfficer(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  // Handle Photo Update for Selected Officer
  const handleUpdateSelectedOfficerPhoto = (e) => {
    const file = e.target.files[0];
    if (file && selectedOfficer) {
      const imageUrl = URL.createObjectURL(file);
      const updatedOfficer = { ...selectedOfficer, photo: imageUrl };
      setSelectedOfficer(updatedOfficer);
      setOfficers(officers.map(o => o.id === selectedOfficer.id ? updatedOfficer : o));
      setNoticeMessage(`📷 Updated profile picture for ${selectedOfficer.name}.`);
      setTimeout(() => setNoticeMessage(''), 4000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-navy-700 text-white shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Personnel Intelligence & Officer Roster</h1>
            <p className="text-xs text-slate-500">Manage Active Duty Officers & Watchlist Target Dossiers</p>
          </div>
        </div>

        {/* Action Controls & Segmented Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {activeTab === 'officers' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-navy-700 hover:bg-navy-600 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Officer</span>
            </button>
          )}

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('officers')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'officers' ? 'bg-white text-navy-700 font-bold shadow-sm' : 'text-slate-500'
              }`}
            >
              Duty Officer Roster ({officers.length})
            </button>
            <button
              onClick={() => setActiveTab('targets')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'targets' ? 'bg-white text-navy-700 font-bold shadow-sm' : 'text-slate-500'
              }`}
            >
              Watchlist Target Dossiers
            </button>
          </div>
        </div>
      </div>

      {/* Global Notice Toast */}
      {noticeMessage && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
          <button onClick={() => setNoticeMessage('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: DUTY OFFICER MANAGEMENT & ROSTER */}
      {activeTab === 'officers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Column (Span 5): Officers Directory List */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search officers by name, ID, rank..."
                  value={officerSearch}
                  onChange={(e) => setOfficerSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-[11px] font-medium w-full sm:w-auto justify-between">
                {['ALL', 'ON DUTY', 'STANDBY', 'OFF DUTY'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      statusFilter === status ? 'bg-white text-navy-700 font-bold shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {status === 'ALL' ? 'All' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Officer List Cards */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto">
              {filteredOfficers.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  No officer records matching search criteria.
                </div>
              ) : (
                filteredOfficers.map((officer) => {
                  const isSelected = selectedOfficer?.id === officer.id;
                  return (
                    <div
                      key={officer.id}
                      onClick={() => setSelectedOfficer(officer)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-white border-navy-700 ring-2 ring-navy-700/20 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={officer.photo}
                          alt={officer.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900 text-xs truncate">{officer.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full shrink-0 ${
                              officer.dutyStatus === 'ON DUTY' 
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : officer.dutyStatus === 'STANDBY'
                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {officer.dutyStatus}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">{officer.rank} · {officer.sector}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {officer.serviceId} · {officer.contact}</div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOfficer(officer.id);
                        }}
                        title="Remove Officer from Roster"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column (Span 7): Detailed Officer Dossier & Telemetry */}
          <div className="lg:col-span-7">
            {selectedOfficer ? (
              <div className="glass-panel rounded-2xl p-5 border border-[#ECECEE] bg-white space-y-4 shadow-sm">
                {/* Profile Banner */}
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 pb-4 border-b border-slate-100">
                  <div className="relative group shrink-0">
                    <img
                      src={selectedOfficer.photo}
                      alt={selectedOfficer.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-navy-700 shadow-md"
                    />
                    <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-navy-700 hover:bg-navy-600 text-white cursor-pointer shadow-md transition-transform hover:scale-110" title="Upload New Officer Picture">
                      <Camera className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpdateSelectedOfficerPhoto}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{selectedOfficer.name}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        selectedOfficer.dutyStatus === 'ON DUTY' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {selectedOfficer.dutyStatus}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-navy-700 mt-0.5">{selectedOfficer.rank}</p>
                    <p className="text-xs text-slate-500">{selectedOfficer.unit} · {selectedOfficer.sector}</p>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">Service ID: {selectedOfficer.serviceId}</div>
                  </div>

                  <button
                    onClick={() => handleRemoveOfficer(selectedOfficer.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center space-x-1.5 self-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Officer</span>
                  </button>
                </div>

                {/* Daily Performance Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-xl font-bold text-navy-700 tabular-nums">{selectedOfficer.stats.alertsHandledToday}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Alerts Evaluated</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-xl font-bold text-navy-700 tabular-nums">{selectedOfficer.stats.incidentsApproved}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Incidents Approved</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-xl font-bold text-emerald-600 tabular-nums">{selectedOfficer.stats.avgResponseMinutes}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Avg Response Time</div>
                  </div>
                </div>

                {/* Duty Details */}
                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Security Clearance Level:</span>
                    <span className="font-bold text-rose-700">{selectedOfficer.clearance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tactical Station Location:</span>
                    <span className="font-semibold text-slate-800">{selectedOfficer.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact Phone (Cellular SMS Target):</span>
                    <span className="font-mono font-bold text-slate-900">{selectedOfficer.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Shift Elapsed:</span>
                    <span className="font-mono font-semibold text-slate-800">{selectedOfficer.shiftTime}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                Select an officer from the list to view complete personnel telemetry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: WATCHLIST TARGET PERSONAL DETAILS */}
      {activeTab === 'targets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by target name or ID..."
                value={targetSearch}
                onChange={(e) => setTargetSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              />
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto">
              {filteredTargets.map((target) => {
                const isSelected = selectedTarget?.id === target.id;
                return (
                  <div
                    key={target.id}
                    onClick={() => setSelectedTarget(target)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-white border-navy-700 ring-2 ring-navy-700/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <img
                      src={target.photo}
                      alt={target.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs truncate">{target.name}</span>
                        <span className="text-[10px] font-mono font-bold text-navy-700 bg-navy-50 px-1.5 py-0.2 rounded">
                          {target.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{target.category}</div>
                      <div className="text-[10px] text-rose-600 font-bold mt-1">FRS Conf: {target.frsConfidence}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            {selectedTarget && (
              <div className="glass-panel rounded-2xl p-5 border border-[#ECECEE] bg-white space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedTarget.photo}
                      alt={selectedTarget.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-rose-500 shadow-md"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-bold text-slate-900">{selectedTarget.name}</h2>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          {selectedTarget.riskLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{selectedTarget.category}</p>
                      <div className="text-[11px] text-slate-400 font-mono mt-1">ID: {selectedTarget.id} · Hash: {selectedTarget.biometricHash}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Exported encrypted BSF Intelligence Dossier for ${selectedTarget.name}.`)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-navy-700 text-white text-xs font-semibold hover:bg-navy-600 transition-colors shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Intelligence Report</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Aadhaar / Passport</span>
                    <span className="font-mono font-semibold text-slate-800">{selectedTarget.aadhaarPassport}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Age / Nationality</span>
                    <span className="font-semibold text-slate-800">{selectedTarget.age} yrs · {selectedTarget.nationality}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Border Sector</span>
                    <span className="font-semibold text-slate-800">{selectedTarget.primaryBop}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 space-y-1">
                  <div className="font-bold flex items-center space-x-1 text-rose-700">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Intelligence Remarks & Rationale</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">{selectedTarget.details}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD OFFICER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-navy-700 text-white">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Add New Officer to Duty Roster</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddOfficer} className="p-5 space-y-3 text-xs">
              
              {/* Officer Photo Upload Field */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Officer Profile Picture *</label>
                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <img
                    src={newOfficer.photo}
                    alt="Officer Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-navy-700 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-sm transition-all">
                      <Upload className="w-3.5 h-3.5 text-navy-700" />
                      <span>Upload Officer Picture</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewOfficerPhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-slate-400 block mt-1 truncate">Select picture from your computer (JPG, PNG, WEBP)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Full Officer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Major Amit Verma"
                    value={newOfficer.name}
                    onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Service ID / Badge No *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BSF-OFF-2025-884"
                    value={newOfficer.serviceId}
                    onChange={(e) => setNewOfficer({ ...newOfficer, serviceId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Rank / Designation</label>
                  <select
                    value={newOfficer.rank}
                    onChange={(e) => setNewOfficer({ ...newOfficer, rank: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  >
                    <option value="Commandant">Commandant</option>
                    <option value="Captain / Major">Captain / Major</option>
                    <option value="Inspector">Inspector</option>
                    <option value="Sub-Inspector">Sub-Inspector</option>
                    <option value="Surveillance Specialist">Surveillance Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Duty Status</label>
                  <select
                    value={newOfficer.dutyStatus}
                    onChange={(e) => setNewOfficer({ ...newOfficer, dutyStatus: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  >
                    <option value="ON DUTY">ON DUTY</option>
                    <option value="STANDBY">STANDBY</option>
                    <option value="OFF DUTY">OFF DUTY</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Border Sector</label>
                  <input
                    type="text"
                    placeholder="e.g. Punjab Frontier / CHK-11 Gujarat"
                    value={newOfficer.sector}
                    onChange={(e) => setNewOfficer({ ...newOfficer, sector: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Cellular Phone Number (Fast2SMS Target)</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 7807483763"
                    value={newOfficer.contact}
                    onChange={(e) => setNewOfficer({ ...newOfficer, contact: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Unit / Battalion</label>
                <input
                  type="text"
                  placeholder="e.g. BSF 14th Battalion · Rapid Response Unit"
                  value={newOfficer.unit}
                  onChange={(e) => setNewOfficer({ ...newOfficer, unit: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-navy-700 hover:bg-navy-600 text-white font-bold shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Officer Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

