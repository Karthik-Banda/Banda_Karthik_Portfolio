import { useState } from 'react';
import type { ActivityData } from '../../types';
import { BarChart2 } from '../icons';

export function Heatmap({ activityData }: { activityData: ActivityData }) {
  const colors = ['bg-[#161b22]', 'bg-emerald-950', 'bg-emerald-800', 'bg-emerald-500', 'bg-emerald-300'];
  const years = Array.from(new Set(activityData.days.map(day => day.date.slice(0, 4)))).sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState(years[0] || String(new Date().getFullYear()));
  const yearDays = activityData.days.filter(day => day.date.startsWith(selectedYear));
  const yearlyContributions = yearDays.reduce((total, day) => total + day.count, 0);

  const aligned = (() => {
    if (!yearDays.length) return [];
    const offset = new Date(`${yearDays[0].date}T00:00:00`).getDay();
    const placeholders = Array.from({ length: offset }, (_, index) => ({ index: -index - 1, date: '', count: 0, level: -1, isToday: false, githubCount: 0, leetcodeCount: 0, hackerrankCount: 0 }));
    return [...placeholders, ...yearDays];
  })();

  return (
    <div className="py-5 space-y-5">
      <div>
        <h3 className="text-base xl:text-lg font-bold text-white flex items-center gap-2 font-mono uppercase"><BarChart2 className="w-5 h-5 text-purple-400"/><span>Multi-Platform Daily Submission Tracker</span></h3>
        <p className="text-sm text-[#8b949e] pt-1">Daily commits and problem submissions across GitHub, LeetCode, and HackerRank</p>
      </div>
      <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 items-start">
        <div>
          <label htmlFor="contribution-year" className="block text-sm font-bold text-[#aab2bd] mb-2">Year</label>
          <select id="contribution-year" value={selectedYear} onChange={event => setSelectedYear(event.target.value)} className="w-full px-3 py-2 rounded-md bg-[#161b22] border border-[#30363d] text-white text-sm font-mono">
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
          <p className="mt-3 text-sm text-[#8b949e]"><strong className="block text-lg text-white">{yearlyContributions}</strong>contributions</p>
        </div>
        <div className="min-w-0">
          <div className="contribution-grid">
            {aligned.map(day => <div key={day.index} className={`contribution-cell ${day.level === -1 ? 'bg-transparent' : colors[day.level] || colors[0]} ${day.isToday ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#0d1117]' : ''}`} title={day.date ? `${day.date}: ${day.count} total (GitHub ${day.githubCount}, LeetCode ${day.leetcodeCount}, HackerRank ${day.hackerrankCount})` : ''}/>)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 text-sm text-[#8b949e]"><span>Less</span>{colors.map((color, index) => <span key={index} className={`w-3 h-3 rounded-sm ${color}`}/>)}<span>More</span></div>
    </div>
  );
}
