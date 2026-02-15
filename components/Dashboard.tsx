
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LogEntry, Stats } from '../types';
import { getStats } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statsData = stats ? [
    { label: 'Projects', value: stats.projects.toString(), trend: 'Active projects', icon: 'rocket_launch', color: 'primary' },
    { label: 'Articles', value: stats.articles.toString(), trend: 'Published articles', icon: 'edit_note', color: 'accent-purple' },
    { label: 'Experiences', value: stats.experiences.toString(), trend: 'Work history', icon: 'work_history', color: 'primary' },
    { label: 'Skills', value: stats.skills.toString(), trend: 'Technologies', icon: 'bolt', color: 'accent-purple' },
  ] : [];

  const chartData = [
    { name: 'JAN', value: 40 },
    { name: 'FEB', value: 55 },
    { name: 'MAR', value: 48 },
    { name: 'APR', value: 75 },
    { name: 'MAY', value: 62 },
    { name: 'JUN', value: 85 },
  ];

  const pieData = stats ? [
    { name: 'Projects', value: stats.projects, color: '#06d4f9' },
    { name: 'Articles', value: stats.articles, color: '#8b5cf6' },
    { name: 'Exp', value: stats.experiences, color: '#475569' },
    { name: 'Skills', value: stats.skills, color: '#06d4f988' },
  ] : [];

  const logs: LogEntry[] = [
    { id: '1', action: 'Added New Project', resource: 'portfolio-v3-redesign', admin: 'Alex Faftech', status: 'Success', timestamp: '2 mins ago' },
    { id: '2', action: 'Updated Article', resource: 'future-of-ai-dev', admin: 'System Bot', status: 'Success', timestamp: '1 hour ago' },
    { id: '3', action: 'Failed Login Attempt', resource: 'auth-endpoint-v1', admin: 'External IP', status: 'Blocked', timestamp: '4 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 text-center py-8 text-slate-500">Loading stats...</div>
        ) : statsData.map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color === 'primary' ? 'bg-primary/5' : 'bg-accent-purple/5'} rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <div className={`flex items-center gap-1 ${stat.color === 'primary' ? 'text-primary' : 'text-accent-purple'} text-[10px] font-bold mt-2 uppercase`}>
                  <span className="material-icons-round text-xs">trending_up</span>
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent-purple/10 text-accent-purple'} flex items-center justify-center`}>
                <span className="material-icons-round">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-bold text-white">Growth Metrics</h4>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Analytics across all content modules</p>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] px-3 py-1.5 rounded-lg bg-primary text-background-dark font-bold">MONTHLY</button>
              <button className="text-[10px] px-3 py-1.5 rounded-lg bg-surface-dark border border-primary/20 text-slate-400 font-bold">WEEKLY</button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={10} />
                <Tooltip 
                  cursor={{fill: 'rgba(6,212,249,0.05)'}}
                  contentStyle={{backgroundColor: '#162a2e', borderColor: '#06d4f933', borderRadius: '12px', color: '#fff'}}
                />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06d4f9" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#06d4f9" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <h4 className="text-lg font-bold text-white mb-1">Content Distribution</h4>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">Asset breakdown</p>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {loading ? (
              <div className="text-slate-500">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: '#162a2e', border: 'none', borderRadius: '8px'}}
                />
              </PieChart>
            </ResponsiveContainer>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">TOTAL</p>
              <p className="text-3xl font-bold text-white leading-none">70</p>
            </div>
            <div className="w-full mt-8 grid grid-cols-2 gap-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logs Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white">System Logs</h4>
          <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All Activities</button>
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
    </div>
  );
};

export default Dashboard;
