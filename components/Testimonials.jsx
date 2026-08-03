import { getTestimonials } from "../lib/data";

// This section didn't exist on the old site -- it's new, since you asked
// for testimonials to be manageable from the admin panel. It stays
// hidden until your boss adds the first one, so an empty section never
// shows to visitors.
export default async function Testimonials() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm text-glow mb-3">What Clients Say</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Real Results, <span className="grad">Real Words</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-textSub mb-5">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold text-sm">{t.name}</p>
              {t.role && <p className="text-xs text-textMuted">{t.role}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
