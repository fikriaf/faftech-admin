
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProjectRepository from './components/ProjectRepository';
import ProjectEditor from './components/ProjectEditor';
import Articles from './components/Articles';
import Experiences from './components/Experiences';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Settings from './components/Settings';
import Logs from './components/Logs';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectRepository onEdit={() => setCurrentView('editor')} />;
      case 'editor':
        return <ProjectEditor onCancel={() => setCurrentView('projects')} />;
      case 'articles':
        return <Articles />;
      case 'experiences':
        return <Experiences />;
      case 'skills':
        return <Skills />;
      case 'achievements':
        return <Achievements />;
      case 'profile':
        return <Profile />;
      case 'contact':
        return <Contact />;
      case 'settings':
        return <Settings />;
      case 'logs':
        return <Logs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-display">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header currentView={currentView} onNewProject={() => setCurrentView('editor')} />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
