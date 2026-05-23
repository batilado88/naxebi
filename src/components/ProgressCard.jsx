export default function ProgressCard({ visitedCount, totalCount, progress }) {
  return (
    <div className="absolute right-5 top-5 z-20 w-[210px] rounded-[1.4rem] border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:right-7 sm:top-7">
      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
        <span>Открыто</span>
        <span>
          {visitedCount}/{totalCount}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 text-3xl font-black">{progress}%</div>
    </div>
  );
}