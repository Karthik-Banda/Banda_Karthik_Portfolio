import type { CourseraCourse } from '../../types';
import { PROFILE_DATA } from '../../data/profile';
import { ExternalLink, GraduationCap } from '../icons';

type Props = {
  courses: CourseraCourse[];
  feedError: string;
};

export function CourseraLearningTracker({ courses, feedError }: Props) {
  return (
    <section className="p-5 rounded-md bg-[#0d1117] border border-[#30363d] space-y-4">
      <header>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-white uppercase font-mono">Coursera My Plan &amp; Learning Progress</h3>
          <a href={PROFILE_DATA.courseraPlanUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 flex items-center gap-1">
            <span>Open My Plan</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </header>

      {feedError && <p role="alert" className="p-2.5 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">{feedError}</p>}

      {courses.length === 0 ? (
        <p className="text-xs text-[#8b949e]">No courses are available in the Coursera feed.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courses.map(course => (
            <article key={course.id} className="p-4 rounded-md bg-[#161b22] border border-[#30363d] space-y-3">
              <div className="flex justify-between gap-2">
                <span className="text-[10px] text-blue-300">{course.provider}</span>
                <span className={`text-[10px] ${course.progress === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {course.progress === 100 ? 'Completed' : `${course.progress}% In Progress`}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{course.title}</h4>
              <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                <div className={`h-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${course.progress}%` }} />
              </div>
              <div className="flex flex-wrap gap-1">
                {course.skillsLearned.map((skill, index) => (
                  <span key={`${skill}-${index}`} className="px-1.5 py-0.5 rounded text-[10px] text-cyan-300 border border-[#30363d]">+{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
