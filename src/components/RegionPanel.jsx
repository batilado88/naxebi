import { MapPin, RotateCcw } from "lucide-react";

export default function RegionPanel({
  selected,
  selectedVisited,
  onToggleRegion,
  onResetMap,
}) {
  return (
    <aside className="absolute bottom-5 right-5 z-20 w-[min(360px,calc(100vw-40px))] rounded-[1.8rem] border border-white/10 bg-black/50 p-5 shadow-2xl shadow-black/50 backdrop-blur-md sm:bottom-7 sm:right-7">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${selected.accent} text-2xl shadow-lg`}
        >
          {selected.emoji}
        </div>

        <div>
          <h2 className="text-2xl font-black leading-tight">
            {selected.nameRu}
          </h2>
          <p className="text-sm text-white/50">{selected.name}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
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

      <button
        onClick={onToggleRegion}
        className={`mt-4 w-full rounded-2xl px-5 py-4 font-black transition ${
          selectedVisited
            ? "bg-white/10 text-white/80 hover:bg-white/15"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {selectedVisited ? "Убрать отметку" : "Я был здесь"}
      </button>

      <button
        onClick={onResetMap}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/15"
      >
        <RotateCcw size={16} />
        Сбросить карту
      </button>
    </aside>
  );
}