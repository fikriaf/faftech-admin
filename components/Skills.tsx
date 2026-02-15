import React, { useEffect, useState } from 'react';
import { Skill, SkillItem } from '../types';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/api';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '', icon: '', skills: [{ name: '', icon_url: '', proficiencies: [{ percent: 0 }] }]
  });

  const loadData = () => {
    getSkills().then(setSkills).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const data = {
      ...formData,
      skills: formData.skills.map(s => ({ ...s, proficiencies: [{ percent: Number(s.proficiencies[0].percent) }] }))
    };
    try {
      if (editing) {
        await updateSkill(editing.id, data, token);
      } else {
        await createSkill(data, token);
      }
      setShowModal(false);
      setEditing(null);
      setFormData({ name: '', icon: '', skills: [{ name: '', icon_url: '', proficiencies: [{ percent: 0 }] }] });
      loadData();
    } catch (error) {
      console.error('Failed to save skill:', error);
      alert('Failed to save skill. Make sure you are logged in.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill category?')) return;
    const token = localStorage.getItem('token') || '';
    try {
      await deleteSkill(id, token);
      loadData();
    } catch (error) {
      console.error('Failed to delete skill:', error);
      alert('Failed to delete skill. Make sure you are logged in.');
    }
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setFormData({
      name: skill.name, icon: skill.icon,
      skills: skill.skills.map(s => ({ 
        name: s.name, 
        icon_url: s.icon_url || '', 
        proficiencies: s.proficiencies?.length ? s.proficiencies : [{ percent: 0 }] 
      }))
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Skills
          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded uppercase tracking-widest">
            {loading ? '...' : skills.length} CATEGORIES
          </span>
        </h1>
        <button onClick={() => { setEditing(null); setFormData({ name: '', icon: '', skills: [{ name: '', icon_url: '', proficiencies: [{ percent: 0 }] }] }); setShowModal(true); }} className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold uppercase hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-icons-round text-sm">add</span> Add Skill Category
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No skills found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div key={category.id} className="glass-card rounded-2xl p-6 relative group">
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => openEdit(category)} className="w-8 h-8 rounded bg-background-dark/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-colors">
                  <span className="material-icons-round text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(category.id)} className="w-8 h-8 rounded bg-background-dark/80 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                  <span className="material-icons-round text-sm">delete</span>
                </button>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <span className="material-icons-round">{category.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">{skill.proficiencies[0]?.percent || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" style={{ width: `${skill.proficiencies[0]?.percent || 0}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999}} className="bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
          <div className="bg-surface-dark border border-primary/20 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col m-4">
              <div className="p-6 border-b border-primary/10 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-white">{editing ? 'Edit Skill Category' : 'Add New Skill Category'}</h2>
                  <p className="text-sm text-slate-500 mt-1">{editing ? 'Update skill category details below' : 'Create a new skill category with proficiency levels'}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-lg bg-card-dark/50 border border-primary/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all">
                  <span className="material-icons-round">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category Name</label>
                  <input type="text" placeholder="e.g., Languages" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Icon</label>
                  <input type="text" placeholder="code" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
              </div>
              
              <div className="border-t border-primary/10 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-white">Skills & Proficiency</p>
                  <button type="button" onClick={() => setFormData({...formData, skills: [...formData.skills, { name: '', icon_url: '', proficiencies: [{ percent: 0 }] }]})} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-icons-round text-sm">add</span> Add Skill
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.skills.map((skill, i) => (
                    <div key={i} className="flex gap-3 items-center p-4 rounded-lg bg-card-dark/30 border border-primary/10">
                      <input type="text" placeholder="Skill name" value={skill.name} onChange={e => {
                        const skills = [...formData.skills];
                        skills[i].name = e.target.value;
                        setFormData({...formData, skills});
                      }} className="flex-1 bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-2 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                      <div className="flex items-center gap-2 w-32">
                        <input type="range" min="0" max="100" value={skill.proficiencies[0].percent} onChange={e => {
                          const skills = [...formData.skills];
                          skills[i].proficiencies[0].percent = Number(e.target.value);
                          setFormData({...formData, skills});
                        }} className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                        <span className="text-sm font-bold text-amber-500 w-12 text-right">{skill.proficiencies[0].percent}%</span>
                      </div>
                      {formData.skills.length > 1 && (
                        <button type="button" onClick={() => {
                          const skills = formData.skills.filter((_, idx) => idx !== i);
                          setFormData({...formData, skills});
                        }} className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                          <span className="material-icons-round text-sm">close</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-primary/10">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-primary/20 text-slate-400 hover:text-white hover:border-primary/40 transition-all font-bold uppercase text-xs tracking-wider">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-lg bg-primary text-background-dark font-bold uppercase text-xs tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">{editing ? 'Update Category' : 'Create Category'}</button>
              </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default Skills;