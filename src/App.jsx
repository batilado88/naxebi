import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, RotateCcw, Check, Sparkles, Lock } from "lucide-react";
import { REGIONS } from "./data/regions";

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

  function toggleRegion(id) {
    setSelectedId(id);
    setVisited((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function resetMap() {
    setVisited([]);
    setSelectedId("tbilisi");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/70">
              <Sparkles size={16} />
              Virtual scratch map of Georgia
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Naxebi</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/65">
              Отмечай места в Грузии, где уже был. Открывай регионы, собирай прогресс и превращай карту в личную коллекцию поездок.
            </p>
          </div>

          <div className="min-w-64 rounded-3xl border border-white/10 bg-black/30 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-white/60">
              <span>Открыто</span>
              <span>{visited.length}/{REGIONS.length}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              />
            </div>
            <div className="mt-3 text-3xl font-black">{progress}%</div>
          </div>
        </header>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Карта регионов</h2>
                <p className="text-sm text-white/50">Пока это прототип-сетка. Следующий шаг — настоящая форма карты Грузии.</p>
              </div>
              <button
                onClick={resetMap}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15"
              >
                <RotateCcw size={16} />
                Сбросить
              </button>
            </div>

            <div className="grid min-h-[560px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {REGIONS.map((region, index) => {
                const isVisited = visited.includes(region.id);
                const isSelected = selectedId === region.id;

                return (
                  <motion.button
                    key={region.id}
                    onClick={() => toggleRegion(region.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                    className={`group relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition ${isSelected ? "border-white/50" : "border-white/10"
                      } ${isVisited ? "bg-white/10" : "bg-neutral-900"}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${region.accent} transition duration-500 ${isVisited ? "opacity-90" : "opacity-0"}`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_35%)] opacity-70" />
                    {!isVisited && (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.04)_35%,rgba(0,0,0,0.25)_100%)]" />
                    )}

                    <div className="relative flex h-full min-h-32 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-3xl">{region.emoji}</span>
                        <span className={`rounded-full p-2 ${isVisited ? "bg-black/20" : "bg-white/10"}`}>
                          {isVisited ? <Check size={16} /> : <Lock size={16} />}
                        </span>
                      </div>
                      <div>
                        <div className="font-black leading-tight">{region.nameRu}</div>
                        <div className="mt-1 text-xs text-white/65">{region.name}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <div className="mb-6 flex items-center gap-3">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${selected.accent} text-2xl shadow-lg`}>
                {selected.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-black">{selected.nameRu}</h2>
                <p className="text-sm text-white/50">{selected.name}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm text-white/55">
                <MapPin size={16} />
                Статус региона
              </div>
              <div className="text-3xl font-black">
                {selectedVisited ? "Открыт" : "Закрыт"}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/55">
                {selectedVisited
                  ? "Этот регион уже добавлен в твою карту. Позже сюда можно будет прикрепить дату, фото и заметку."
                  : "Нажми на регион на карте, чтобы отметить его как посещённый и стереть защитный слой."}
              </p>
            </div>

            <button
              onClick={() => toggleRegion(selected.id)}
              className={`mt-5 w-full rounded-2xl px-5 py-4 font-black transition ${selectedVisited
                  ? "bg-white/10 text-white/80 hover:bg-white/15"
                  : "bg-white text-black hover:bg-white/90"
                }`}
            >
              {selectedVisited ? "Убрать отметку" : "Я был здесь"}
            </button>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/35">Открытые регионы</h3>
              <div className="flex flex-wrap gap-2">
                {visited.length === 0 ? (
                  <span className="text-sm text-white/45">Пока ничего не открыто</span>
                ) : (
                  REGIONS.filter((region) => visited.includes(region.id)).map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedId(region.id)}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/15"
                    >
                      {region.emoji} {region.nameRu}
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
