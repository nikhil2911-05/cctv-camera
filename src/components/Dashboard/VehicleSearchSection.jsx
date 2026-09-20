import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Camera, 
  Plus, 
  MapPin, 
  Eye, 
  FileText, 
  ChevronRight,
  Database,
  Upload,
  Check,
  RefreshCw,
  Sparkles,
  Layers,
  CheckCheck
} from 'lucide-react';

// DataCluster Labs – Indian Number Plates Dataset (Multi-State RTO & Vehicle Categories)
const DATACLUSTER_INDIAN_PLATES_DATASET = [
  {
    plate: 'MH12 AB 1234',
    state: 'Maharashtra (MH-12 Pune RTO)',
    status: 'HOTLISTED',
    vehicleType: 'SUV (White Mahindra Thar)',
    category: '4-Wheeler SUV',
    owner: 'Unknown / Suspicious',
    reason: 'Wanted in cross-border smuggling investigation #2025-A',
    lastSeenBop: 'CHK-07 Rajasthan Hwy 15',
    timestamp: '8 mins ago (12:02 PM)',
    confidence: '98.8%',
    speed: '64 km/h',
    direction: 'Heading West toward Checkpoint',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:140, y:220, w:180, h:50]', resolution: '1080p HD', ocrModel: 'PaddleOCR-v2 (DataCluster Fine-Tuned)' },
    history: [
      { bop: 'CHK-07 Rajasthan Hwy 15', time: '12:02 PM', speed: '64 km/h' },
      { bop: 'BOP-18 Barmer Sector', time: '11:15 AM', speed: '58 km/h' },
      { bop: 'Jodhpur Highway Check', time: '09:40 AM', speed: '72 km/h' },
    ]
  },
  {
    plate: 'PB08 CX 9918',
    state: 'Punjab (PB-08 Jalandhar RTO)',
    status: 'CLEARED',
    vehicleType: 'Commercial Freight Truck (Tata Signa 4825)',
    category: 'Heavy Commercial Truck',
    owner: 'Punjab Logistics Corp',
    reason: 'Verified Border Trade Permit #TP-9081',
    lastSeenBop: 'BOP-14 Punjab Cargo Gate',
    timestamp: '24 mins ago (11:46 AM)',
    confidence: '99.4%',
    speed: '22 km/h',
    direction: 'Entering Cargo Clearance Bay',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:210, y:310, w:220, h:60]', resolution: '4K UltraHD', ocrModel: 'EasyOCR-IN (DataCluster)' },
    history: [
      { bop: 'BOP-14 Punjab Cargo Gate', time: '11:46 AM', speed: '22 km/h' },
      { bop: 'Amritsar Bypass Toll', time: '10:30 AM', speed: '45 km/h' },
    ]
  },
  {
    plate: 'GJ01 WX 8821',
    state: 'Gujarat (GJ-01 Ahmedabad RTO)',
    status: 'FLAGGED',
    vehicleType: 'Sedan (Black Honda City)',
    category: 'Passenger Sedan',
    owner: 'Private Owner',
    reason: 'Repeated unauthorized late-night creek patrols',
    lastSeenBop: 'CHK-11 Gujarat Creek Road',
    timestamp: '42 mins ago (11:28 AM)',
    confidence: '96.5%',
    speed: '40 km/h',
    direction: 'Heading Coastal Way',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:180, y:240, w:190, h:55]', resolution: '1080p HD', ocrModel: 'PaddleOCR-v2' },
    history: [
      { bop: 'CHK-11 Gujarat Creek Road', time: '11:28 AM', speed: '40 km/h' },
      { bop: 'Kutch Outpost 04', time: '02:15 AM', speed: '35 km/h' },
    ]
  },
  {
    plate: 'DL01 AB 8844',
    state: 'Delhi (DL-01 Central Delhi RTO)',
    status: 'HOTLISTED',
    vehicleType: 'SUV (White Toyota Fortuner)',
    category: '4-Wheeler SUV',
    owner: 'High-Value Target Syndicate',
    reason: 'Flagged by NCB & BSF Intelligence Unit',
    lastSeenBop: 'BSF Tactical HQ Barrier',
    timestamp: '55 mins ago (11:15 AM)',
    confidence: '99.1%',
    speed: '52 km/h',
    direction: 'Approaching High-Security Zone',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:160, y:190, w:175, h:48]', resolution: '1080p HD', ocrModel: 'DataCluster ANPR-v4' },
    history: [
      { bop: 'BSF Tactical HQ Barrier', time: '11:15 AM', speed: '52 km/h' },
      { bop: 'Delhi-Jaipur Expressway Toll', time: '07:20 AM', speed: '88 km/h' }
    ]
  },
  {
    plate: 'HR26 DQ 5510',
    state: 'Haryana (HR-26 Gurugram RTO)',
    status: 'CLEARED',
    vehicleType: 'Delivery Van (Eicher Pro 2049)',
    category: 'Commercial Cargo',
    owner: 'National Freight Logistics',
    reason: 'Standard Cargo Scan Cleared',
    lastSeenBop: 'CHK-07 Rajasthan Hwy 15',
    timestamp: '1 hour ago (11:00 AM)',
    confidence: '97.9%',
    speed: '48 km/h',
    direction: 'Heading South Highway',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:190, y:260, w:200, h:52]', resolution: '1080p HD', ocrModel: 'DataCluster ANPR-v4' },
    history: [
      { bop: 'CHK-07 Rajasthan Hwy 15', time: '11:00 AM', speed: '48 km/h' }
    ]
  },
  {
    plate: 'KA05 EV 9012',
    state: 'Karnataka (KA-05 Bengaluru RTO)',
    status: 'CLEARED',
    vehicleType: 'Electric SUV (Green License Plate)',
    category: 'Electric Vehicle',
    owner: 'Govt Tech Liaison Officer',
    reason: 'Authorized Green Pass Clearance',
    lastSeenBop: 'BOP-14 Punjab Tech Outpost',
    timestamp: '1.5 hours ago (10:30 AM)',
    confidence: '99.6%',
    speed: '35 km/h',
    direction: 'Internal Campus Patrol',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:130, y:210, w:185, h:50]', resolution: '4K UltraHD', ocrModel: 'GreenPlate-OCR' },
    history: [
      { bop: 'BOP-14 Punjab Tech Outpost', time: '10:30 AM', speed: '35 km/h' }
    ]
  },
  {
    plate: 'UP32 BZ 7789',
    state: 'Uttar Pradesh (UP-32 Lucknow RTO)',
    status: 'FLAGGED',
    vehicleType: 'Fuel Tanker Truck (Ashok Leyland)',
    category: 'Hazardous Commercial',
    owner: 'UP Petroleum Transports',
    reason: 'Unscheduled route change & night loitering near fuel dump',
    lastSeenBop: 'Creek Fuel Dump Checkpoint',
    timestamp: '2 hours ago (10:00 AM)',
    confidence: '98.5%',
    speed: '18 km/h',
    direction: 'Diverted toward Border Buffer Zone',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:220, y:290, w:210, h:58]', resolution: '1080p HD', ocrModel: 'DataCluster ANPR-v4' },
    history: [
      { bop: 'Creek Fuel Dump Checkpoint', time: '10:00 AM', speed: '18 km/h' }
    ]
  },
  {
    plate: 'JK02 AV 9900',
    state: 'Jammu & Kashmir (JK-02 Jammu RTO)',
    status: 'HOTLISTED',
    vehicleType: 'Armored Patrol SUV (Mahindra Marksman)',
    category: 'Military / Security',
    owner: 'Stolen / Impersonating Security Patrol',
    reason: 'CRITICAL: Counterfeit registration matched against master DB',
    lastSeenBop: 'BOP-22 Jammu Riverine Gate',
    timestamp: '2.5 hours ago (09:30 AM)',
    confidence: '99.7%',
    speed: '70 km/h',
    direction: 'Speeding toward Riverine Crossing',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80',
    annotations: { box: '[x:150, y:200, w:190, h:54]', resolution: '4K Thermal', ocrModel: 'DefenseOCR-v3' },
    history: [
      { bop: 'BOP-22 Jammu Riverine Gate', time: '09:30 AM', speed: '70 km/h' },
      { bop: 'Samba Highway Post', time: '08:45 AM', speed: '85 km/h' }
    ]
  }
];

export default function VehicleSearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [vehicles, setVehicles] = useState(DATACLUSTER_INDIAN_PLATES_DATASET);
  const [selectedVehicle, setSelectedVehicle] = useState(DATACLUSTER_INDIAN_PLATES_DATASET[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDatasetInfo, setShowDatasetInfo] = useState(true);
  const [newPlate, setNewPlate] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newType, setNewType] = useState('SUV');

  // Filter vehicles
  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.lastSeenBop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
    const matchesState = stateFilter === 'ALL' || v.plate.startsWith(stateFilter);
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleAddHotlist = (e) => {
    e.preventDefault();
    if (!newPlate.trim()) return;

    const stateCode = newPlate.trim().slice(0, 2).toUpperCase();
    const newEntry = {
      plate: newPlate.toUpperCase(),
      state: `${stateCode} State Registered Vehicle`,
      status: 'HOTLISTED',
      vehicleType: newType,
      owner: 'Added by Duty Officer',
      reason: newReason || 'Added to DataCluster Indian ANPR Watchlist',
      lastSeenBop: 'Pending Scan...',
      timestamp: 'Just now',
      confidence: '100%',
      speed: '0 km/h',
      direction: 'Watchlist Active',
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=400&q=80',
      annotations: { box: '[x:150, y:200, w:180, h:50]', resolution: '1080p HD', ocrModel: 'DataCluster ANPR-v4' },
      history: [{ bop: 'Added to Watchlist', time: 'Just now', speed: '0 km/h' }]
    };

    setVehicles([newEntry, ...vehicles]);
    setSelectedVehicle(newEntry);
    setNewPlate('');
    setNewReason('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-md shadow-amber-600/20">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ANPR Vehicle License Plate Search</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 border border-navy-200">
                DataCluster Labs IN Dataset
              </span>
            </div>
            <p className="text-xs text-slate-500">Optical Character Recognition & Multi-State Indian Number Plate Tracker</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDatasetInfo(!showDatasetInfo)}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
          >
            <Database className="w-3.5 h-3.5 text-navy-700" />
            <span>Dataset Specs</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-navy-700 hover:bg-navy-600 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Plate to Hotlist</span>
          </button>
        </div>
      </div>

      {/* DataCluster Labs Dataset Integration Banner */}
      {showDatasetInfo && (
        <div className="bg-gradient-to-r from-navy-900 via-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-md border border-navy-700 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs">DataCluster Labs – Indian Number Plates Dataset Loaded</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                v4.2 Active (1,500+ Annotated Samples)
              </span>
            </div>
            <button onClick={() => setShowDatasetInfo(false)} className="text-slate-400 hover:text-white text-xs font-bold">
              ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Includes multi-state Indian license plate formats (MH, PB, GJ, DL, HR, KA, UP, JK) across diverse vehicle classes (SUVs, Commercial Freight Trucks, Sedans, Electric Vehicles, & Armored Patrol Vans) with high-precision OCR bounding box annotations and RTO location mapping.
          </p>
        </div>
      )}

      {/* Main Search Controls & Multi-Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-[#ECECEE] flex flex-col md:flex-row items-center gap-3 bg-white">
        {/* Number Plate Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search license plate (e.g. MH12 AB 1234, PB08, DL01), state, or vehicle type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-mono placeholder:font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:bg-white transition-all"
          />
        </div>

        {/* State RTO Filter Dropdown */}
        <div className="flex items-center space-x-1.5 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold shrink-0">State:</span>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
          >
            <option value="ALL">All Indian States</option>
            <option value="MH">MH (Maharashtra)</option>
            <option value="PB">PB (Punjab)</option>
            <option value="GJ">GJ (Gujarat)</option>
            <option value="DL">DL (Delhi)</option>
            <option value="HR">HR (Haryana)</option>
            <option value="KA">KA (Karnataka)</option>
            <option value="UP">UP (Uttar Pradesh)</option>
            <option value="JK">JK (Jammu & Kashmir)</option>
          </select>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium w-full md:w-auto">
          {['ALL', 'HOTLISTED', 'FLAGGED', 'CLEARED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                statusFilter === status
                  ? 'bg-white text-navy-700 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: Vehicle List (Left) & Deep Inspector Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Column (Span 5): Matching License Plate Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-500 flex items-center justify-between px-1">
            <span>DATACLUSTER RECOGNIZED RECORDS ({filteredVehicles.length})</span>
            <span className="font-mono text-[10px]">PADDLEOCR / EASYOCR ENGINE</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredVehicles.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-2xl text-xs text-slate-400 bg-white border border-slate-200">
                No vehicles matched filter "<span className="font-semibold text-slate-700">{searchTerm}</span>"
              </div>
            ) : (
              filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicle?.plate === vehicle.plate;
                const isHot = vehicle.status === 'HOTLISTED';
                const isFlagged = vehicle.status === 'FLAGGED';

                return (
                  <div
                    key={vehicle.plate}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-navy-700 ring-2 ring-navy-700/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                            {vehicle.plate}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHot ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                            isFlagged ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800 mt-1.5">{vehicle.vehicleType}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{vehicle.state}</div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400">{vehicle.timestamp}</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="flex items-center text-slate-600 truncate">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                        <span className="truncate">{vehicle.lastSeenBop}</span>
                      </span>
                      <span className="font-mono text-emerald-600 font-semibold text-[11px] shrink-0 ml-2">{vehicle.confidence} OCR</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (Span 7): Deep Vehicle Telemetry & History Inspector */}
        <div className="lg:col-span-7">
          {selectedVehicle ? (
            <div className="glass-panel rounded-2xl p-5 border border-[#ECECEE] space-y-4 bg-white shadow-sm">
              
              {/* Header Inspector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xl font-bold text-slate-900 bg-navy-50 text-navy-900 border border-navy-200 px-3 py-1 rounded-xl">
                      {selectedVehicle.plate}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      selectedVehicle.status === 'HOTLISTED' ? 'bg-rose-100 text-rose-700' :
                      selectedVehicle.status === 'FLAGGED' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {selectedVehicle.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{selectedVehicle.vehicleType}</p>
                  <p className="text-[11px] text-slate-400">{selectedVehicle.state}</p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs font-semibold text-emerald-600">ANPR OCR Confidence: {selectedVehicle.confidence}</div>
                  <div className="text-[11px] font-mono text-slate-400">Model: {selectedVehicle.annotations.ocrModel}</div>
                </div>
              </div>

              {/* ANPR Snapshot & Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Captured Image */}
                <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/10] border border-slate-200">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.plate}
                    className="w-full h-full object-cover"
                  />
                  {/* ANPR OCR Bounding Box overlay */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400 text-amber-300 font-mono text-xs font-bold shadow-md">
                    OCR: {selectedVehicle.plate}
                  </div>
                </div>

                {/* Telemetry Detail Box */}
                <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Registered Owner</span>
                    <span className="font-semibold text-slate-800">{selectedVehicle.owner}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Flag Rationale</span>
                    <span className="font-semibold text-rose-700">{selectedVehicle.reason}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Speed & Direction</span>
                    <span className="font-semibold text-slate-800">{selectedVehicle.speed} · {selectedVehicle.direction}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bounding Box Annotation</span>
                    <span className="font-mono text-[11px] text-slate-700">{selectedVehicle.annotations.box}</span>
                  </div>
                </div>
              </div>

              {/* Movement History Trail */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-navy-700" />
                  Border Sector Movement Trail
                </h3>
                <div className="space-y-2">
                  {selectedVehicle.history.map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-navy-700" />
                        <span className="font-semibold text-slate-800">{h.bop}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-slate-500 font-mono text-[11px]">
                        <span>{h.speed}</span>
                        <span>{h.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 text-xs bg-white border border-slate-200">
              Select a license plate from the left list to inspect detailed telemetry.
            </div>
          )}
        </div>
      </div>

      {/* Add to Hotlist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Add Plate to DataCluster ANPR Watchlist</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddHotlist} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">License Plate Number *</label>
                <input
                  type="text"
                  placeholder="e.g. MH12 AB 1234, PB08 XX 5555, DL01 XX 9999"
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-mono uppercase text-slate-900 focus:ring-2 focus:ring-navy-700/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Vehicle Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-navy-700/20 focus:outline-none"
                >
                  <option value="SUV">SUV</option>
                  <option value="Commercial Truck">Commercial Truck</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Electric Vehicle">Electric Vehicle</option>
                  <option value="Fuel Tanker">Fuel Tanker</option>
                  <option value="Security Patrol SUV">Security Patrol SUV</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Hotlist Reason / Note</label>
                <textarea
                  placeholder="Reason for flagging plate in DataCluster ANPR database..."
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-navy-700/20 focus:outline-none"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-navy-700 hover:bg-navy-600 text-white font-semibold transition-colors shadow-md"
                >
                  Add to Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
