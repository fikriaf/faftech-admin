import { Project, Article, Experience, Skill, Profile, Contact, Achievement, Stats } from '../types';

const BASE_URL = 'https://faftech-be.vercel.app/api/v1';

// Helper for fetch
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

// Auth
export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const json = await response.json();
  return json;
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>('/projects');
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return fetchApi<Project>(`/projects?slug=${slug}`);
}

// Articles
export async function getArticles(): Promise<Article[]> {
  return fetchApi<Article[]>('/articles');
}

export async function createArticle(data: Partial<Article>, token: string): Promise<Article> {
  const response = await fetch(`${BASE_URL}/admin/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create article');
  return response.json();
}

export async function updateArticle(id: string, data: Partial<Article>, token: string): Promise<Article> {
  const response = await fetch(`${BASE_URL}/admin/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update article');
  return response.json();
}

export async function deleteArticle(id: string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/articles/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete article');
}

// Experiences
export async function getExperiences(): Promise<Experience[]> {
  return fetchApi<Experience[]>('/experiences');
}

export async function createExperience(data: Partial<Experience>, token: string): Promise<Experience> {
  const response = await fetch(`${BASE_URL}/admin/experiences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create experience');
  return response.json();
}

export async function updateExperience(id: string, data: Partial<Experience>, token: string): Promise<Experience> {
  const response = await fetch(`${BASE_URL}/admin/experiences/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update experience');
  return response.json();
}

export async function deleteExperience(id: string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/experiences/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete experience');
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  return fetchApi<Skill[]>('/skills');
}

export async function createSkill(data: Partial<Skill>, token: string): Promise<Skill> {
  const response = await fetch(`${BASE_URL}/admin/skills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create skill');
  return response.json();
}

export async function updateSkill(id: string, data: Partial<Skill>, token: string): Promise<Skill> {
  const response = await fetch(`${BASE_URL}/admin/skills/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update skill');
  return response.json();
}

export async function deleteSkill(id: string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/skills/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete skill');
}

// Profile
export async function getProfile(): Promise<Profile> {
  return fetchApi<Profile>('/profile');
}

// Contact
export async function getContact(): Promise<Contact> {
  return fetchApi<Contact>('/contact');
}

// Achievements
export async function getAchievements(): Promise<Achievement[]> {
  return fetchApi<Achievement[]>('/achievements');
}

// Stats for Dashboard
export async function getStats(): Promise<Stats> {
  const [projects, articles, experiences, skills] = await Promise.all([
    getProjects(),
    getArticles(),
    getExperiences(),
    getSkills(),
  ]);

  return {
    projects: projects.length,
    articles: articles.length,
    experiences: experiences.length,
    skills: skills.length,
  };
}