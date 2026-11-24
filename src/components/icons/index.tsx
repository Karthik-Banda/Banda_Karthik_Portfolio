import type { SVGProps } from 'react';

const Icon = ({ children, ...props }: SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
);

export const Github = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></Icon>;
export const BookOpen = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
export const Code2 = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="18 16 22 12 18 8"/><polyline points="6 8 2 12 6 16"/><line x1="14" y1="4" x2="10" y2="20"/></Icon>;
export const Mail = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>;
export const Trophy = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a4 4 0 0 0 4 4M17 6h3v1a4 4 0 0 1-4 4"/></Icon>;
export const Zap = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
export const RefreshCw = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14M23 10l-4.64-4.36A9 9 0 0 0 3.51 9"/></Icon>;
export const Cpu = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></Icon>;
export const LinkIcon = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Icon>;
export const MapPin = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
export const ChevronRight = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="9 18 15 12 9 6"/></Icon>;
export const GitCommit = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><circle cx="12" cy="12" r="4"/><path d="M1.05 12H8M16 12h6.95"/></Icon>;
export const FileCode = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2M14 13l2 2-2 2"/></Icon>;
export const Copy = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Icon>;
export const Check = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="20 6 9 17 4 12"/></Icon>;
export const Send = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Icon>;
export const CheckCircle2 = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
export const BarChart2 = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Icon>;
export const Download = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
export const Briefcase = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>;
export const GraduationCap = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></Icon>;
export const ExternalLink = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
export const Award = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></Icon>;
export const Sparkles = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></Icon>;
export const AlertCircle = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
export const Layers = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>;
export const Plus = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
export const Maximize2 = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></Icon>;
export const Minimize2 = (props: SVGProps<SVGSVGElement>) => <Icon {...props}><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></Icon>;
