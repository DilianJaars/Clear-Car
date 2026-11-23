import Link from "next/link";
import ResultView from "@/components/ResultView";
import { getVehicleReport, VehicleNotFoundError } from "@/lib/api";
import { isPlausiblePlate, isValidVIN, normaliseIdentifier } from "@/lib/vin";
import type { VehicleReport } from "@/types/vehicle";

interface PageProps {
  params: Promise<{ vin: string }>;
}

export default async function CheckPage({ params }: PageProps) {
  const { vin } = await params;
  const id = normaliseIdentifier(decodeURIComponent(vin));

  let report: VehicleReport | null = null;
  let message: string | null = null;

  if (!isValidVIN(id) && !isPlausiblePlate(id)) {
    message = "Invalid VIN - must be 17 characters";
  } else {
    try {
      report = await getVehicleReport(id);
    } catch (err: unknown) {
      message =
        err instanceof VehicleNotFoundError
          ? "No record found"
          : "Something went wrong. Please try again.";
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-lg font-bold">
        ClearCar.co.za
      </Link>

      <h1 className="mt-8 text-xl font-semibold">Result for {id}</h1>

      <div className="mt-6">
        {report !== null ? (
          <ResultView report={report} />
        ) : (
          <p role="alert" className="rounded-lg border border-warn p-4 text-warn">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
