import { Sparkles } from "lucide-react";

export default function MapHeader() {
  return (
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
  );
}