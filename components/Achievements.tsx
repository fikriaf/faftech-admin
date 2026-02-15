import React, { useEffect, useState } from 'react';
import { Achievement } from '../types';
import { getAchievements } from '../services/api';

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.type === filter);

  const typeColors: Record<string, string> = {
    certificate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    award: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    publication: 'bg-green-500/10 text-green-500 border-green-500/20',
    patent: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    conference: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Achievements
          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded uppercase tracking-widest">
            {loading ? '...' : achievements.length} TOTAL
          </span>
        </h1>
        
        <div className="flex gap-2">
          {['all', 'certificate', 'award', 'publication', 'patent', 'conference'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold uppercase tracking-widest transition-all ${
                filter === type 
                  ? 'bg-primary text-background-dark border-primary' 
                  : 'bg-card-dark/50 text-slate-400 border-primary/10 hover:text-primary hover:border-primary/40'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading achievements...</div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No achievements found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div key={achievement.id} className={`glass-card rounded-2xl p-6 border ${achievement.is_featured ? 'border-primary/30' : 'border-primary/10'} hover:border-primary/30 transition-all group`}>
              {achievement.is_featured && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons-round text-primary text-sm">star</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Featured</span>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] px-2 py-1 rounded border uppercase font-bold tracking-widest ${typeColors[achievement.type] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                  {achievement.type}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{achievement.category}</span>
              </div>

              <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{achievement.description}</p>
              
              <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest border-t border-primary/10 pt-4">
                <span>{achievement.issuer}</span>
                <span>{achievement.issue_date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;