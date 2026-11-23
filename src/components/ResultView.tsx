"use client";

import { useState } from "react";
import type { VehicleReport } from "@/types/vehicle";
import Car360Viewer from "@/components/Car360Viewer";
import type { Hotspot } from "@/components/Car360Viewer";
import ReportCard from "@/components/ReportCard";

interface ResultViewProps {
  report: VehicleReport;
}

export default function ResultView({ report }: ResultViewProps) {
  // TODO: replace with a server-verified payment status.
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const v = report.vehicle;

  const hotspots: Hotspot[] = [
    { id: "engine", label: "Engine", value: v.engine, x: 24, y: 48 },
    { id: "wheels", label: "Tyre size", value: v.tyreSize, x: 26, y: 76 },
  ];

  if (!unlocked) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-black/20 p-4">
          <h2 className="font-semibold">
            {v.year} {v.make} {v.model}
          </h2>
          <p className="mt-1 text-sm text-black/70">VIN: {v.vin}</p>
        </div>
        <div className="rounded-lg border border-black/20 p-5">
          <h3 className="font-semibold">Unlock the full report and 360 viewer</h3>
          <p className="mt-1 text-sm text-black/70">One-Time check: R99</p>
          {/* TODO: replace with real Yoco / Paystack checkout. */}
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="mt-4 w-full rounded-lg bg-ok px-4 py-3 font-semibold text-white"
          >
            Pay with Yoco (placeholder)
          </button>
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="mt-2 w-full rounded-lg bg-ok px-4 py-3 font-semibold text-white"
          >
            Pay with Paystack (placeholder)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Car360Viewer
        make={v.make}
        model={v.model}
        year={v.year}
        colour={v.colour ?? ""}
        images={report.images}
        bodyType={v.bodyType}
        hotspots={hotspots}
      />
      <ReportCard report={report} />
    </div>
  );
}
