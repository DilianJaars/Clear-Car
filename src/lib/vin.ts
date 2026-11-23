export function isValidVIN(vin: string): boolean {
  return /^[A-Za-z0-9]{17}$/.test(vin.trim());
}

export function isPlausiblePlate(plate: string): boolean {
  return /^[A-Za-z0-9 -]{4,10}$/.test(plate.trim());
}

export function normaliseIdentifier(input: string): string {
  return input.replace(/[\s-]/g, "").toUpperCase();
}
