import { PROFILE_DATA } from '../../data/profile';
import { Github } from '../icons';

export function Footer() {
  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] py-6 px-4 text-center text-xs text-[#8b949e] space-y-2">
      <div className="flex items-center justify-center gap-4"><Github className="w-4 h-4 text-slate-400"/><span>© 2026 {PROFILE_DATA.name} — .NET Full-Stack Software Engineer</span></div>
      <p className="text-[11px]">{PROFILE_DATA.location} | {PROFILE_DATA.phone} | {PROFILE_DATA.email}</p>
    </footer>
  );
}
