// src/services/resumeService.ts
import resumeData from '../assets/resume.json';

export interface Contact {
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Competency {
  category: string;
  skills: string;
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  url: string;
  description: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  year: number;
  cgpa: string;
}

export interface Resume {
  name: string;
  contact: Contact;
  summary: string;
  competencies: Competency[];
  experience: Experience[];
  projects: Project[];
  education: Education;
}

export const getResumeData = (): Resume => {
  return resumeData;
};
