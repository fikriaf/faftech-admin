
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { getProjects } from '../services/api';

interface ProjectRepositoryProps {
  onEdit: () => void;
}

const ProjectRepository: React.FC<ProjectRepositoryProps> = ({ onEdit }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Project Repository 
          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded uppercase tracking-widest">{loading ? '...' : projects.length} TOTAL</span>
        </h1>
        <div className="flex items-center gap-3">
          <button className="bg-card-dark/50 border border-primary/10 rounded-lg px-3 py-2 text-slate-400 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-bold uppercase">
            <span className="material-icons-round text-lg">tune</span> Filters
          </button>
          <button className="bg-card-dark/50 border border-primary/10 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed flex items-center gap-2 text-xs font-bold uppercase">
            <span className="material-icons-round text-lg">layers</span> Bulk
          </button>
        </div>
      </div>

      <div className="bg-card-dark/30 border border-primary/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                <input type="checkbox" className="rounded bg-background-dark border-primary/30 text-primary focus:ring-primary focus:ring-offset-background-dark" />
              </th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-primary/70">Project Entity</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-primary/70">Category</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-primary/70">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-primary/70 text-center">Efficiency</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-primary/70">Last Updated</th>
              <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-primary/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {loading ? (
              <tr><td colSpan={7} className="py-8 text-center text-slate-500">Loading projects...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-slate-500">No projects found</td></tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-primary/5 transition-all group">
                  <td className="py-4 px-6">
                    <input type="checkbox" className="rounded bg-background-dark border-primary/30 text-primary focus:ring-primary focus:ring-offset-background-dark" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-800 border border-primary/10 flex items-center justify-center overflow-hidden">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-primary transition-colors">{proj.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase font-bold">UID: {proj.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-bold tracking-widest">{proj.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#06d4f9]"></div>
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Active</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-slate-800 h-1 rounded-full max-w-[100px] mx-auto">
                      <div className="bg-primary shadow-[0_0_8px_#06d4f9] h-full rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-slate-500 font-bold uppercase tracking-widest italic">
                    API Data
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={onEdit} className="w-8 h-8 rounded border border-primary/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 transition-all">
                        <span className="material-icons-round text-sm">visibility</span>
                      </button>
                      <button onClick={onEdit} className="w-8 h-8 rounded border border-primary/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 transition-all">
                        <span className="material-icons-round text-sm">edit</span>
                      </button>
                      <button className="w-8 h-8 rounded border border-primary/10 flex items-center justify-center text-slate-500 hover:text-red-400 hover:border-red-400/40 transition-all">
                        <span className="material-icons-round text-sm">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { label: 'Storage Use', value: '42.8 GB', total: '1TB', icon: 'storage' },
          { label: 'Latency', value: '12 ms', sub: 'OPTIONAL', icon: 'speed', subColor: 'text-emerald-500' },
          { label: 'Daily API Calls', value: '842,903', icon: 'sync_alt', trend: 'trending_up' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-primary/10 bg-card-dark/20 backdrop-blur-sm flex items-center gap-4 transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-icons-round">{item.icon}</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.label}</p>
              <p className="text-xl font-bold text-white">
                {item.value} 
                {item.total && <span className="text-[10px] font-normal text-slate-600"> / {item.total}</span>}
                {item.sub && <span className={`text-[10px] font-bold ${item.subColor} ml-2 tracking-tighter`}>{item.sub}</span>}
                {item.trend && <span className="material-icons-round text-xs text-primary align-middle ml-1">{item.trend}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRepository;
