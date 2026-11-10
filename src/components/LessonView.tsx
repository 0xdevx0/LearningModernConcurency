import { useState } from 'react';
import { Lesson } from '../data/lessons';

interface LessonViewProps {
  lesson: Lesson;
  lang: 'fa' | 'en';
  onComplete: () => void;
  isCompleted: boolean;
  onQuiz: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LessonView({ lesson, lang, onComplete, isCompleted, onQuiz, onNext, onPrev }: LessonViewProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPrev}
          disabled={lesson.id === 1}
          className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700 rounded-lg text-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <i className="fas fa-arrow-right ml-1"></i>
          {lang === 'fa' ? ' قبلی' : ' Previous'}
        </button>
        <span className="text-sm text-slate-400">
          {lesson.id} / 100
        </span>
        <button
          onClick={onNext}
          disabled={lesson.id === 100}
          className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700 rounded-lg text-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {lang === 'fa' ? 'بعدی ' : 'Next '}
          <i className="fas fa-arrow-left mr-1"></i>
        </button>
      </div>

      {/* Lesson Header */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
            {lang === 'fa' ? lesson.category : lesson.categoryEn}
          </span>
          {isCompleted && (
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              ✓ {lang === 'fa' ? 'تکمیل شده' : 'Completed'}
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
          {lang === 'fa' ? lesson.title : lesson.titleEn}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          {lang === 'fa' ? lesson.description : lesson.descriptionEn}
        </p>
      </div>

      {/* Code Section */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-slate-400 ml-2">Swift</span>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-sm text-purple-300 hover:text-purple-200 transition"
          >
            {showCode ? (
              <><i className="fas fa-eye-slash ml-1"></i> {lang === 'fa' ? 'مخفی کردن' : 'Hide'}</>
            ) : (
              <><i className="fas fa-eye ml-1"></i> {lang === 'fa' ? 'نمایش' : 'Show'}</>
            )}
          </button>
        </div>
        {showCode && (
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm leading-relaxed" dir="ltr">
              <code className="text-green-300">
                {lesson.code}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-purple-300 mb-3">
          <i className="fas fa-lightbulb ml-2 text-yellow-400"></i>
          {lang === 'fa' ? 'توضیحات' : 'Explanation'}
        </h2>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {lang === 'fa' ? lesson.explanation : lesson.explanationEn}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-check-circle ml-2"></i>
            {lang === 'fa' ? 'تکمیل این درس' : 'Mark as Complete'}
          </button>
        )}
        <button
          onClick={onQuiz}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
        >
          <i className="fas fa-question-circle ml-2"></i>
          {lang === 'fa' ? 'آزمون این درس' : 'Take Quiz'}
        </button>
        <button
          onClick={onNext}
          disabled={lesson.id === 100}
          className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl font-bold text-purple-300 transition disabled:opacity-30"
        >
          {lang === 'fa' ? 'درس بعدی' : 'Next Lesson'}
          <i className="fas fa-arrow-left mr-2"></i>
        </button>
      </div>
    </div>
  );
}
