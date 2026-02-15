
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onNewProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNewProject }) => {
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard': return 'Admin / Overview';
      case 'projects': return 'Admin / Projects';
      case 'editor': return 'Admin / Projects / Editor';
      default: return 'Admin / Overview';
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'System Dashboard';
      case 'projects': return 'Project Repository';
      case 'editor': return 'Project Editor';
      default: return 'FAFTECH System';
    }
  };

  return (
    <header className="h-20 border-b border-primary/10 flex items-center justify-between px-8 bg-surface-dark/40 backdrop-blur-md z-30 shrink-0">
      <div className="flex flex-col">
        <nav className="flex text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
          {getBreadcrumbs()}
        </nav>
        <h1 className="text-xl font-bold text-white tracking-tight">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search system logs or content..." 
            className="bg-background-dark/50 border border-primary/20 rounded-xl pl-10 pr-4 py-2 text-sm w-72 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-300 placeholder:text-slate-600 transition-all"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
          <span className="material-icons-round">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full neon-glow"></span>
        </button>

        {currentView === 'projects' && (
          <button 
            onClick={onNewProject}
            className="bg-primary text-background-dark font-bold px-4 py-2 rounded flex items-center gap-2 shadow-[0_0_15px_rgba(6,212,249,0.3)] hover:brightness-110 transition-all text-xs uppercase tracking-tighter"
          >
            <span className="material-icons-round text-lg">add</span>
            New Project
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
