import { useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { feature } from "topojson-client";
import geoData from "../data/georgia-regions.json";
import worldData from "../data/world-countries-50m.json";

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

const CONTEXT_LABELS = [
  { name: "Black Sea", coordinates: [40.0, 42.1], type: "water" },
  { name: "Russia", coordinates: [43.7, 43.45], type: "land" },
  { name: "Turkey", coordinates: [41.4, 41.0], type: "land" },
  { name: "Armenia", coordinates: [44.5, 40.75], type: "land" },
  { name: "Azerbaijan", coordinates: [46.3, 41.25], type: "land" },
];

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
  const worldCountries = useMemo(() => {
    return feature(worldData, worldData.objects.countries);
  }, []);

  return (
    <div className="relative h-[calc(100vh-24px)] min-h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#17202a] p-3 shadow-2xl shadow-black/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(255,255,255,0.11),transparent_42%)]" />

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

          <filter id="mapShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect width="1200" height="760" fill="#17202a" />

        <Geographies geography={worldCountries}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: countryName === "Georgia" ? "#2f343a" : "#25282d",
                      stroke: "#4b5563",
                      strokeWidth: countryName === "Georgia" ? 0.7 : 0.45,
                      outline: "none",
                      pointerEvents: "none",
                    },
                    hover: {
                      fill: countryName === "Georgia" ? "#2f343a" : "#25282d",
                      stroke: "#4b5563",
                      strokeWidth: 0.45,
                      outline: "none",
                      pointerEvents: "none",
                    },
                    pressed: {
                      fill: countryName === "Georgia" ? "#2f343a" : "#25282d",
                      stroke: "#4b5563",
                      strokeWidth: 0.45,
                      outline: "none",
                      pointerEvents: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {CONTEXT_LABELS.map((label) => (
          <Marker key={label.name} coordinates={label.coordinates}>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none select-none"
              style={{
                fill: label.type === "water" ? "rgba(186, 230, 253, 0.38)" : "rgba(244, 244, 245, 0.25)",
                fontSize: label.type === "water" ? 18 : 13,
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                paintOrder: "stroke",
                stroke: "#17202a",
                strokeWidth: 5,
                strokeLinejoin: "round",
              }}
            >
              {label.name}
            </text>
          </Marker>
        ))}

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
                        filter: isSelected ? "url(#softGlow)" : "url(#mapShadow)",
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

                if (!coordinates) return null;

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
                        opacity: visited.includes(region.id) ? 0.72 : 1,
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