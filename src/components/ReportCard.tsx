import type { ReactNode } from "react";
import type { CheckResult, VehicleReport } from "@/types/vehicle";

interface ReportCardProps {
  report: VehicleReport;
}

const NA = "Not Available";

function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-black/20 p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}

function Status({ check, clearText }: { check: CheckResult; clearText: string }) {
  if (check.status === "NOT_AVAILABLE") {
    return <p>No record found</p>;
  }
  const clear = check.status === "CLEAR";
  return (
    <>
      <p className={`font-semibold ${clear ? "text-ok" : "text-warn"}`}>
        {clear ? "✓ CLEAR" : "WARNING"}
      </p>
      <p className="mt-1">{check.detail ?? (clear ? clearText : NA)}</p>
      <p className="mt-1 text-black/60">Date Checked: {check.checkedOn ?? NA}</p>
    </>
  );
}

function rand(value: number | null): string {
  return value === null ? NA : `R${value.toLocaleString("en-ZA")}`;
}

export default function ReportCard({ report }: ReportCardProps) {
  const v = report.vehicle;
  const rows: [string, string][] = [
    ["Make", v.make],
    ["Model", v.model],
    ["Year", String(v.year)],
    ["Colour", v.colour ?? NA],
    ["Engine", v.engine],
    ["VIN", v.vin],
    ["Plate", v.plate ?? NA],
    ["Registration Date", v.registrationDate ?? NA],
  ];

  const score = report.score;

  return (
    <section aria-label="Full report" className="space-y-4">
      {report.isExample && (
        <p className="rounded-lg border border-warn p-3 text-sm font-semibold text-warn">
          EXAMPLE - demo data only. This is not a real vehicle check.
        </p>
      )}

      <Box title="Car Details">
        <dl className="grid grid-cols-2 gap-y-1">
          {rows.map(([k, val]) => (
            <div key={k} className="contents">
              <dt className="text-black/60">{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
      </Box>

      <Box title="Stolen Check">
        <Status check={report.stolen} clearText="No stolen record found" />
      </Box>

      <Box title="Finance Check">
        <Status check={report.finance} clearText="No finance record found" />
      </Box>

      <Box title="Accident / Write-off">
        <Status check={report.accident} clearText="No accident or write-off record found" />
      </Box>

      <Box title="Mileage History">
        {report.mileage.length === 0 ? (
          <p>No record found</p>
        ) : (
          <ul className="space-y-1">
            {report.mileage.map((m) => (
              <li key={m.date}>
                {m.date} - {m.km.toLocaleString("en-ZA")} km
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box title="Service History">
        {report.service.length === 0 ? (
          <p>No record found</p>
        ) : (
          <ul className="space-y-1">
            {report.service.map((s) => (
              <li key={`${s.date}-${s.description}`}>
                {s.date} - {s.description}
                {s.km !== null && ` (${s.km.toLocaleString("en-ZA")} km)`}
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box title="Import History">
        <p>{report.imported === null ? NA : report.imported ? "Yes" : "No"}</p>
      </Box>

      <Box title="Valuation">
        <p>Retail Value: {rand(report.valuation.retail)}</p>
        <p>Trade Value: {rand(report.valuation.trade)}</p>
      </Box>

      <Box title="Overall Score">
        {score === null ? (
          <p>{NA}</p>
        ) : (
          <p className={`text-lg font-semibold ${score >= 70 ? "text-ok" : "text-warn"}`}>
            {score}/100 - {score >= 70 ? "CLEAR" : "WARNING"}
          </p>
        )}
      </Box>

      <div className="space-y-1 text-xs text-black/60">
        <p>Source: {report.source}</p>
        <p>Date Checked: {report.dateChecked}</p>
        <p>
          Images are for illustration based on Make/Model/Year. This is not a photo of the
          specific vehicle. This report shows records found. &apos;No record found&apos; does not
          guarantee a clean vehicle.
        </p>
      </div>
    </section>
  );
}
