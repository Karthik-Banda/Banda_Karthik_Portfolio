import type { CourseraCourse } from '../types';

export const INITIAL_COURSERA_COURSES: CourseraCourse[] = [
  {
    id: "coursera-1",
    title: "Microsoft Full-Stack Developer Specialization",
    provider: "Microsoft",
    status: "In Progress",
    progress: 78,
    completedDate: "My Plan • Active",
    credentialUrl: "https://www.coursera.org/my-learning?myLearningTab=MY_PLAN",
    skillsLearned: ["ASP.NET Core", "Microservices", "Azure Cloud", "CI/CD Pipelines"],
  },
  {
    id: "coursera-2",
    title: "Generative AI with Large Language Models",
    provider: "DeepLearning.AI & AWS",
    status: "Completed",
    progress: 100,
    completedDate: "Oct 2026",
    credentialUrl: "https://www.coursera.org/my-learning?myLearningTab=MY_PLAN",
    skillsLearned: ["Prompt Engineering", "LLM Fine-Tuning", "RAG Architecture", "LangChain"],
  },
  {
    id: "coursera-3",
    title: "Database Design and Basic SQL in PostgreSQL",
    provider: "University of Michigan",
    status: "Completed",
    progress: 100,
    completedDate: "Aug 2026",
    credentialUrl: "https://www.coursera.org/my-learning?myLearningTab=MY_PLAN",
    skillsLearned: ["PostgreSQL", "Query Optimization", "Database Normalization"],
  },
];
