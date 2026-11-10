import { useState } from 'react';
import { Lesson } from '../data/lessons';

interface QuizViewProps {
  lesson: Lesson;
  lang: 'fa' | 'en';
  onComplete: () => void;
  onBack: () => void;
}

export default function QuizView({ lesson, lang, onComplete, onBack }: QuizViewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(lesson.quiz.length).fill(null));

  const quiz = lesson.quiz;
  const question = quiz[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);

    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete();
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers(new Array(quiz.length).fill(null));
  };

  if (finished) {
    const percent = Math.round((score / quiz.length) * 100);
    const emoji = percent >= 80 ? '🎉' : percent >= 60 ? '👍' : percent >= 40 ? '💪' : '📚';
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
            {lang === 'fa' ? 'آزمون تمام شد!' : 'Quiz Complete!'}
          </h2>
          <p className="text-slate-300 text-lg mb-6">
            {lang === 'fa'
              ? `${lesson.title} — درس ${lesson.id}`
              : `${lesson.titleEn} — Lesson ${lesson.id}`}
          </p>
          
          <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
            <div className="text-5xl font-black text-white mb-2">
              {score}/{quiz.length}
            </div>
            <div className="text-2xl text-purple-300 font-bold">{percent}%</div>
            <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  percent >= 80 ? 'bg-green-500' : percent >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-sm text-slate-400 mt-3">
              {percent >= 80
                ? (lang === 'fa' ? 'عالی! تسلط خوبی داری!' : 'Excellent! Great mastery!')
                : percent >= 60
                ? (lang === 'fa' ? 'خوبه! کمی بیشتر تمرین کن.' : 'Good! Practice a bit more.')
                : (lang === 'fa' ? 'درس رو دوباره مرور کن.' : 'Review the lesson again.')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={restart}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl font-bold text-purple-300 transition"
            >
              <i className="fas fa-redo ml-2"></i>
              {lang === 'fa' ? 'تلاش دوباره' : 'Try Again'}
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105"
            >
              <i className="fas fa-arrow-right ml-2"></i>
              {lang === 'fa' ? 'بازگشت به درس' : 'Back to Lesson'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            <i className="fas fa-arrow-right ml-1"></i>
            {lang === 'fa' ? 'بازگشت' : 'Back'}
          </button>
          <span className="text-sm text-purple-300 font-medium">
            {currentQ + 1} / {quiz.length}
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let btnClass = 'bg-slate-700/50 border-slate-600 hover:border-purple-500 hover:bg-slate-700';
            
            if (showResult) {
              if (index === question.correctIndex) {
                btnClass = 'bg-green-500/20 border-green-500 text-green-300';
              } else if (index === selectedAnswer && index !== question.correctIndex) {
                btnClass = 'bg-red-500/20 border-red-500 text-red-300';
              } else {
                btnClass = 'bg-slate-700/30 border-slate-700 opacity-50';
              }
            } else if (selectedAnswer === index) {
              btnClass = 'bg-purple-500/20 border-purple-500 text-purple-300';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && index === question.correctIndex && (
                    <i className="fas fa-check-circle text-green-400"></i>
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctIndex && (
                    <i className="fas fa-times-circle text-red-400"></i>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-blue-300 text-sm">
              <i className="fas fa-info-circle ml-2"></i>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            {currentQ < quiz.length - 1
              ? (lang === 'fa' ? 'سؤال بعدی' : 'Next Question')
              : (lang === 'fa' ? 'مشاهده نتیجه' : 'See Results')}
            <i className="fas fa-arrow-left mr-2"></i>
          </button>
        </div>
      )}
    </div>
  );
}
