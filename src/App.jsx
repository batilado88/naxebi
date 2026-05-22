import { useEffect, useMemo, useState } from "react";
import { MapPin, RotateCcw, Sparkles } from "lucide-react";
import { REGIONS } from "./data/regions";
import GeorgiaMap from "./components/GeorgiaMap";

const STORAGE_KEY = "naxebi.visited.regions.v1";

function loadVisited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function NaxebiApp() {
  const [visited, setVisited] = useState(() => loadVisited());
  const [selectedId, setSelectedId] = useState("tbilisi");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }, [visited]);

  const selected = REGIONS.find((region) => region.id === selectedId) ?? REGIONS[0];
  const selectedVisited = visited.includes(selected.id);

  const progress = useMemo(() => {
    return Math.round((visited.length / REGIONS.length) * 100);
  }, [visited.length]);

  function selectRegion(id) {
    setSelectedId(id);
  }

  function toggleRegion(id) {
    setVisited((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function resetMap() {
    setVisited([]);
    setSelectedId("tbilisi");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="relative min-h-screen p-3 sm:p-4">
        <GeorgiaMap
          regions={REGIONS}
          visited={visited}
          selectedId={selectedId}
          onRegionClick={selectRegion}
        />

        <header className="pointer-events-none absolute left-5 top-5 z-20 flex max-w-sm flex-col gap-3 sm:left-7 sm:top-7">
          <div className="pointer-events-auto rounded-[1.6rem] border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles size={14} />
              Virtual scratch map of Georgia
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Naxebi</h1>
            <p className="mt-2 hidden max-w-md text-sm leading-6 text-white/65 xl:block">
              Отмечай регионы Грузии, где уже был. Открывай карту постепенно и собирай личную историю поездок.
            </p>
          </div>
        </header>

        <div className="absolute right-5 top-5 z-20 w-[210px] rounded-[1.4rem] border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:right-7 sm:top-7">
          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
            <span>Открыто</span>
            <span>{visited.length}/{REGIONS.length}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-3xl font-black">{progress}%</div>
        </div>

        <aside className="absolute bottom-5 right-5 z-20 w-[min(360px,calc(100vw-40px))] rounded-[1.8rem] border border-white/10 bg-black/50 p-5 shadow-2xl shadow-black/50 backdrop-blur-md sm:bottom-7 sm:right-7">
          <div className="mb-5 flex items-center gap-3">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${selected.accent} text-2xl shadow-lg`}>
              {selected.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight">{selected.nameRu}</h2>
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
            onClick={() => toggleRegion(selected.id)}
            className={`mt-4 w-full rounded-2xl px-5 py-4 font-black transition ${selectedVisited
                ? "bg-white/10 text-white/80 hover:bg-white/15"
                : "bg-white text-black hover:bg-white/90"
              }`}
          >
            {selectedVisited ? "Убрать отметку" : "Я был здесь"}
          </button>

          <button
            onClick={resetMap}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/15"
          >
            <RotateCcw size={16} />
            Сбросить карту
          </button>
        </aside>
      </div>
    </main>
  );
}