import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/layout/Header';
import { NavigationTabs } from './components/layout/NavigationTabs';
import { Footer } from './components/layout/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';
import { useMultiPlatformActivity } from './hooks/useMultiPlatformActivity';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activity = useMultiPlatformActivity();

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => undefined);
    } else {
      document.exitFullscreen().catch(() => undefined);
    }
  };

  const newSkillCount = useMemo(() => Object.values(activity.mergedSkills).flat().filter(skill => skill.isNew).length, [activity.mergedSkills]);

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-[#c9d1d9] font-sans flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      <div>
        <Header isSyncing={activity.isSyncing} isFullscreen={isFullscreen} onSync={() => activity.syncAll()} onNavigate={setActiveTab} onToggleFullscreen={toggleFullscreen}/>
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} repoCount={activity.repositories.length} newSkillCount={newSkillCount}/>
        <main className="max-w-[1700px] w-full mx-auto px-4 py-6 sm:px-8 lg:px-12">
          {activeTab === 'overview' && <OverviewPage activityData={activity.activityData} courseraCourses={activity.courseraCourses} courseraFeedError={activity.courseraFeedError} mergedSkills={activity.mergedSkills} dynamicTechStack={activity.dynamicTechStack} leetcodeStats={activity.leetcodeStats} hackerrankStats={activity.hackerrankStats}/>} 
          {activeTab === 'repositories' && <RepositoriesPage repositories={activity.repositories}/>} 
          {activeTab === 'resume' && <ResumePage mergedSkills={activity.mergedSkills}/>} 
          {activeTab === 'contact' && <ContactPage/>}
        </main>
      </div>
      <Footer/>
    </div>
  );
}
