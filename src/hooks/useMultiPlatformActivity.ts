import { useEffect, useMemo, useState } from 'react';
import { INITIAL_COURSERA_COURSES } from '../data/coursera';
import { BASE_RESUME_SKILLS, INITIAL_LEETCODE_FALLBACK, PROFILE_DATA } from '../data/profile';
import { DEFAULT_COURSERA_FEED_URL } from '../lib/environment';
import { getLocalCache, setLocalCache } from '../lib/cache';
import type { ActivityData, CourseraCourse, Repository, TechStackItem } from '../types';

const classifySkillCategory = (skillName: string) => {
  const value = skillName.toLowerCase();
  if (/(c#|net|asp|api|microservice|java|python|node|express|spring|graphql|grpc)/.test(value)) return 'backend';
  if (/(react|vue|angular|html|css|tailwind|javascript|typescript|next|redux|vite|ui|ux)/.test(value)) return 'frontend';
  if (/(sql|postgres|mongo|redis|supabase|firebase|oracle|database|normalization|query)/.test(value)) return 'database';
  return 'devopsAi';
};

export function useMultiPlatformActivity() {
  const [activityData, setActivityData] = useState<ActivityData>({ githubCommitsToday: 0, leetcodeSubmissionsToday: 0, hackerrankSubmissionsToday: 0, hasSubmittedToday: false, days: [] });
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [dynamicTechStack, setDynamicTechStack] = useState<TechStackItem[]>([]);
  const [courseraFeedError, setCourseraFeedError] = useState('');
  const [courseraCourses, setCourseraCourses] = useState<CourseraCourse[]>(() => {
    try {
      const saved = localStorage.getItem('karthik_coursera_courses');
      return saved ? JSON.parse(saved) : INITIAL_COURSERA_COURSES;
    } catch { return INITIAL_COURSERA_COURSES; }
  });
  const [leetcodeStats, setLeetcodeStats] = useState(INITIAL_LEETCODE_FALLBACK);
  const [hackerrankStats, setHackerrankStats] = useState({ badges: ["Problem Solving", "C#", "SQL"] });
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('karthik_coursera_courses', JSON.stringify(courseraCourses)); } catch (error) { console.warn(error); }
  }, [courseraCourses]);

  const replaceCourseraCourses = (list: unknown[]) => {
    if (!Array.isArray(list)) return;
    const normalized = list.map((item: any, index) => ({
      id: item.id || `coursera-${Date.now()}-${index}`,
      title: item.title || "Coursera Course",
      provider: item.provider || "Coursera",
      status: Number(item.progress) >= 100 ? "Completed" : "In Progress",
      progress: Math.min(100, Math.max(0, Number(item.progress) || 0)),
      completedDate: item.completedDate || "My Plan",
      credentialUrl: item.credentialUrl || PROFILE_DATA.courseraPlanUrl,
      skillsLearned: Array.isArray(item.skillsLearned) ? item.skillsLearned : [],
    }));
    setCourseraCourses(normalized);
  };

  const mergedSkills = useMemo(() => {
    const result: Record<'backend' | 'frontend' | 'database' | 'devopsAi', Array<{ name: string; isNew: boolean; source: string }>> = {
      backend: BASE_RESUME_SKILLS.backend.map(name => ({ name, isNew: false, source: 'Core' })),
      frontend: BASE_RESUME_SKILLS.frontend.map(name => ({ name, isNew: false, source: 'Core' })),
      database: BASE_RESUME_SKILLS.database.map(name => ({ name, isNew: false, source: 'Core' })),
      devopsAi: BASE_RESUME_SKILLS.devopsAi.map(name => ({ name, isNew: false, source: 'Core' })),
    };
    const existing = new Set(Object.values(BASE_RESUME_SKILLS).flat().map(skill => skill.toLowerCase()));

    const addUniqueSkill = (rawSkill: string, source: string) => {
      const clean = rawSkill.trim();
      if (!clean || existing.has(clean.toLowerCase())) return;
      existing.add(clean.toLowerCase());
      result[classifySkillCategory(clean) as keyof typeof result].push({ name: clean, isNew: true, source });
    };

    courseraCourses.forEach(course => (course.skillsLearned || []).forEach(skill => addUniqueSkill(skill, 'Coursera')));
    repositories.forEach(repo => { if (repo.language) addUniqueSkill(repo.language, 'GitHub'); });
    return result;
  }, [courseraCourses, repositories]);

  const fetchLiveStats = async (force = false) => {
    setIsSyncing(true);
    const key = `activity_v2_${PROFILE_DATA.username}`;
    const cached = getLocalCache(key);

    if (!force && cached?.data) {
      setActivityData(cached.data.activity);
      if (cached.data.repos) setRepositories(cached.data.repos);
      if (cached.data.techStack) setDynamicTechStack(cached.data.techStack);
      if (cached.data.leetcode) setLeetcodeStats(cached.data.leetcode);
      if (cached.data.hackerrank) setHackerrankStats(cached.data.hackerrank);
      if (cached.isFresh && !DEFAULT_COURSERA_FEED_URL) { setIsSyncing(false); return; }
    }

    try {
      if (DEFAULT_COURSERA_FEED_URL) {
        try {
          const response = await fetch(DEFAULT_COURSERA_FEED_URL, { cache: 'no-cache' });
          if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
          const courses = await response.json();
          if (!Array.isArray(courses)) throw new Error('Expected a JSON array of courses.');
          replaceCourseraCourses(courses);
          setCourseraFeedError('');
        } catch (error) {
          console.warn('Coursera live feed warning:', error);
          setCourseraFeedError(error instanceof Error ? `Coursera feed error: ${error.message}` : 'Coursera feed could not be loaded.');
        }
      } else {
        setCourseraFeedError('');
      }

      if (!force && cached?.isFresh) return;

      const todayISO = new Date().toISOString().split('T')[0];
      const currentYear = new Date().getFullYear();
      const firstActivityDate = `${currentYear - 4}-01-01`;
      const dateActivityMap: Record<string, { github: number; leetcode: number; hackerrank: number }> = {};
      const getDayCounts = (date: string) => {
        if (!dateActivityMap[date]) dateActivityMap[date] = { github: 0, leetcode: 0, hackerrank: 0 };
        return dateActivityMap[date];
      };

      let formattedRepos: Repository[] = [];
      let calculatedTechStack: TechStackItem[] = [];
      let githubToday = 0;
      let leetcodeToday = 0;
      let hackerrankToday = 0;

      try {
        const [reposRes, eventsRes, ...contributionResponses] = await Promise.all([
          fetch(`/api/github/users/${PROFILE_DATA.username}/repos?sort=updated&per_page=100`, { headers: { Accept: 'application/vnd.github+json' } }),
          fetch(`/api/github/users/${PROFILE_DATA.username}/events/public?per_page=100`, { headers: { Accept: 'application/vnd.github+json' } }),
          ...Array.from({ length: 5 }, (_, index) => fetch(`/api/contributions/${PROFILE_DATA.username}?y=${currentYear - index}`)),
        ]);

        if (reposRes.ok) {
          const reposJson = await reposRes.json();
          if (Array.isArray(reposJson)) {
            const languageCounts: Record<string, number> = {};
            formattedRepos = reposJson.map((repo: any) => {
              const language = repo.language || 'C#';
              if (repo.language) languageCounts[language] = (languageCounts[language] || 0) + 1;
              return {
                id: repo.name,
                name: repo.name,
                visibility: repo.private ? 'Private' : 'Public',
                description: repo.description || 'Imported from live GitHub API.',
                language,
                langColor: 'bg-cyan-500',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: `Updated ${new Date(repo.updated_at).toLocaleDateString()}`,
                topics: repo.topics?.length ? repo.topics : [language.toLowerCase(), 'dotnet', 'react'],
                branch: repo.default_branch || 'main',
                url: repo.html_url,
                files: [{ path: 'README.md', lang: 'markdown', content: `# ${repo.name}\n\n${repo.description || ''}` }],
              };
            });

            const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
            calculatedTechStack = Object.entries(languageCounts).map(([name, count]) => ({
              name,
              count,
              percentage: Math.round((count / (total || 1)) * 100),
              color: 'bg-cyan-500',
            })).sort((a, b) => b.count - a.count);
            setRepositories(formattedRepos);
            setDynamicTechStack(calculatedTechStack);
          }
        }

        for (const response of contributionResponses) {
          if (!response.ok) continue;
          const json = await response.json();
          if (Array.isArray(json.contributions)) {
            json.contributions.forEach((entry: { date: string; count: number }) => {
              const count = Number(entry.count) || 0;
              getDayCounts(entry.date).github = count;
              if (entry.date === todayISO) githubToday = count;
            });
          }
        }

        if (eventsRes.ok) {
          const events = await eventsRes.json();
          if (Array.isArray(events)) {
            events.forEach((event: any) => {
              if (!event.created_at) return;
              const date = event.created_at.split('T')[0];
              const count = event.type === 'PushEvent' ? (event.payload?.commits?.length || 1) : 1;
              const day = getDayCounts(date);
              if (!day.github) day.github = count;
            });
          }
        }
      } catch (error) { console.warn("GitHub API fetch warning:", error); }

      let leetcodeResult = leetcodeStats;
      try {
        const response = await fetch(`/api/leetcode/${PROFILE_DATA.leetcode}`);
        if (response.ok) {
          const json = await response.json();
          leetcodeResult = {
            totalSolved: json.totalSolved || INITIAL_LEETCODE_FALLBACK.totalSolved,
            easy: json.easySolved || INITIAL_LEETCODE_FALLBACK.easy,
            medium: json.mediumSolved || INITIAL_LEETCODE_FALLBACK.medium,
            hard: json.hardSolved || INITIAL_LEETCODE_FALLBACK.hard,
            ranking: json.ranking ? `#${json.ranking}` : INITIAL_LEETCODE_FALLBACK.ranking,
          };
          setLeetcodeStats(leetcodeResult);
          if (json.submissionCalendar) {
            const calendar = typeof json.submissionCalendar === 'string' ? JSON.parse(json.submissionCalendar) : json.submissionCalendar;
            Object.entries(calendar).forEach(([epoch, rawCount]) => {
              const count = Number(rawCount) || 0;
              const date = new Date(Number(epoch) * 1000).toISOString().split('T')[0];
              getDayCounts(date).leetcode += count;
              if (date === todayISO) leetcodeToday += count;
            });
          }
        }
      } catch (error) { console.warn("LeetCode fallback active:", error); }

      try {
        const baseUrl = `/api/hackerrank/rest/hackers/${encodeURIComponent(PROFILE_DATA.hackerrank)}/recent_challenges`;
        const seenCursors = new Set<string>();
        let query = new URLSearchParams({ limit: '100', response_version: 'v2' });

        for (let page = 0; page < 50; page++) {
          const response = await fetch(`${baseUrl}?${query.toString()}`);
          if (!response.ok) throw new Error(`HackerRank HTTP status: ${response.status}`);
          const json = await response.json();
          const models = Array.isArray(json.models) ? json.models : [];
          const pageDates: string[] = [];

          models.forEach((entry: { created_at?: string }) => {
            if (!entry.created_at) return;
            const timestamp = Date.parse(entry.created_at);
            if (!Number.isFinite(timestamp)) return;
            const date = new Date(timestamp).toISOString().split('T')[0];
            pageDates.push(date);
            if (date < firstActivityDate) return;
            getDayCounts(date).hackerrank += 1;
            if (date === todayISO) hackerrankToday += 1;
          });

          if (pageDates.length && pageDates.every(date => date < firstActivityDate)) break;
          const cursor = typeof json.cursor === 'string' ? json.cursor : '';
          if (!cursor || json.last_page || seenCursors.has(cursor)) break;
          seenCursors.add(cursor);
          query = new URLSearchParams({ limit: '100', response_version: 'v2', cursor });
        }
      } catch (error) { console.warn("HackerRank activity fallback active:", error); }

      let hackerRankResult = hackerrankStats;
      try {
        const response = await fetch(`/api/hackerrank/rest/hackers/${PROFILE_DATA.hackerrank}/badges`);
        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json.models)) {
            hackerRankResult = { badges: json.models.map((item: any) => item.badge_name || 'Specialist') };
            setHackerrankStats(hackerRankResult);
          }
        }
      } catch (error) { console.warn("HackerRank fallback active:", error); }

      const daysMatrix = [];
      let index = 0;
      for (let year = currentYear - 4; year <= currentYear; year++) {
        for (let month = 0; month < 12; month++) {
          const lastDay = new Date(year, month + 1, 0).getDate();
          for (let dayNumber = 1; dayNumber <= lastDay; dayNumber++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            const dayCounts = dateActivityMap[date] || { github: 0, leetcode: 0, hackerrank: 0 };
            const count = dayCounts.github + dayCounts.leetcode + dayCounts.hackerrank;
            let level = 0;
            if (count > 0 && count <= 2) level = 1;
            else if (count > 2 && count <= 5) level = 2;
            else if (count > 5 && count <= 8) level = 3;
            else if (count > 8) level = 4;
            daysMatrix.push({ index: index++, date, count, level, isToday: date === todayISO, githubCount: dayCounts.github, leetcodeCount: dayCounts.leetcode, hackerrankCount: dayCounts.hackerrank });
          }
        }
      }

      const updatedActivity = { githubCommitsToday: githubToday, leetcodeSubmissionsToday: leetcodeToday, hackerrankSubmissionsToday: hackerrankToday, hasSubmittedToday: githubToday + leetcodeToday + hackerrankToday > 0, days: daysMatrix };
      setActivityData(updatedActivity);
      setLocalCache(key, { activity: updatedActivity, repos: formattedRepos, techStack: calculatedTechStack, leetcode: leetcodeResult, hackerrank: hackerRankResult });
    } catch (error) {
      console.warn("Error syncing live stats:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchLiveStats();
    const interval = window.setInterval(() => fetchLiveStats(true), 15 * 60 * 1000);
    const onVisibility = () => { if (document.visibilityState === 'visible') fetchLiveStats(true); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { window.clearInterval(interval); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  return { activityData, repositories, dynamicTechStack, courseraCourses, courseraFeedError, mergedSkills, leetcodeStats, hackerrankStats, isSyncing, syncAll: () => fetchLiveStats(true) };
}
