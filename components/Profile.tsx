import React, { useEffect, useState } from 'react';
import { Profile as ProfileType } from '../types';
import { getProfile } from '../services/api';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center py-12 text-slate-500">Profile not found</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <h1 className="text-2xl font-bold text-white tracking-tight">Profile</h1>

      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-primary/30">
              <img 
                src={profile.avatar_url} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
            <p className="text-primary font-medium mb-4">{profile.title}</p>
            <p className="text-slate-400 mb-6">{profile.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card-dark/50 border border-primary/10">
                <span className="material-icons-round text-primary">email</span>
                <span className="text-sm text-slate-300">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card-dark/50 border border-primary/10">
                <span className="material-icons-round text-primary">phone</span>
                <span className="text-sm text-slate-300">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card-dark/50 border border-primary/10">
                <span className="material-icons-round text-primary">location_on</span>
                <span className="text-sm text-slate-300">{profile.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card-dark/50 border border-primary/10">
                <span className="material-icons-round text-primary">description</span>
                <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  View CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;