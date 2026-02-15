import React, { useEffect, useState } from 'react';
import { Contact as ContactType } from '../types';
import { getContact } from '../services/api';

const Contact: React.FC = () => {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Loading contact...</div>;
  }

  if (!contact) {
    return <div className="text-center py-12 text-slate-500">Contact not found</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <h1 className="text-2xl font-bold text-white tracking-tight">Contact</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-icons-round">email</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Email</p>
                <p className="text-slate-300">{contact.contact.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-icons-round">phone</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Phone</p>
                <p className="text-slate-300">{contact.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-icons-round">location_on</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Address</p>
                <p className="text-slate-300">{contact.contact.address}</p>
              </div>
            </div>

            {contact.contact.whatsapp_url && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <span className="material-icons-round">chat</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">WhatsApp</p>
                  <a href={contact.contact.whatsapp_url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                    Open Chat
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Social Links</h3>
          
          <div className="space-y-3">
            {contact.socialLinks.map((link, i) => (
              <a 
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-card-dark/50 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-icons-round">{link.icon}</span>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">{link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;