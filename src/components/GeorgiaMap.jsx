import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoData from "../data/georgia-regions.json";

function normalizeRegionName(name = "") {
    const value = name.toLowerCase();

    if (value.includes("tbilisi")) return "tbilisi";
    if (value.includes("adjara") || value.includes("ajaria")) {
        return "adjara";
    }
    if (value.includes("guria")) return "guria";
    if (value.includes("imereti")) return "imereti";
    if (value.includes("kakheti")) return "kakheti";
    if (value.includes("mtskheta")) return "mtskheta";
    if (value.includes("racha")) return "racha";
    if (value.includes("samegrelo") || value.includes("svaneti")) return "samegrelo";
    if (value.includes("samtskhe")) return "samtskhe";
    if (value.includes("shida")) return "shida";
    if (value.includes("kvemo")) return "kvemo";
    if (value.includes("abkhazia") || value.includes("abkhazeti")) return "abkhazia";

    return null;
}

export default function GeorgiaMap({ regions, visited, selectedId, onRegionClick }) {
    return (
        <div className="relative min-h-[560px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-neutral-950 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_45%)]" />

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    center: [43.5, 42.1],
                    scale: 5200,
                }}
                width={900}
                height={560}
                className="relative z-10 h-full w-full"
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
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
                                            fill: isVisited ? "#ffffff" : "#27272a",
                                            stroke: isSelected ? "#ffffff" : "#52525b",
                                            strokeWidth: isSelected ? 2.4 : 1,
                                            outline: "none",
                                            cursor: regionId ? "pointer" : "default",
                                        },
                                        hover: {
                                            fill: isVisited ? "#f5f5f5" : "#3f3f46",
                                            stroke: "#ffffff",
                                            strokeWidth: 2,
                                            outline: "none",
                                            cursor: regionId ? "pointer" : "default",
                                        },
                                        pressed: {
                                            fill: "#ffffff",
                                            stroke: "#ffffff",
                                            strokeWidth: 2,
                                            outline: "none",
                                        },
                                    }}
                                >
                                    <title>{region?.nameRu || rawName}</title>
                                </Geography>
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}