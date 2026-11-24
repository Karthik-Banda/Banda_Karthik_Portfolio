import { Cpu } from '../icons';

export function DynamicSkillsMatrix({ mergedSkills }: { mergedSkills: Record<string, Array<{ name: string; isNew: boolean; source: string }>> }) {
  const categories = [
    { key: 'backend', label: 'Backend & Frameworks', accent: 'text-purple-400' },
    { key: 'frontend', label: 'Frontend Technologies', accent: 'text-cyan-400' },
    { key: 'database', label: 'Databases & Storage', accent: 'text-amber-400' },
    { key: 'devopsAi', label: 'DevOps, Cloud & AI Integrations', accent: 'text-emerald-400' },
  ];

  return (
    <div className="p-5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-3">
      <h3 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400"/>Technical Skills & Auto-Synced Competencies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {categories.map(category => (
          <div key={category.key} className="p-3 bg-[#161b22] border border-[#30363d] rounded space-y-1.5">
            <span className={`font-bold ${category.accent} block font-mono`}>{category.label}</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {mergedSkills[category.key].map((skill, index) => <span key={`${skill.name}-${index}`} className={`px-2 py-0.5 rounded border ${skill.isNew ? 'bg-emerald-950/40 text-emerald-200 border-emerald-500/40' : 'bg-[#0d1117] text-slate-300 border-[#30363d]'}`}>{skill.name}{skill.isNew && <span className="ml-1 text-[9px] font-mono uppercase text-emerald-300">{skill.source}</span>}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
