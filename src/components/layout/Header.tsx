import { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Maximize2, Minimize2, RefreshCw } from '../icons';

type HeaderProps = {
  isSyncing: boolean;
  isFullscreen: boolean;
  onSync: () => void;
  onNavigate: (tab: string) => void;
  onToggleFullscreen: () => void;
};

export function Header({ isSyncing, isFullscreen, onSync, onNavigate, onToggleFullscreen }: HeaderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between text-xs sticky top-0 z-50">
      <button onClick={() => onNavigate('overview')} className="flex items-center gap-3 text-left">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 border border-purple-400 overflow-hidden flex items-center justify-center text-white font-black">
          {imageError ? <span>BK</span> : <img src={PROFILE_DATA.profileImg} alt={PROFILE_DATA.name} onError={() => setImageError(true)} className="w-full h-full object-cover" />}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-sm">{PROFILE_DATA.name}</span>
          <span className="text-[11px] text-purple-400 font-mono">{PROFILE_DATA.title}</span>
        </div>
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        <button onClick={onSync} disabled={isSyncing} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] border border-[#30363d] text-cyan-400 font-mono text-[11px]">
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Live Activity'}</span>
        </button>
        <button onClick={onToggleFullscreen} className="px-2.5 py-1.5 rounded bg-[#21262d] border border-[#30363d] text-slate-300 font-mono text-[11px] flex items-center gap-1">
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="hidden md:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>
        <button onClick={() => onNavigate('contact')} className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-bold">Hire Karthik</button>
      </div>
    </header>
  );
}
