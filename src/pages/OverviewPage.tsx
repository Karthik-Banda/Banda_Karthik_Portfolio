import { useState } from 'react';
import { PROFILE_DATA, INITIAL_LEETCODE_FALLBACK } from '../data/profile';
import { RESUME_DATA } from '../data/resume';
import { CourseraLearningTracker } from '../components/portfolio/CourseraLearningTracker';
import { DynamicSkillsMatrix } from '../components/portfolio/DynamicSkillsMatrix';
import { Heatmap } from '../components/portfolio/Heatmap';
import { Download, ExternalLink, Github, LinkIcon, Mail, MapPin, Sparkles, Trophy, Zap } from '../components/icons';
import type { ActivityData, CourseraCourse, TechStackItem } from '../types';

type Props = { activityData: ActivityData; courseraCourses: CourseraCourse[]; courseraFeedError: string; mergedSkills: Record<string, Array<{name:string;isNew:boolean;source:string}>>; dynamicTechStack: TechStackItem[]; leetcodeStats: typeof INITIAL_LEETCODE_FALLBACK; hackerrankStats: {badges:string[]} };

export function OverviewPage(props: Props) {
  const [imageError, setImageError] = useState(false);
  const triggerDownload = () => { const link = document.createElement('a'); link.href = PROFILE_DATA.resumeFile; link.download = 'Banda_Karthik_Resume.pdf'; document.body.appendChild(link); link.click(); document.body.removeChild(link); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[29%_71%] gap-8 lg:gap-14 items-start">
        <div className="min-h-[520px] py-4 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative w-64 h-64 xl:w-[330px] xl:h-[330px] 2xl:w-[360px] 2xl:h-[360px] rounded-full bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400 p-1.5 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden">{imageError ? <div className="w-full h-full bg-[#0d1117] flex items-center justify-center text-5xl font-black">BK</div> : <img src={PROFILE_DATA.profileImg} alt={PROFILE_DATA.name} onError={() => setImageError(true)} className="w-full h-full object-cover" />}</div>
            {PROFILE_DATA.isOpenToWork && <span className="absolute -left-3 bottom-5 px-3 py-1.5 rounded-full bg-[#161b22] border border-emerald-500/60 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>Open to Work</span>}
          </div>
          <h1 className="mt-7 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">{PROFILE_DATA.name}</h1>
          <p className="mt-3 text-xl xl:text-2xl 2xl:text-3xl text-purple-400 font-mono font-medium">{PROFILE_DATA.title}</p>
          <p className="mt-2 text-lg xl:text-xl text-[#8b949e] font-mono">@{PROFILE_DATA.username}</p>
        </div>

        <div className="min-w-0 py-4 space-y-5">
          <div><h2 className="text-lg xl:text-xl font-bold text-white uppercase font-mono">Profile Overview</h2><p className="mt-3 max-w-5xl text-base xl:text-lg text-slate-300 leading-8">{PROFILE_DATA.bio}</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base xl:text-lg">
            <span className="py-2 flex items-center gap-2 text-[#aab2bd]"><MapPin className="w-4 h-4 text-slate-400"/>{PROFILE_DATA.location}</span>
            <a href={`mailto:${PROFILE_DATA.email}`} className="py-2 flex items-center gap-2 text-slate-300"><Mail className="w-4 h-4 text-emerald-400"/>{PROFILE_DATA.email}</a>
            <a href={`tel:${PROFILE_DATA.phone.replace(/\s/g, '')}`} className="py-2 flex items-center gap-2 text-slate-300"><span className="text-purple-400 font-bold">Tel</span>{PROFILE_DATA.phone}</a>
            <button onClick={triggerDownload} className="py-2 flex items-center gap-2 text-purple-300 font-semibold text-left"><Download className="w-4 h-4"/>Download Resume</button>
          </div>
          <div className="flex flex-wrap gap-5 text-sm"><a href={PROFILE_DATA.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 flex items-center gap-1.5"><Github className="w-4 h-4"/>GitHub</a><a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 flex items-center gap-1.5"><LinkIcon className="w-4 h-4"/>LinkedIn</a><a href={`https://leetcode.com/u/${PROFILE_DATA.leetcode}`} target="_blank" rel="noreferrer" className="text-amber-400 flex items-center gap-1.5"><Zap className="w-4 h-4"/>LeetCode</a></div>
          <Heatmap activityData={props.activityData}/>
        </div>
      </div>

      <CourseraLearningTracker courses={props.courseraCourses} feedError={props.courseraFeedError}/>
      <DynamicSkillsMatrix mergedSkills={props.mergedSkills}/>

      <div className="space-y-4"><h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase"><Sparkles className="w-4 h-4 text-cyan-400"/>Featured Technical Projects</h3><div className="grid grid-cols-1 gap-4">{RESUME_DATA.projects.map(project => <article key={project.title} className="p-5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-3"><div className="flex flex-col sm:flex-row sm:justify-between gap-2"><h4 className="text-base font-bold text-purple-400">{project.title}</h4><div className="flex gap-3 text-xs">{project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-emerald-400 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5"/>Live App</a>}<a href={project.code} target="_blank" rel="noreferrer" className="text-cyan-400 flex items-center gap-1"><Github className="w-3.5 h-3.5"/>Source Code</a></div></div><div className="flex flex-wrap gap-1.5">{project.tech.map(tech => <span key={tech} className="px-2 py-0.5 rounded text-[10px] bg-purple-950/40 text-purple-300 border border-purple-500/20">{tech}</span>)}</div><ul className="list-disc list-inside text-xs text-slate-300 space-y-1">{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><section className="p-4 rounded-md bg-[#0d1117] border border-[#30363d]"><div className="flex items-center justify-between"><h3 className="font-bold text-white text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400"/>LeetCode Solver</h3><span className="text-xs text-amber-400">@{PROFILE_DATA.leetcode}</span></div><div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs"><div className="p-2 bg-[#161b22] rounded text-emerald-400">Easy: {props.leetcodeStats.easy}</div><div className="p-2 bg-[#161b22] rounded text-amber-400">Medium: {props.leetcodeStats.medium}</div><div className="p-2 bg-[#161b22] rounded text-rose-400">Hard: {props.leetcodeStats.hard}</div></div></section><section className="p-4 rounded-md bg-[#0d1117] border border-[#30363d]"><div className="flex items-center justify-between"><h3 className="font-bold text-white text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-emerald-400"/>HackerRank Profile</h3><span className="text-xs text-emerald-400">@{PROFILE_DATA.hackerrank}</span></div><div className="mt-3 p-2 text-cyan-400 text-xs">{props.hackerrankStats.badges.join(', ')}</div></section></div>
    </div>
  );
}
