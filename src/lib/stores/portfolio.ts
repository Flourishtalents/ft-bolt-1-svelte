import { writable } from 'svelte/store';

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  images: string[];
  videos: string[];
  achievements: string[];
  availability: boolean;
  rate: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const portfolios = writable<Portfolio[]>([]);
export const currentPortfolio = writable<Portfolio | null>(null);

export const portfolioStore = {
  create: (portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPortfolio: Portfolio = {
      ...portfolioData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    portfolios.update(p => [...p, newPortfolio]);
    currentPortfolio.set(newPortfolio);
    
    // Save to localStorage for persistence
    const saved = localStorage.getItem('portfolios') || '[]';
    const existing = JSON.parse(saved);
    existing.push(newPortfolio);
    localStorage.setItem('portfolios', JSON.stringify(existing));
    
    return newPortfolio;
  },
  
  update: (id: string, updates: Partial<Portfolio>) => {
    portfolios.update(portfolioList => 
      portfolioList.map(p => 
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      )
    );
    
    // Update localStorage
    const saved = localStorage.getItem('portfolios') || '[]';
    const existing = JSON.parse(saved);
    const updated = existing.map((p: Portfolio) => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
    );
    localStorage.setItem('portfolios', JSON.stringify(updated));
  },
  
  load: () => {
    const saved = localStorage.getItem('portfolios');
    if (saved) {
      portfolios.set(JSON.parse(saved));
    }
  },
  
  getByUserId: (userId: string) => {
    const saved = localStorage.getItem('portfolios') || '[]';
    const existing = JSON.parse(saved);
    return existing.find((p: Portfolio) => p.userId === userId);
  }
};