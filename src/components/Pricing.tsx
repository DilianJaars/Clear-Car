interface Plan {
  name: string;
  price: string;
  detail: string;
}

const PLANS: Plan[] = [
  { name: "One-Time", price: "R99", detail: "1 check" },
  { name: "Smart Buyer", price: "R49/month", detail: "3 checks/month" },
  { name: "Hustler", price: "R199/month", detail: "15 checks/month" },
  { name: "Dealership Pro", price: "R499/month", detail: "50 checks/month" },
];

export default function Pricing() {
  return (
    <section aria-labelledby="pricing" className="mt-16">
      <h2 id="pricing" className="text-2xl font-semibold">
        Pricing
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div key={plan.name} className="rounded-lg border border-black/20 p-5">
            <h3 className="font-semibold">{plan.name}</h3>
            <p className="mt-2 text-2xl font-semibold">{plan.price}</p>
            <p className="mt-1 text-black/70">{plan.detail}</p>
            {/* TODO: wire to Yoco / Paystack checkout for this plan. */}
            <button
              type="button"
              className="mt-4 w-full rounded-lg bg-ok px-4 py-3 font-semibold text-white"
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
