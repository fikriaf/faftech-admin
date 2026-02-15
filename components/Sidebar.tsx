
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: 'dashboard', section: 'Core' },
    { id: 'projects', label: 'Projects', icon: 'folder', section: 'Core' },
    { id: 'articles', label: 'Articles', icon: 'article', section: 'Core' },
    { id: 'experiences', label: 'Experiences', icon: 'history_edu', section: 'Core' },
    { id: 'skills', label: 'Skills', icon: 'psychology', section: 'Core' },
    { id: 'settings', label: 'Settings', icon: 'settings', section: 'System' },
    { id: 'logs', label: 'Logs', icon: 'analytics', section: 'System' },
  ];

  return (
    <aside className="w-64 bg-surface-dark border-r border-primary/10 flex flex-col h-screen shrink-0 transition-all duration-300 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center neon-glow">
          <span className="material-icons-round text-background-dark font-bold">bolt</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">FAF<span className="text-primary">TECH</span></span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => {
          const isFirstInSection = index === 0 || navItems[index - 1].section !== item.section;
          return (
            <React.Fragment key={item.id}>
              {isFirstInSection && (
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-6">
                  {item.section}
                </div>
              )}
              <button
                onClick={() => setView(item.id as View)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all group ${
                  currentView === item.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-slate-400 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <span className="material-icons-round text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      <div className="p-6 border-t border-primary/10">
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Storage Usage</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_8px_#06d4f9]"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-slate-500">65% Used</span>
            <button className="text-[10px] text-primary font-bold hover:underline">UPGRADE</button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/30">
            <img src="https://picsum.photos/seed/faftech/100/100" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Alex Faftech</p>
            <span className="text-[10px] text-primary uppercase font-bold">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
