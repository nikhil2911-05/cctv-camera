import React, { useState, useEffect } from 'react';
import { Settings, Key, Smartphone, Server, ShieldCheck, Save, CheckCircle2, Zap, Eye, EyeOff, Radio } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [fast2smsKey, setFast2smsKey] = useState(() => localStorage.getItem('FAST2SMS_API_KEY') || '');
  const [targetPhone, setTargetPhone] = useState(() => localStorage.getItem('TARGET_PHONE_NUMBER') || '7807483763');
  const [backendUrl, setBackendUrl] = useState(() => localStorage.getItem('BACKEND_SERVER_URL') || 'http://localhost:8000');
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(() => localStorage.getItem('AUTO_SMS_ENABLED') !== 'false');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('FAST2SMS_API_KEY', fast2smsKey);
    localStorage.setItem('TARGET_PHONE_NUMBER', targetPhone);
    localStorage.setItem('BACKEND_SERVER_URL', backendUrl);
    localStorage.setItem('AUTO_SMS_ENABLED', autoSmsEnabled);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestBackend = async () => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const res = await fetch(`${backendUrl}/`);
      const data = await res.json();
      setTestingConnection(false);
      setTestResult({
        success: true,
        message: `Connected to ${data.service || 'Backend Gateway'}. Fast2SMS Configured: ${data.fast2sms_api_configured ? 'YES' : 'NO'}`
      });
    } catch (err) {
      setTestingConnection(false);
      setTestResult({
        success: false,
        message: `Unable to connect to ${backendUrl}. Ensure FastAPI backend server is running.`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-navy-700 text-white shadow-md shadow-navy-700/20">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">System & API Key Settings</h3>
              <p className="text-xs text-slate-400">Configure Cellular Gateways, API Keys & Remote Endpoints</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-sm flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* SECTION 1: Fast2SMS Cellular API Key */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-navy-700" />
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Fast2SMS Cellular API Key</h4>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                placeholder="Enter your Fast2SMS Authorization API key..."
                value={fast2smsKey}
                onChange={(e) => setFast2smsKey(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 pr-10 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-navy-700 focus:outline-none bg-white"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Obtain your API key from <a href="https://www.fast2sms.com" target="_blank" rel="noreferrer" className="text-navy-700 underline font-semibold">fast2sms.com</a>. This enables real SMS alert delivery to user cell phones when suspicious activity is detected.
            </p>
          </div>

          {/* SECTION 2: Target User Phone Number */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Target User Mobile Number</h4>
            </div>

            <div>
              <input
                type="text"
                placeholder="7807483763"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 p-3 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Primary recipient for automated emergency alerts when perimeter motion, intruder, or watchlist FRS match is detected.
            </p>
          </div>

          {/* SECTION 3: Remote Server Endpoint */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Remote Backend Gateway URL</h4>
              </div>

              <button
                type="button"
                onClick={handleTestBackend}
                disabled={testingConnection}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold border border-indigo-200 flex items-center space-x-1"
              >
                <Radio className={`w-3 h-3 ${testingConnection ? 'animate-spin' : ''}`} />
                <span>{testingConnection ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="http://localhost:8000"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 p-3 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
              />
            </div>

            {testResult && (
              <div className={`p-2.5 rounded-xl text-[11px] font-semibold flex items-center space-x-1.5 ${
                testResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <span>{testResult.success ? '✅' : '❌'}</span>
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* SECTION 4: Automatic Alert Dispatch Toggle */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-900 to-indigo-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Automated SMS Alert Dispatch</h4>
                <p className="text-[11px] text-slate-300">Automatically send Fast2SMS alert when threat is detected</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAutoSmsEnabled(!autoSmsEnabled)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                autoSmsEnabled ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {autoSmsEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          {/* Save Action */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-navy-700 hover:bg-navy-600 text-white font-bold text-xs shadow-lg flex items-center space-x-2 transition-all"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
