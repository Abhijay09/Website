export interface Work {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface MethodologyStep {
  id: string;
  title: string;
  content: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  projects?: string[];
  skills?: string[];
}