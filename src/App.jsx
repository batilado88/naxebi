import { useEffect, useMemo, useState } from "react";
import { REGIONS } from "./data/regions";
import GeorgiaMap from "./components/GeorgiaMap";
import LayerControls from "./components/LayerControls";
import RegionPanel from "./components/RegionPanel";
import ProgressCard from "./components/ProgressCard";
import MapHeader from "./components/MapHeader";

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

        <MapHeader />

        <ProgressCard
          visitedCount={visited.length}
          totalCount={REGIONS.length}
          progress={progress}
        />

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