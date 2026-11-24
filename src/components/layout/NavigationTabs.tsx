import { BookOpen, Briefcase, Code2, Mail } from '../icons';

type Props = { activeTab: string; setActiveTab: (tab: string) => void; repoCount: number; newSkillCount: number };

export function NavigationTabs({ activeTab, setActiveTab, repoCount, newSkillCount }: Props) {
  const linkClass = (tab: string) => `pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${tab === activeTab ? 'border-purple-500 text-white font-bold' : 'border-transparent text-[#8b949e] hover:text-slate-200'}`;

  return (
    <div className="bg-[#161b22] pt-6 px-4 sm:px-8 lg:px-12">
      <nav className="flex gap-8 xl:gap-10 text-base xl:text-lg font-medium overflow-x-auto scrollbar-none">
        <button onClick={() => setActiveTab('overview')} className={linkClass('overview')}><BookOpen className="w-4 h-4 text-purple-400"/><span>Overview</span></button>
        <button onClick={() => setActiveTab('repositories')} className={linkClass(activeTab === 'repo-detail' ? 'repositories' : activeTab)}><Code2 className="w-4 h-4 text-cyan-400"/><span>Repositories</span><span className="px-2 py-0.5 rounded-full text-xs bg-[#21262d] text-[#8b949e]">{repoCount}</span></button>
        <button onClick={() => setActiveTab('resume')} className={linkClass('resume')}><Briefcase className="w-4 h-4 text-amber-400"/><span>Resume & Auto-Skills</span>{newSkillCount > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">+{newSkillCount} New</span>}</button>
        <button onClick={() => setActiveTab('contact')} className={linkClass('contact')}><Mail className="w-4 h-4 text-emerald-400"/><span>Contact</span></button>
      </nav>
    </div>
  );
}
