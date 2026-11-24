export type CourseraCourse = {
  id: string;
  title: string;
  provider: string;
  status: string;
  progress: number;
  completedDate: string;
  credentialUrl: string;
  skillsLearned: string[];
};

export type RepositoryFile = {
  path: string;
  lang: string;
  content: string;
};

export type Repository = {
  id: string;
  name: string;
  visibility: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  updated: string;
  topics: string[];
  branch: string;
  url: string;
  files: RepositoryFile[];
};

export type TechStackItem = {
  name: string;
  count: number;
  percentage: number;
  color: string;
};

export type ActivityDay = {
  index: number;
  date: string;
  count: number;
  level: number;
  isToday: boolean;
  githubCount: number;
  leetcodeCount: number;
  hackerrankCount: number;
};

export type ActivityData = {
  githubCommitsToday: number;
  leetcodeSubmissionsToday: number;
  hackerrankSubmissionsToday: number;
  hasSubmittedToday: boolean;
  days: ActivityDay[];
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};
