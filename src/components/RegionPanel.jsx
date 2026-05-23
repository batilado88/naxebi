import { MapPin, RotateCcw } from "lucide-react";

export default function RegionPanel({
  selected,
  selectedVisited,
  onToggleRegion,
  onResetMap,
}) {
  return (
    <aside className="absolute bottom-2 left-2 right-2 z-20 rounded-[1.25rem] border border-white/10 bg-black/60 p-2.5 shadow-2xl shadow-black/50 backdrop-blur-md sm:bottom-7 sm:left-auto sm:right-7 sm:w-[min(360px,calc(100vw-40px))] sm:rounded-[1.8rem] sm:p-5">
      <div className="flex items-center gap-3 sm:mb-5">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${selected.accent} text-lg shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl`}
        >
          {selected.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-black leading-tight sm:text-2xl">
            {selected.nameRu}
          </h2>
          <p className="text-xs text-white/50 sm:text-sm">{selected.name}</p>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/70 sm:hidden">
          {selectedVisited ? "Открыт" : "Закрыт"}
        </div>
      </div>

      <div className="mt-3 hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 sm:block">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/55">
          <MapPin size={16} />
          Статус региона
        </div>

        <div className="text-3xl font-black">
          {selectedVisited ? "Открыт" : "Закрыт"}
        </div>

        <p className="mt-3 text-sm leading-6 text-white/55">
          {selectedVisited
            ? "Регион уже открыт. Позже здесь будут дата поездки, фото, заметки и места внутри региона."
            : "Выбери регион на карте, а потом нажми кнопку, чтобы стереть фольгу и открыть его."}
        </p>
      </div>

      <div className="mt-2 flex gap-2 sm:mt-3 sm:block">
        <button
          onClick={onToggleRegion}
          className={`min-h-10 flex-1 rounded-2xl px-4 py-2.5 text-sm font-black transition sm:mt-4 sm:w-full sm:px-5 sm:py-4 sm:text-base ${selectedVisited
              ? "bg-white/10 text-white/80 hover:bg-white/15"
              : "bg-white text-black hover:bg-white/90"
            }`}
        >
          {selectedVisited ? "Убрать" : "Я был здесь"}
        </button>

        <button
          onClick={onResetMap}
          className="hidden w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/15 sm:mt-3 sm:inline-flex"
        >
          <RotateCcw size={16} />
          Сбросить карту
        </button>
      </div>
    </aside>
  );
}