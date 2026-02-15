import React, { useEffect, useState } from 'react';
import { Experience } from '../types';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../services/api';

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    title: '', company: '', date_range: '', type: '', type_time: '', description: [''], skills: [''], images: [{ image_url: '' }]
  });

  const loadData = () => {
    getExperiences().then(setExperiences).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const data = {
      ...formData,
      description: formData.description.filter(d => d.trim()),
      skills: formData.skills.filter(s => s.trim()),
      images: formData.images.filter(img => img.image_url.trim())
    };
    try {
      if (editing) {
        await updateExperience(editing.id, data, token);
      } else {
        await createExperience(data, token);
      }
      setShowModal(false);
      setEditing(null);
      setFormData({ title: '', company: '', date_range: '', type: '', type_time: '', description: [''], skills: [''], images: [{ image_url: '' }] });
      loadData();
    } catch (error) {
      console.error('Failed to save experience:', error);
      alert('Failed to save experience. Make sure you are logged in.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    const token = localStorage.getItem('token') || '';
    try {
      await deleteExperience(id, token);
      loadData();
    } catch (error) {
      console.error('Failed to delete experience:', error);
      alert('Failed to delete experience. Make sure you are logged in.');
    }
  };

  const openEdit = (exp: Experience) => {
    setEditing(exp);
    setFormData({
      title: exp.title, company: exp.company, date_range: exp.date_range, type: exp.type, type_time: exp.type_time,
      description: exp.description, skills: exp.skills, images: exp.images || [{ image_url: '' }]
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Experiences
          <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/20 text-green-500 border border-green-500/30 rounded uppercase tracking-widest">
            {loading ? '...' : experiences.length} TOTAL
          </span>
        </h1>
        <button onClick={() => { setEditing(null); setFormData({ title: '', company: '', date_range: '', type: '', type_time: '', description: [''], skills: [''], images: [{ image_url: '' }] }); setShowModal(true); }} className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold uppercase hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-icons-round text-sm">add</span> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No experiences found</div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card rounded-2xl p-6 relative group">
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => openEdit(exp)} className="w-8 h-8 rounded bg-background-dark/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-colors">
                  <span className="material-icons-round text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(exp.id)} className="w-8 h-8 rounded bg-background-dark/80 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                  <span className="material-icons-round text-sm">delete</span>
                </button>
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 uppercase font-bold tracking-widest">{exp.type_time}</span>
                    <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-bold tracking-widest">{exp.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4">{exp.date_range}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-bold tracking-widest">{skill}</span>
                    ))}
                  </div>
                </div>
                {exp.images && exp.images.length > 0 && (
                  <div className="flex gap-2 shrink-0">
                    {exp.images.map((img, i) => (
                      <img key={i} src={img.image_url} alt={`Experience ${i + 1}`} className="w-24 h-24 object-cover rounded-lg border border-primary/10" />
                    ))}
                  </div>
                )}
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
                  <h2 className="text-xl font-bold text-white">{editing ? 'Edit Experience' : 'Add New Experience'}</h2>
                  <p className="text-sm text-slate-500 mt-1">{editing ? 'Update experience details below' : 'Fill in the work experience information'}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-lg bg-card-dark/50 border border-primary/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all">
                  <span className="material-icons-round">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Job Title</label>
                  <input type="text" placeholder="e.g., AI Engineer" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Company</label>
                  <input type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Date Range</label>
                  <input type="text" placeholder="Jul 2025 - Present" value={formData.date_range} onChange={e => setFormData({...formData, date_range: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required>
                    <option value="">Select type</option>
                    <option value="Job">Job</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Time Type</label>
                  <select value={formData.type_time} onChange={e => setFormData({...formData, type_time: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required>
                    <option value="">Select time</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description (one per line)</label>
                  <textarea placeholder="Describe your responsibilities and achievements..." value={formData.description.join('\n')} onChange={e => setFormData({...formData, description: e.target.value.split('\n')})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white h-32 focus:border-primary/50 focus:outline-none transition-colors resize-none" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Skills (comma separated)</label>
                  <input type="text" placeholder="Python, AI/ML, API Integration" value={formData.skills.join(', ')} onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Images</label>
                    <button type="button" onClick={() => setFormData({...formData, images: [...formData.images, { image_url: '' }]})} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-bold uppercase tracking-widest">
                      + Add Image
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.images.map((img, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" placeholder="Image URL" value={img.image_url} onChange={e => {
                          const images = [...formData.images];
                          images[i].image_url = e.target.value;
                          setFormData({...formData, images});
                        }} className="flex-1 bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-2 text-white focus:border-primary/50 focus:outline-none transition-colors" />
                        {formData.images.length > 1 && (
                          <button type="button" onClick={() => {
                            const images = formData.images.filter((_, idx) => idx !== i);
                            setFormData({...formData, images});
                          }} className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <span className="material-icons-round text-sm">close</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-primary/10">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-primary/20 text-slate-400 hover:text-white hover:border-primary/40 transition-all font-bold uppercase text-xs tracking-wider">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-lg bg-primary text-background-dark font-bold uppercase text-xs tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">{editing ? 'Update Experience' : 'Create Experience'}</button>
              </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default Experiences;