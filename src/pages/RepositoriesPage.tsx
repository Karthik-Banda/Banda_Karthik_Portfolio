import type { Repository } from '../types';
import { BookOpen, ChevronRight, Copy, FileCode, GitCommit, Check } from '../components/icons';
import { useState } from 'react';

export function RepositoriesPage({ repositories }: { repositories: Repository[] }) {
  const [selected, setSelected] = useState<Repository | null>(null);
  const [fileIndex, setFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!selected) return <div className="space-y-4">{repositories.map(repo => <button key={repo.id} onClick={() => { setSelected(repo); setFileIndex(0); }} className="w-full text-left p-5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-3"><div className="flex justify-between"><h3 className="text-base font-bold text-purple-400 flex items-center gap-2"><BookOpen className="w-4 h-4"/> {repo.name}</h3><span className="text-xs text-[#8b949e]">{repo.visibility}</span></div><p className="text-xs text-slate-300">{repo.description}</p><div className="flex flex-wrap gap-1.5">{repo.topics.map(topic => <span key={topic} className="px-2 py-0.5 rounded text-[10px] border border-purple-500/20 text-purple-300">{topic}</span>)}</div></button>)}</div>;

  const copy = async () => { await navigator.clipboard.writeText(selected.files[fileIndex].content); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <div className="space-y-6"><button onClick={() => setSelected(null)} className="text-xs text-purple-400 flex items-center gap-1">Repositories <ChevronRight className="w-3.5 h-3.5"/> <span className="text-white font-bold">{selected.name}</span></button><div className="rounded-md bg-[#0d1117] border border-[#30363d] overflow-hidden"><div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex justify-between text-xs"><span className="flex items-center gap-2"><GitCommit className="w-4 h-4 text-purple-400"/>{selected.branch} / {selected.files[fileIndex].path}</span><button onClick={copy} className="flex items-center gap-1">{copied ? <Check className="w-3.5 h-3.5 text-emerald-400"/> : <Copy className="w-3.5 h-3.5"/>}{copied ? 'Copied' : 'Copy Raw'}</button></div><div className="flex flex-col md:flex-row"><div className="md:w-64 p-2 border-r border-[#30363d] space-y-1">{selected.files.map((file, index) => <button key={file.path} onClick={() => setFileIndex(index)} className="w-full px-2.5 py-1.5 flex items-center gap-2 text-xs"><FileCode className="w-3.5 h-3.5 text-purple-400"/>{file.path}</button>)}</div><pre className="flex-1 p-4 text-xs overflow-x-auto"><code>{selected.files[fileIndex].content}</code></pre></div></div></div>;
}
