import React from 'react';
import { LogEntry } from '../types';

const Logs: React.FC = () => {
  const logs: LogEntry[] = [
    { id: '1', action: 'Added New Project', resource: 'portfolio-v3-redesign', admin: 'Alex Faftech', status: 'Success', timestamp: '2 mins ago' },
    { id: '2', action: 'Updated Article', resource: 'future-of-ai-dev', admin: 'System Bot', status: 'Success', timestamp: '1 hour ago' },
    { id: '3', action: 'Failed Login Attempt', resource: 'auth-endpoint-v1', admin: 'External IP', status: 'Blocked', timestamp: '4 hours ago' },
    { id: '4', action: 'Deleted Project', resource: 'old-portfolio', admin: 'Alex Faftech', status: 'Success', timestamp: '1 day ago' },
    { id: '5', action: 'Updated Profile', resource: 'admin-settings', admin: 'Alex Faftech', status: 'Success', timestamp: '2 days ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          System Logs
          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500/20 text-red-500 border border-red-500/30 rounded uppercase tracking-widest">
            {logs.length} ENTRIES
          </span>
        </h1>
        <button className="bg-card-dark/50 border border-primary/10 rounded-lg px-3 py-2 text-slate-400 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-bold uppercase">
          <span className="material-icons-round text-lg">download</span> Export
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-primary/5 border-b border-primary/10">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resource</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-primary/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${log.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'} flex items-center justify-center`}>
                      <span className="material-icons-round text-sm">{log.status === 'Success' ? 'add_circle' : 'warning'}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-200">{log.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 font-mono">{log.resource}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{log.admin}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${log.status === 'Success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} text-[9px] font-bold uppercase tracking-tight border`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 text-right">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;