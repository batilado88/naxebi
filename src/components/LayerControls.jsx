export default function LayerControls({
  showCities,
  showRegionLabels,
  onToggleCities,
  onToggleRegionLabels,
}) {
  return (
    <div className="absolute right-5 top-[150px] z-20 hidden w-[210px] rounded-[1.4rem] border border-white/10 bg-black/45 p-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:right-7 sm:top-[160px] sm:block">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
        Слои
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onToggleCities}
          className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${showCities
              ? "bg-white text-black"
              : "bg-white/10 text-white/70 hover:bg-white/15"
            }`}
        >
          <span>Города</span>
          <span>{showCities ? "On" : "Off"}</span>
        </button>

        <button
          onClick={onToggleRegionLabels}
          className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${showRegionLabels
              ? "bg-white text-black"
              : "bg-white/10 text-white/70 hover:bg-white/15"
            }`}
        >
          <span>Регионы</span>
          <span>{showRegionLabels ? "On" : "Off"}</span>
        </button>
      </div>
    </div>
  );
}