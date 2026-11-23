import SearchBar from "@/components/SearchBar";
import Pricing from "@/components/Pricing";

interface Faq {
  q: string;
  a: string;
}

const CHECKS: { title: string; text: string }[] = [
  { title: "Stolen Check", text: "Is the vehicle reported stolen?" },
  { title: "Finance Check", text: "Is there outstanding finance on it?" },
  { title: "Accident Check", text: "Any accident or write-off record?" },
];

const FAQS: Faq[] = [
  {
    q: "What do I need to run a check?",
    a: "A 17-character VIN or the vehicle's number plate.",
  },
  {
    q: "Does 'No record found' mean the car is clean?",
    a: "No. A report shows the records found. 'No record found' does not guarantee a clean vehicle.",
  },
  {
    q: "Are the car images of the actual vehicle?",
    a: "No. Images are for illustration, based on Make/Model/Year.",
  },
  {
    q: "Do you show the owner's details?",
    a: "No. We never show owner name, ID number or address.",
  },
  {
    q: "How do I pay?",
    a: "Pay once or pick a monthly plan. Card payments are handled by Yoco / Paystack.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <p className="text-2xl font-bold">ClearCar.co.za</p>
        <p className="mt-1 text-black/70">Know before you buy.</p>
      </header>

      <div className="mt-12">
        <SearchBar />
      </div>

      <section className="mt-12 grid gap-4 sm:grid-cols-3" aria-label="Checks">
        {CHECKS.map((c) => (
          <div key={c.title} className="rounded-lg border border-black/20 p-5">
            <h2 className="font-semibold">
              <span className="text-ok">✓</span> {c.title}
            </h2>
            <p className="mt-2 text-sm text-black/70">{c.text}</p>
          </div>
        ))}
      </section>

      <Pricing />

      <section aria-labelledby="faq" className="mt-16">
        <h2 id="faq" className="text-2xl font-semibold">
          FAQ
        </h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-lg border border-black/20 p-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-black/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="mt-16 text-xs text-black/50">© ClearCar.co.za</footer>
    </main>
  );
}
