import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { REGIONS } from "./data/regions";
import GeorgiaMap from "./components/GeorgiaMap";
import LayerControls from "./components/LayerControls";
import RegionPanel from "./components/RegionPanel";

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

  const [showCities, setShowCities] = useState(true);
  const [showRegionLabels, setShowRegionLabels] = useState(true);

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
          showCities={showCities}
          showRegionLabels={showRegionLabels}
        />

        <header className="pointer-events-none absolute left-5 top-5 z-20 flex max-w-xs flex-col gap-3 sm:left-7 sm:top-7">
          <div className="pointer-events-auto rounded-[1.4rem] border border-white/10 bg-black/45 p-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles size={14} />
              Virtual scratch map of Georgia
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Naxebi
            </h1>

          </div>
        </header>

        <div className="absolute right-5 top-5 z-20 w-[210px] rounded-[1.4rem] border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:right-7 sm:top-7">
          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
            <span>Открыто</span>
            <span>
              {visited.length}/{REGIONS.length}
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

        <LayerControls
          showCities={showCities}
          showRegionLabels={showRegionLabels}
          onToggleCities={() => setShowCities((value) => !value)}
          onToggleRegionLabels={() => setShowRegionLabels((value) => !value)}
        />

        <RegionPanel
          selected={selected}
          selectedVisited={selectedVisited}
          onToggleRegion={() => toggleRegion(selected.id)}
          onResetMap={resetMap}
        />

      </div>
    </main>
  );
}