
import React, { useState } from 'react';
import { generateProjectDescription } from '../services/geminiService';

interface ProjectEditorProps {
  onCancel: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ onCancel }) => {
  const [title, setTitle] = useState('NeuralPath AI');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState(['UI/UX', 'METAVERSE', 'AI-CORE']);

  const handleGenerateAI = async () => {
    if (!title) return;
    setIsGenerating(true);
    try {
      const result = await generateProjectDescription(title);
      setDescription(result || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      {/* Stepper */}
      <div className="grid grid-cols-3 mb-8 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/5 z-0"></div>
        <div className="relative z-10 flex flex-col items-center group cursor-pointer">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-background-dark border-2 border-primary text-primary shadow-[0_0_15px_rgba(6,212,249,0.3)] mb-3">
            <span className="material-icons-round text-xl">info</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Basic Info</span>
        </div>
        <div className="relative z-10 flex flex-col items-center group cursor-pointer opacity-50">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-background-dark border-2 border-white/20 text-white/50 mb-3">
            <span className="material-icons-round text-xl">image</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Media</span>
        </div>
        <div className="relative z-10 flex flex-col items-center group cursor-pointer opacity-50">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-background-dark border-2 border-white/20 text-white/50 mb-3">
            <span className="material-icons-round text-xl">publish</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Publishing</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">General Information</h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Define the core identity of your project</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-tomorrow uppercase tracking-widest">Autosaved at 14:32</span>
          </div>
        </div>

        <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-primary transition-all outline-none" 
                placeholder="e.g. Neural Link Interface" 
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">URL Slug</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-xs font-mono">faftech.io/portfolio/</span>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-44 pr-4 py-3 text-white placeholder:text-white/20 focus:border-primary transition-all outline-none text-xs" 
                  placeholder="neural-link-interface" 
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Categories / Tags</label>
            <div className="flex flex-wrap gap-2 p-3 bg-black/40 border border-white/10 rounded-lg min-h-[50px] items-center">
              {tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-2 px-3 py-1 rounded bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                  {tag} <button className="material-icons-round text-xs hover:text-white">close</button>
                </span>
              ))}
              <input className="bg-transparent border-none focus:ring-0 text-white text-xs w-32 ml-2" placeholder="Add more..." type="text"/>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
              <button 
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="flex items-center gap-1 text-[10px] font-bold text-primary hover:brightness-125 transition-all uppercase tracking-widest"
              >
                <span className="material-icons-round text-sm">{isGenerating ? 'autorenew' : 'auto_awesome'}</span>
                {isGenerating ? 'Thinking...' : 'Generate with AI'}
              </button>
            </div>
            <div className="border border-white/10 rounded-lg overflow-hidden bg-black/40">
              <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/5">
                {['format_bold', 'format_italic', 'format_list_bulleted', 'link', 'code'].map(icon => (
                  <button key={icon} className="p-1.5 rounded text-slate-400 hover:text-white transition-colors" type="button">
                    <span className="material-icons-round text-lg">{icon}</span>
                  </button>
                ))}
              </div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white p-4 resize-none placeholder:text-white/10 text-sm leading-relaxed min-h-[200px]" 
                placeholder="Describe the vision, technical stack, and results of the project..." 
                rows={8}
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Media Assets</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center group hover:border-primary/50 transition-all cursor-pointer bg-white/[0.02]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="material-icons-round text-3xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
              </div>
              <h3 className="text-white font-bold">Drag & drop project files</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Supports JPG, PNG, WEBP, and MP4 (Max 10MB)</p>
            </div>
          </div>
        </form>

        <div className="p-8 border-t border-white/5 bg-black/20 flex items-center justify-between">
          <button 
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2" 
            type="button"
          >
            <span className="material-icons-round text-lg">arrow_back</span> Cancel
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 rounded-lg border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all" type="button">
              Save as Draft
            </button>
            <button className="bg-gradient-to-r from-accent-purple to-[#a855f7] px-8 py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2" type="button">
              Continue to Media <span className="material-icons-round text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-[10px] font-bold text-primary/80 px-4 tracking-tighter uppercase">
        <span className="material-icons-round text-xs">verified_user</span>
        <span>SYSTEM ENCRYPTED CONNECTION STABLE // PORT: 8080 // ADMIN_USER: DEVBOT</span>
      </div>
    </div>
  );
};

export default ProjectEditor;
