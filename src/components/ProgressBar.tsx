interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = Math.round((completed / total) * 100);
  
  return (
    <div className="max-w-7xl mx-auto px-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 whitespace-nowrap">
          {completed}/{total} ({percent}%)
        </span>
      </div>
    </div>
  );
}
