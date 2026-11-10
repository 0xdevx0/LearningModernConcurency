import { useState, useEffect } from 'react';
import { lessons, categories, Lesson } from './data/lessons';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';

type View = 'home' | 'lesson' | 'quiz' | 'about';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');

  useEffect(() => {
    const saved = localStorage.getItem('swiftlab_completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const markComplete = (id: number) => {
    const updated = [...new Set([...completedLessons, id])];
    setCompletedLessons(updated);
    localStorage.setItem('swiftlab_completed', JSON.stringify(updated));
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
    setSidebarOpen(false);
  };

  const openQuiz = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('quiz');
    setSidebarOpen(false);
  };

  const goHome = () => {
    setView('home');
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-purple-500/20 transition"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div onClick={goHome} className="cursor-pointer flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-500/30">
                S
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  SwiftLab
                </h1>
                <p className="text-[10px] text-slate-400 -mt-1">
                  {lang === 'fa' ? 'همزمانی مدرن در سوئیفت' : 'Modern Concurrency in Swift'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-sm font-medium transition border border-purple-500/30"
            >
              {lang === 'fa' ? 'EN' : 'فا'}
            </button>
            <button
              onClick={goHome}
              className="hidden sm:block px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-sm transition"
            >
              <i className="fas fa-home ml-1"></i>
              {lang === 'fa' ? ' خانه' : ' Home'}
            </button>
          </div>
        </div>
        <ProgressBar completed={completedLessons.length} total={100} />
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          lessons={lessons}
          categories={categories}
          completedLessons={completedLessons}
          onSelectLesson={openLesson}
          lang={lang}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-4 lg:p-6">
          {view === 'home' && (
            <HomeView
              lessons={lessons}
              categories={categories}
              completedLessons={completedLessons}
              onSelectLesson={openLesson}
              onOpenQuiz={openQuiz}
              lang={lang}
            />
          )}
          {view === 'lesson' && selectedLesson && (
            <LessonView
              lesson={selectedLesson}
              lang={lang}
              onComplete={() => markComplete(selectedLesson.id)}
              isCompleted={completedLessons.includes(selectedLesson.id)}
              onQuiz={() => openQuiz(selectedLesson)}
              onNext={() => {
                const next = lessons.find(l => l.id === selectedLesson.id + 1);
                if (next) openLesson(next);
              }}
              onPrev={() => {
                const prev = lessons.find(l => l.id === selectedLesson.id - 1);
                if (prev) openLesson(prev);
              }}
            />
          )}
          {view === 'quiz' && selectedLesson && (
            <QuizView
              lesson={selectedLesson}
              lang={lang}
              onComplete={() => markComplete(selectedLesson.id)}
              onBack={() => openLesson(selectedLesson)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function HomeView({
  lessons,
  categories,
  completedLessons,
  onSelectLesson,
  onOpenQuiz,
  lang,
}: {
  lessons: Lesson[];
  categories: { id: string; name: string; nameEn: string; lessons: string }[];
  completedLessons: number[];
  onSelectLesson: (l: Lesson) => void;
  onOpenQuiz: (l: Lesson) => void;
  lang: 'fa' | 'en';
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredLessons = lessons.filter(l => {
    const matchSearch = search === '' ||
      l.title.includes(search) ||
      l.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      l.description.includes(search) ||
      l.descriptionEn.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || l.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-8 py-8">
        <div className="inline-block mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-2xl shadow-purple-500/30 animate-pulse">
            ⚡
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          {lang === 'fa' ? 'همزمانی مدرن در سوئیفت' : 'Modern Concurrency in Swift'}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-4">
          {lang === 'fa'
            ? '۱۰۰ درس کامل از مبانی تا پیشرفته — async/await، Actors، TaskGroup و بیشتر'
            : '100 complete lessons from basics to advanced — async/await, Actors, TaskGroup and more'}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
            ✓ {completedLessons.length}/100 {lang === 'fa' ? 'تکمیل شده' : 'completed'}
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
            📚 100 {lang === 'fa' ? 'درس' : 'lessons'}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
            🧪 {lang === 'fa' ? 'آزمون‌های اینتراکتیو' : 'Interactive Quizzes'}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-xl mx-auto">
          <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder={lang === 'fa' ? 'جستجو در درس‌ها...' : 'Search lessons...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pr-12 pl-4 py-3 bg-slate-800/60 border border-purple-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm transition ${
            !selectedCategory
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {lang === 'fa' ? 'همه' : 'All'}
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition ${
              selectedCategory === cat.id
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'fa' ? cat.name : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLessons.map(lesson => (
          <div
            key={lesson.id}
            className="group bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                #{lesson.id}
              </span>
              {completedLessons.includes(lesson.id) && (
                <span className="text-green-400 text-sm">✓</span>
              )}
            </div>
            <h3 className="font-bold text-white mb-1 group-hover:text-purple-300 transition">
              {lang === 'fa' ? lesson.title : lesson.titleEn}
            </h3>
            <p className="text-sm text-slate-400 mb-3 line-clamp-2">
              {lang === 'fa' ? lesson.description : lesson.descriptionEn}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectLesson(lesson)}
                className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition border border-purple-500/30"
              >
                <i className="fas fa-book-open ml-1"></i>
                {lang === 'fa' ? ' مطالعه' : ' Study'}
              </button>
              <button
                onClick={() => onOpenQuiz(lesson)}
                className="px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-sm font-medium transition border border-orange-500/30"
              >
                <i className="fas fa-question-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <i className="fas fa-search text-4xl mb-3 block"></i>
          <p>{lang === 'fa' ? 'درسی یافت نشد' : 'No lessons found'}</p>
        </div>
      )}
    </div>
  );
}
