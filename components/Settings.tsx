import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">API Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">
              Backend URL
            </label>
            <input 
              type="text" 
              value="https://faftech-be.vercel.app/api/v1"
              readOnly
              className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-slate-300"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 block">
              Environment
            </label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                Production
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Display Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-card-dark/50 border border-primary/10">
            <div>
              <p className="text-sm font-medium text-white">Dark Mode</p>
              <p className="text-[10px] text-slate-500">Always enabled</p>
            </div>
            <span className="material-icons-round text-primary">check_circle</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-card-dark/50 border border-primary/10">
            <div>
              <p className="text-sm font-medium text-white">Animations</p>
              <p className="text-[10px] text-slate-500">Enable UI animations</p>
            </div>
            <span className="material-icons-round text-primary">check_circle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;