import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import geoData from "../data/georgia-regions.json";

const REGION_LABEL_COORDS = {
  abkhazia: [41.05, 43.05],
  samegrelo: [42.25, 42.65],
  racha: [43.25, 42.72],
  imereti: [42.9, 42.15],
  guria: [42.05, 41.88],
  adjara: [41.7, 41.62],
  samtskhe: [43.15, 41.6],
  shida: [43.85, 42.05],
  mtskheta: [44.6, 42.35],
  tbilisi: [44.8, 41.72],
  kvemo: [44.9, 41.35],
  kakheti: [45.65, 41.85],
};

function normalizeRegionName(name = "") {
  const value = name.toLowerCase();

  if (value.includes("tbilisi")) return "tbilisi";
  if (value.includes("adjara") || value.includes("ajaria")) return "adjara";
  if (value.includes("guria")) return "guria";
  if (value.includes("imereti")) return "imereti";
  if (value.includes("kakheti")) return "kakheti";
  if (value.includes("mtskheta")) return "mtskheta";
  if (value.includes("racha")) return "racha";
  if (value.includes("samegrelo") || value.includes("svaneti")) return "samegrelo";
  if (value.includes("samtskhe")) return "samtskhe";
  if (value.includes("shida")) return "shida";
  if (value.includes("kvemo")) return "kvemo";
  if (value.includes("abkhazia")) return "abkhazia";

  return null;
}

export default function GeorgiaMap({ regions, visited, selectedId, onRegionClick }) {
  return (
    <div className="relative h-[calc(100vh-24px)] min-h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111113] p-3 shadow-2xl shadow-black/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(255,255,255,0.11),transparent_42%)]" />

      <div className="absolute -left-24 top-0 h-full w-[34%] rounded-r-[45%] bg-sky-500/20 blur-sm" />
      <div className="absolute left-8 top-1/2 -translate-y-1/2 rotate-[-90deg] text-xs font-black uppercase tracking-[0.35em] text-sky-100/35">
        Black Sea
      </div>

      <div className="pointer-events-none absolute left-[18%] top-[8%] text-xs font-bold uppercase tracking-[0.25em] text-white/20">
        Russia
      </div>
      <div className="pointer-events-none absolute left-[9%] bottom-[8%] text-xs font-bold uppercase tracking-[0.25em] text-white/20">
        Turkey
      </div>
      <div className="pointer-events-none absolute right-[31%] bottom-[7%] text-xs font-bold uppercase tracking-[0.25em] text-white/20">
        Armenia
      </div>
      <div className="pointer-events-none absolute right-[8%] bottom-[20%] text-xs font-bold uppercase tracking-[0.25em] text-white/20">
        Azerbaijan
      </div>
      <div className="pointer-events-none absolute left-[38%] top-[15%] text-xs font-bold uppercase tracking-[0.25em] text-white/20">
        Greater Caucasus
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [43.65, 42.05],
          scale: 7200,
        }}
        width={1200}
        height={760}
        className="relative z-10 h-full w-full"
      >
        <defs>
          <pattern
            id="scratchPattern"
            patternUnits="userSpaceOnUse"
            width="18"
            height="18"
            patternTransform="rotate(25)"
          >
            <rect width="18" height="18" fill="#27272a" />
            <path d="M 0 4 L 18 4" stroke="#71717a" strokeWidth="1.2" opacity="0.45" />
            <path d="M 0 11 L 18 11" stroke="#a1a1aa" strokeWidth="0.8" opacity="0.25" />
          </pattern>

          <filter id="softGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.45" />
          </filter>
        </defs>

        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const rawName =
                  geo.properties.name ||
                  geo.properties.NAME_1 ||
                  geo.properties.region ||
                  geo.properties.Region ||
                  "";

                const regionId = normalizeRegionName(rawName);
                const region = regions.find((item) => item.id === regionId);
                const isVisited = regionId && visited.includes(regionId);
                const isSelected = regionId === selectedId;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (regionId) onRegionClick(regionId);
                    }}
                    style={{
                      default: {
                        fill: isVisited ? region?.mapColor || "#ffffff" : "url(#scratchPattern)",
                        stroke: isSelected ? "#ffffff" : "#52525b",
                        strokeWidth: isSelected ? 3.2 : 1,
                        outline: "none",
                        cursor: regionId ? "pointer" : "default",
                        filter: isSelected ? "url(#softGlow)" : "none",
                        transition: "fill 180ms ease, stroke 180ms ease, stroke-width 180ms ease",
                      },
                      hover: {
                        fill: isVisited ? region?.mapColor || "#ffffff" : "#3f3f46",
                        stroke: "#ffffff",
                        strokeWidth: 2.6,
                        outline: "none",
                        cursor: regionId ? "pointer" : "default",
                        filter: "url(#softGlow)",
                      },
                      pressed: {
                        fill: isVisited ? region?.mapColor || "#ffffff" : "#52525b",
                        stroke: "#ffffff",
                        strokeWidth: 3,
                        outline: "none",
                      },
                    }}
                  >
                    <title>{region?.nameRu || rawName}</title>
                  </Geography>
                );
              })}

              {regions.map((region) => {
                const coordinates = REGION_LABEL_COORDS[region.id];
                const isVisited = visited.includes(region.id);

                if (!coordinates || isVisited) return null;

                return (
                  <Marker key={region.id} coordinates={coordinates}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      style={{
                        fill: "#f4f4f5",
                        fontSize: region.id === "tbilisi" ? 12 : 15,
                        fontWeight: 800,
                        letterSpacing: "0.02em",
                        paintOrder: "stroke",
                        stroke: "#18181b",
                        strokeWidth: 4,
                        strokeLinejoin: "round",
                      }}
                    >
                      {region.nameRu}
                    </text>
                  </Marker>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
}