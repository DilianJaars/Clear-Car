"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { BodyType } from "@/types/vehicle";

export interface Hotspot {
  id: string;
  label: string;
  /** Real value from the VIN decode, or null if not available. */
  value: string | null;
  /** Position in % of the image box. */
  x: number;
  y: number;
}

interface Car360ViewerProps {
  make: string;
  model: string;
  year: number;
  colour: string;
  images: string[];
  bodyType?: BodyType | null;
  hotspots?: Hotspot[];
}

/** Image order expected in `images`. */
const VIEW_LABELS: string[] = [
  "Front",
  "Front-side",
  "Side",
  "Back-side",
  "Back",
  "Top",
  "Interior front",
  "Interior back",
];
const EXTERIOR_COUNT = 6;
const SIDE_INDEX = 2;
const PX_PER_STEP = 30;

const BUTTONS: { label: string; index: number }[] = [
  { label: "Front", index: 0 },
  { label: "Side", index: 2 },
  { label: "Back", index: 4 },
  { label: "Top", index: 5 },
  { label: "Interior", index: 6 },
];

function Silhouette({ bodyType }: { bodyType: BodyType | null | undefined }) {
  const body: string =
    bodyType === "Hatchback"
      ? "M30 112 L38 92 L100 86 L140 56 L290 56 L335 92 L372 98 L376 112 Z"
      : bodyType === "Bakkie"
        ? "M24 112 L30 90 L120 86 L150 52 L230 52 L245 86 L376 88 L378 112 Z"
        : bodyType === "SUV"
          ? "M26 112 L32 88 L80 82 L110 48 L310 48 L350 84 L376 92 L378 112 Z"
          : "M30 112 L40 92 L110 86 L150 56 L255 56 L305 88 L368 94 L376 112 Z";
  return (
    <svg viewBox="0 0 400 150" className="h-full w-full" role="img" aria-label="Car outline">
      <path d={body} fill="#e5e5e5" stroke="#000" strokeWidth="2" />
      <circle cx="105" cy="115" r="22" fill="#fff" stroke="#000" strokeWidth="3" />
      <circle cx="298" cy="115" r="22" fill="#fff" stroke="#000" strokeWidth="3" />
    </svg>
  );
}

export default function Car360Viewer({
  make,
  model,
  year,
  colour,
  images,
  bodyType,
  hotspots = [],
}: Car360ViewerProps) {
  const hasImages = images.length > 0;
  const [index, setIndex] = useState<number>(SIDE_INDEX);
  const [openHotspot, setOpenHotspot] = useState<string | null>(null);
  const drag = useRef<{ startX: number; startIndex: number } | null>(null);

  function onDown(e: PointerEvent<HTMLDivElement>): void {
    if (!hasImages) return;
    drag.current = { startX: e.clientX, startIndex: index };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onMove(e: PointerEvent<HTMLDivElement>): void {
    const d = drag.current;
    if (d === null || !hasImages) return;
    const steps = Math.round((e.clientX - d.startX) / PX_PER_STEP);
    const count = Math.min(EXTERIOR_COUNT, images.length);
    const next = (((d.startIndex - steps) % count) + count) % count;
    setIndex(next);
  }

  function onUp(): void {
    drag.current = null;
  }

  const showHotspots = !hasImages || index === SIDE_INDEX;
  const active = hotspots.find((h) => h.id === openHotspot) ?? null;

  return (
    <section aria-label="Car viewer" className="rounded-lg border border-black/20 p-4">
      <h2 className="font-semibold">
        {year} {make} {model} {colour !== "" && `· ${colour}`}
      </h2>

      <div
        className="relative mt-3 aspect-[8/3] w-full select-none touch-pan-y bg-white"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[index] ?? images[0]}
            alt={`${make} ${model} - ${VIEW_LABELS[index] ?? "view"}`}
            draggable={false}
            className="h-full w-full object-contain"
          />
        ) : (
          <Silhouette bodyType={bodyType} />
        )}

        {showHotspots &&
          hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              onClick={() => setOpenHotspot(openHotspot === h.id ? null : h.id)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ok"
            />
          ))}
      </div>

      {active !== null && (
        <p className="mt-2 rounded-lg border border-black/20 p-3 text-sm">
          <strong>{active.label}:</strong> {active.value ?? "Not Available"}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {BUTTONS.map((b) => (
          <button
            key={b.label}
            type="button"
            disabled={!hasImages || b.index >= images.length}
            onClick={() => setIndex(b.index)}
            className={`rounded-lg border px-3 py-2 text-sm disabled:opacity-40 ${
              hasImages && index === b.index ? "border-ok text-ok" : "border-black/30"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-black/70">
        {hasImages
          ? "Drag left or right to rotate. Image is for illustration - based on Make/Model/Year."
          : "Image is for illustration - based on Make/Model/Year. 360 images are not available for this vehicle."}
      </p>
    </section>
  );
}
