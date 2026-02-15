import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../services/api';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', href: '', image_url: '', published_date: '', author: '', summary: '', category: '', is_new: false
  });

  const loadData = () => {
    getArticles().then(setArticles).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    try {
      if (editing) {
        await updateArticle(editing.id, formData, token);
      } else {
        await createArticle(formData, token);
      }
      setShowModal(false);
      setEditing(null);
      setFormData({ title: '', slug: '', href: '', image_url: '', published_date: '', author: '', summary: '', category: '', is_new: false });
      loadData();
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Failed to save article. Make sure you are logged in.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const token = localStorage.getItem('token') || '';
    try {
      await deleteArticle(id, token);
      loadData();
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article. Make sure you are logged in.');
    }
  };

  const openEdit = (article: Article) => {
    setEditing(article);
    setFormData({
      title: article.title, slug: article.slug, href: article.href, image_url: article.image_url,
      published_date: article.published_date, author: article.author, summary: article.summary,
      category: article.category, is_new: article.is_new
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Articles
          <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-purple/20 text-accent-purple border border-accent-purple/30 rounded uppercase tracking-widest">
            {loading ? '...' : articles.length} TOTAL
          </span>
        </h1>
        <button onClick={() => { setEditing(null); setFormData({ title: '', slug: '', href: '', image_url: '', published_date: '', author: '', summary: '', category: '', is_new: false }); setShowModal(true); }} className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold uppercase hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-icons-round text-sm">add</span> Add Article
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No articles found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="glass-card rounded-2xl overflow-hidden hover:border-accent-purple/30 transition-all group relative">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => openEdit(article)} className="w-8 h-8 rounded bg-background-dark/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-colors">
                  <span className="material-icons-round text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(article.id)} className="w-8 h-8 rounded bg-background-dark/80 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                  <span className="material-icons-round text-sm">delete</span>
                </button>
              </div>
              <div className="h-40 overflow-hidden">
                <img src={article.image_url} alt={article.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-1 rounded bg-accent-purple/10 text-accent-purple border border-accent-purple/20 uppercase font-bold tracking-widest">{article.category}</span>
                  {article.is_new && <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 uppercase font-bold tracking-widest">NEW</span>}
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-accent-purple transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  <span>{article.author}</span>
                  <span>{article.published_date}</span>
                </div>
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
                  <h2 className="text-xl font-bold text-white">{editing ? 'Edit Article' : 'Add New Article'}</h2>
                  <p className="text-sm text-slate-500 mt-1">{editing ? 'Update article details below' : 'Fill in the article information'}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-lg bg-card-dark/50 border border-primary/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all">
                  <span className="material-icons-round">close</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                  <input type="text" placeholder="Article title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Slug</label>
                  <input type="text" placeholder="article-slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <input type="text" placeholder="Technology" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">External Link</label>
                  <input type="text" placeholder="https://..." value={formData.href} onChange={e => setFormData({...formData, href: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Published Date</label>
                  <input type="text" placeholder="2024-08-05" value={formData.published_date} onChange={e => setFormData({...formData, published_date: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Author</label>
                  <input type="text" placeholder="Author name" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
                  <input type="text" placeholder="https://image-url.com" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Summary</label>
                  <textarea placeholder="Brief summary of the article" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-card-dark/50 border border-primary/10 rounded-lg px-4 py-3 text-white h-24 focus:border-primary/50 focus:outline-none transition-colors resize-none" required />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 p-4 rounded-lg bg-card-dark/30 border border-primary/10 cursor-pointer hover:bg-card-dark/50 transition-colors">
                    <input type="checkbox" checked={formData.is_new} onChange={e => setFormData({...formData, is_new: e.target.checked})} className="w-5 h-5 rounded bg-card-dark border-primary/30 text-primary focus:ring-primary" />
                    <div>
                      <span className="text-sm font-medium text-white">Mark as New</span>
                      <p className="text-xs text-slate-500">Display a "NEW" badge on this article</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-primary/10">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-primary/20 text-slate-400 hover:text-white hover:border-primary/40 transition-all font-bold uppercase text-xs tracking-wider">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-lg bg-primary text-background-dark font-bold uppercase text-xs tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">{editing ? 'Update Article' : 'Create Article'}</button>
              </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default Articles;