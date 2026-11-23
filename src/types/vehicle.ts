export type CheckStatus = "CLEAR" | "WARNING" | "NOT_AVAILABLE";

export type BodyType = "Hatchback" | "Sedan" | "Bakkie" | "SUV";

export interface Vehicle {
  vin: string;
  plate: string | null;
  make: string;
  model: string;
  year: number;
  colour: string | null;
  engine: string;
  bodyType: BodyType | null;
  tyreSize: string | null;
  registrationDate: string | null;
}

export interface CheckResult {
  status: CheckStatus;
  /** ISO date the check was run, or null if no check was run. */
  checkedOn: string | null;
  /** Extra detail, e.g. the bank name for a finance warning. */
  detail: string | null;
}

export interface MileageRecord {
  date: string;
  km: number;
}

export interface ServiceRecord {
  date: string;
  km: number | null;
  description: string;
}

export interface Valuation {
  retail: number | null;
  trade: number | null;
}

export interface VehicleReport {
  vehicle: Vehicle;
  /** True when the data is demo data and not from a live API. */
  isExample: boolean;
  source: string;
  /** ISO date the report was generated. */
  dateChecked: string;
  stolen: CheckResult;
  finance: CheckResult;
  accident: CheckResult;
  mileage: MileageRecord[];
  service: ServiceRecord[];
  imported: boolean | null;
  valuation: Valuation;
  /** 0-100, or null when there is not enough data to score. */
  score: number | null;
  /** Real photos of the same model. Empty when none are available. */
  images: string[];
}

export type Report = VehicleReport;
