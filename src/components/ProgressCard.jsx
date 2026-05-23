export default function ProgressCard({ visitedCount, totalCount, progress }) {
  return (
    <div className="absolute right-3 top-3 z-20 w-[132px] rounded-2xl border border-white/10 bg-black/50 p-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:right-7 sm:top-7 sm:w-[210px] sm:rounded-[1.4rem] sm:p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] text-white/60 sm:text-xs">
        <span>Открыто</span>
        <span>
          {visitedCount}/{totalCount}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10 sm:h-2.5">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-xl font-black sm:mt-3 sm:text-3xl">
        {progress}%
      </div>
    </div>
  );
}