import type { CheckResult, VehicleReport } from "@/types/vehicle";
import { normaliseIdentifier } from "@/lib/vin";

export class VehicleNotFoundError extends Error {
  constructor(identifier: string) {
    super(`No record found for ${identifier}`);
    this.name = "VehicleNotFoundError";
  }
}

const EXAMPLE_VIN = "WBA12345678901234";

const notAvailable: CheckResult = {
  status: "NOT_AVAILABLE",
  checkedOn: null,
  detail: null,
};

/**
 * TODO: Connect to the VerifyNow API.
 *  - Decode the VIN / plate, run stolen, finance, accident, mileage,
 *    service, import and valuation checks.
 *  - Map the response to VehicleReport. Never fill gaps with guessed data.
 *  - Never return owner name, ID number or address (POPIA).
 *  - Provide real model photos in `images` (front, front-side, side,
 *    back-side, back, top, interior front, interior back).
 *
 * For now only the EXAMPLE VIN returns data; everything else throws.
 */
export async function getVehicleReport(vin: string): Promise<VehicleReport> {
  const id = normaliseIdentifier(vin);

  if (id !== EXAMPLE_VIN) {
    throw new VehicleNotFoundError(id);
  }

  return {
    vehicle: {
      vin: EXAMPLE_VIN,
      plate: null,
      make: "BMW",
      model: "320i",
      year: 2018,
      colour: null,
      engine: "2.0 Petrol",
      bodyType: null,
      tyreSize: null,
      registrationDate: null,
    },
    isExample: true,
    source: "VerifyNow / SAIA",
    dateChecked: new Date().toISOString().slice(0, 10),
    stolen: notAvailable,
    finance: notAvailable,
    accident: notAvailable,
    mileage: [],
    service: [],
    imported: null,
    valuation: { retail: null, trade: null },
    score: null,
    images: [],
  };
}
