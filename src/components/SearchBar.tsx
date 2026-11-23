"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isPlausiblePlate, isValidVIN, normaliseIdentifier } from "@/lib/vin";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const id = normaliseIdentifier(value);
    if (isValidVIN(id) || isPlausiblePlate(id)) {
      setError(null);
      router.push(`/check/${encodeURIComponent(id)}`);
      return;
    }
    setError("Invalid VIN - must be 17 characters");
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <label htmlFor="vin" className="sr-only">
        VIN or number plate
      </label>
      <input
        id="vin"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter VIN (17 digits) or Number Plate"
        autoComplete="off"
        className="w-full rounded-lg border border-black/30 px-4 py-4 text-lg outline-none focus:border-black"
      />
      {error !== null && (
        <p role="alert" className="mt-2 text-sm text-warn">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="mt-3 w-full rounded-lg bg-ok px-4 py-4 text-lg font-semibold text-white"
      >
        Check Now
      </button>
    </form>
  );
}
