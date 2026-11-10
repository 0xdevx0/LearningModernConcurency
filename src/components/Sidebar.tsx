import { Lesson } from '../data/lessons';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  lessons: Lesson[];
  categories: { id: string; name: string; nameEn: string; lessons: string }[];
  completedLessons: number[];
  onSelectLesson: (l: Lesson) => void;
  lang: 'fa' | 'en';
}

export default function Sidebar({ open, onClose, lessons, categories, completedLessons, onSelectLesson, lang }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[72px] right-0 h-screen lg:h-[calc(100vh-72px)] w-72 bg-slate-900/95 lg:bg-transparent backdrop-blur-xl border-l border-purple-500/20 z-50 lg:z-10 overflow-y-auto transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-bold text-lg">
              {lang === 'fa' ? 'فهرست درس‌ها' : 'Lessons'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="hidden lg:block mb-4">
            <h2 className="font-bold text-lg text-purple-300">
              {lang === 'fa' ? '📚 فهرست درس‌ها' : '📚 Lessons'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {completedLessons.length}/100 {lang === 'fa' ? 'تکمیل شده' : 'completed'}
            </p>
          </div>

          {categories.map(cat => {
            const catLessons = lessons.filter(l => l.category === cat.id);
            const completed = catLessons.filter(l => completedLessons.includes(l.id)).length;
            
            return (
              <div key={cat.id} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-300">
                    {lang === 'fa' ? cat.name : cat.nameEn}
                  </h3>
                  <span className="text-xs text-slate-500">{completed}/{catLessons.length}</span>
                </div>
                <div className="space-y-1">
                  {catLessons.map(lesson => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={`w-full text-right lg:text-right px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                        completedLessons.includes(lesson.id)
                          ? 'bg-green-500/10 text-green-300 hover:bg-green-500/20'
                          : 'text-slate-400 hover:bg-purple-500/10 hover:text-purple-300'
                      }`}
                    >
                      <span className="text-xs w-5 text-center">
                        {completedLessons.includes(lesson.id) ? '✓' : lesson.id}
                      </span>
                      <span className="truncate">
                        {lang === 'fa' ? lesson.title : lesson.titleEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
