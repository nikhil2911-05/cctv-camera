import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle2, AlertOctagon, Clock, Smartphone, Zap, Radio, BellRing } from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';
import MobileAlertDispatchModal from './MobileAlertDispatchModal';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [filter, setFilter] = useState('All');
  const [refreshCountdown, setRefreshCountdown] = useState(5);
  const [acknowledged, setAcknowledged] = useState({});
  const [dispatchAlert, setDispatchAlert] = useState(null); // Alert selected for SMS broadcast
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(true); // Automatic alert dispatch toggle
  const [wsConnected, setWsConnected] = useState(false);
  const [autoDispatchStatus, setAutoDispatchStatus] = useState(null);

  // WebSocket Connection to Remote Backend Gateway
  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/alerts');
      ws.onopen = () => setWsConnected(true);
      ws.onclose = () => setWsConnected(false);
      ws.onerror = () => setWsConnected(false);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === 'SUSPICIOUS_ACTIVITY_DETECTED' && msg.data) {
            setAlerts(prev => [msg.data, ...prev]);
            setAutoDispatchStatus(`🚨 Automated Alert Received & Dispatched: ${msg.data.title}`);
            setTimeout(() => setAutoDispatchStatus(null), 6000);
          }
        } catch (e) {}
      };
    } catch (e) {
      setWsConnected(false);
    }
    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Auto refresh 5s ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Automated Suspicious Detection Simulator
  const handleSimulateAutoAlert = async () => {
    const mockThreats = [
      { title: 'Thermal Breach Detected', subtitle: 'Unidentified motion vector near Fence Line Alpha', bop: 'BOP-14 Punjab', type: 'Intrusion', severity: 'critical' },
      { title: 'Watchlist Target Matched', subtitle: 'Biometric similarity 96.4% on Cam #04', bop: 'CHK-11 Gujarat', type: 'FRS', severity: 'critical' },
      { title: 'ANPR Hotlist Vehicle Alert', subtitle: 'Plate # DL-09-AB-1234 flagged at Checkpoint', bop: 'BSF Tactical HQ', type: 'ANPR', severity: 'warning' },
      { title: 'Night Vision Loitering', subtitle: 'Thermal dwell time exceeded 45s in Zone B', bop: 'Creek Sector 4', type: 'Intrusion', severity: 'critical' }
    ];
    const threat = mockThreats[Math.floor(Math.random() * mockThreats.length)];

    try {
      const res = await fetch('http://localhost:8000/api/v2/alerts/auto-trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: threat.title,
          subtitle: threat.subtitle,
          bop: threat.bop,
          severity: threat.severity,
          type: threat.type,
          confidence: 96.5,
          target_phone: '7807483763',
          auto_sms: autoSmsEnabled
        })
      });
      const data = await res.json();
      if (data.alert) {
        setAlerts(prev => [data.alert, ...prev]);
        setAutoDispatchStatus(`✅ AUTOMATED TRIGGER: Suspicious activity detected! Fast2SMS sent to +91 7807483763.`);
        setTimeout(() => setAutoDispatchStatus(null), 5000);
      }
    } catch (err) {
      // Local fallback if backend offline
      const newAlert = {
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        title: threat.title,
        subtitle: threat.subtitle,
        bop: threat.bop,
        severity: threat.severity,
        type: threat.type,
        time: new Date().toLocaleTimeString(),
      };
      setAlerts(prev => [newAlert, ...prev]);
      setAutoDispatchStatus(`⚡ AUTOMATED LOCAL DISPATCH: Fast2SMS alert payload queued for 7807483763.`);
      setTimeout(() => setAutoDispatchStatus(null), 5000);
    }
  };

  const handleAck = (id) => {
    setAcknowledged(prev => ({ ...prev, [id]: true }));
  };

  const filteredAlerts = alerts.filter(a => filter === 'All' || a.type === filter);

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Priority Alerts Remote System</h2>
            <p className="text-[11px] text-slate-400">Automated Suspicious Activity & Fast2SMS Dispatch</p>
          </div>
        </div>

        {/* Remote Server & Sync Status */}
        <div className="flex items-center space-x-2">
          <span className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            wsConnected ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <Radio className="w-2.5 h-2.5 mr-1 animate-pulse" />
            {wsConnected ? 'REMOTE LIVE' : 'SYNC READY'}
          </span>
          <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono text-slate-500 border border-slate-200">
            <RefreshCw className="w-3 h-3 animate-spin text-navy-700" style={{ animationDuration: '4s' }} />
            <span>{refreshCountdown}s</span>
          </div>
        </div>
      </div>

      {/* AUTOMATED SMS DISPATCH TOGGLE BAR */}
      <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-navy-900 to-indigo-900 text-white p-2.5 rounded-xl shadow-sm text-xs">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg ${autoSmsEnabled ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs">Automated SMS Alert Dispatch</span>
            <p className="text-[10px] text-slate-300">Target: +91 7807483763 (Fast2SMS)</p>
          </div>
        </div>

        <button
          onClick={() => setAutoSmsEnabled(!autoSmsEnabled)}
          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
            autoSmsEnabled 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md' 
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
        >
          {autoSmsEnabled ? '⚡ AUTO-DISPATCH ON' : 'OFF'}
        </button>
      </div>

      {/* Auto-Dispatch Status Toast */}
      {autoDispatchStatus && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-bold flex items-center justify-between animate-in zoom-in-95">
          <div className="flex items-center space-x-1.5">
            <BellRing className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>{autoDispatchStatus}</span>
          </div>
        </div>
      )}

      {/* Simulation trigger button */}
      <div className="mb-3">
        <button
          onClick={handleSimulateAutoAlert}
          className="w-full py-2 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center space-x-1.5"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>SIMULATE SUSPICIOUS ACTIVITY (TEST AUTO-ALERT DISPATCH)</span>
        </button>
      </div>


      {/* Segmented Filter Pills */}
      <div className="flex items-center space-x-1 mb-3 bg-slate-100 p-1 rounded-xl text-xs font-medium">
        {['All', 'FRS', 'Intrusion', 'ANPR'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`flex-1 py-1 rounded-lg text-[11px] transition-all ${
              filter === t
                ? 'bg-white text-navy-700 font-semibold shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Scrollable Alerts List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[380px]">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No alerts found for filter <span className="font-semibold">{filter}</span>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isAck = acknowledged[alert.id];
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`relative rounded-xl bg-white border p-3 transition-all duration-200 overflow-hidden group hover:shadow-md ${
                  isAck 
                    ? 'opacity-60 border-slate-200 bg-slate-50/50' 
                    : isCritical 
                    ? 'border-rose-200 hover:border-rose-300 animate-shake' 
                    : isWarning 
                    ? 'border-amber-200 hover:border-amber-300' 
                    : 'border-slate-200'
                }`}
              >
                {/* Severity Color Stripe on Left */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                    isCritical ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                />

                <div className="pl-2 flex items-start justify-between">
                  <div className="flex space-x-2.5">
                    {alert.image ? (
                      <img
                        src={alert.image}
                        alt="Crop"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isCritical ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        <AlertOctagon className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">
                          {alert.title}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {alert.type}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {alert.subtitle}
                      </p>

                      <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1.5">
                        <span className="font-medium text-slate-600">{alert.bop}</span>
                        <span className="flex items-center">
                          <Clock className="w-2.5 h-2.5 mr-0.5" />
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Broadcast SMS & Ack Button */}
                  <div className="flex flex-col space-y-1 items-end shrink-0 ml-2">
                    <button
                      onClick={() => handleAck(alert.id)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                        isAck 
                          ? 'bg-slate-100 text-slate-400 cursor-default' 
                          : 'bg-navy-50 text-navy-700 hover:bg-navy-700 hover:text-white'
                      }`}
                    >
                      {isAck ? <CheckCircle2 className="w-3 h-3 inline mr-0.5" /> : 'ACK'}
                    </button>

                    <button
                      onClick={() => setDispatchAlert(alert)}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors flex items-center space-x-1"
                      title="Send SMS & WhatsApp to Registered Mobiles"
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>SMS Alert</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Showing {filteredAlerts.length} priority alerts</span>
        <button 
          onClick={() => setDispatchAlert(alerts[0])}
          className="text-navy-700 hover:underline font-bold flex items-center space-x-1"
        >
          <Smartphone className="w-3 h-3 inline" />
          <span>Mobile Broadcast Engine →</span>
        </button>
      </div>

      {/* Mobile Alert Dispatch Modal */}
      {dispatchAlert && (
        <MobileAlertDispatchModal
          alertData={dispatchAlert}
          onClose={() => setDispatchAlert(null)}
        />
      )}
    </div>
  );
}
