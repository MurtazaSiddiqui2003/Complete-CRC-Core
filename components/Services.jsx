import { getServices } from "../lib/data";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm text-glow mb-3">What We Build</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete <span className="grad">Growth System</span>
          </h2>
          <p className="text-textSub">
            Marketing. Operations. Sourcing. All working together — not separately. One system,
            built to scale.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-textMuted">
            No services added yet. Add some from the admin panel.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s._id}
                id={`service-${i}`}
                className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors"
              >
                <p className="font-orbitron text-glow text-sm mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold mb-3">{s.title}</h3>
                <ul className="space-y-1.5">
                  {(s.items || []).map((item) => (
                    <li key={item} className="text-sm text-textSub flex gap-2">
                      <span className="text-accentLight">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
