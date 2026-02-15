
export type View = 'dashboard' | 'projects' | 'editor' | 'articles' | 'experiences' | 'skills' | 'achievements' | 'profile' | 'contact' | 'settings' | 'logs';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  url: string;
  image: string;
  logo: string;
  content?: ProjectContent[];
}

export interface ProjectContent {
  name: string;
  quote: string;
  image_url: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  href: string;
  image_url: string;
  published_date: string;
  author: string;
  summary: string;
  category: string;
  is_new: boolean;
}

export interface Experience {
  id: string;
  date_range: string;
  title: string;
  company: string;
  type: string;
  type_time: string;
  description: string[];
  skills: string[];
  images?: { image_url: string }[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  icon_url: string;
  proficiencies: { percent: number }[];
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
  cv_url: string;
}

export interface Contact {
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp_url: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  slug: string;
  description: string;
  issuer: string;
  issue_date: string;
  category: string;
  type: 'certificate' | 'award' | 'publication' | 'patent' | 'conference';
  certificate_file_url?: string;
  is_featured: boolean;
}

export interface Stats {
  projects: number;
  articles: number;
  experiences: number;
  skills: number;
}
