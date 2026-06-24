import { ShutterImage } from "./ShutterImage";
import nick from "@/assets/director-nicholas.jpg";
import moses from "@/assets/director-moses.jpg";

const team = [
  {
    name: "Nicholas Chen",
    role: "Managing Director",
    phone: "+60 12-920 0789",
    tel: "+60129200789",
    img: nick,
    bio: "Leads creative direction and oversees every commission — from drone choreography to final colour grade. A decade behind the lens for Malaysia's most ambitious property developers.",
  },
  {
    name: "Moses Lim",
    role: "Executive Director",
    phone: "+60 18-394 0060",
    tel: "+60183940060",
    img: moses,
    bio: "Heads operations and client strategy. Translates each developer's vision into production-ready briefs that move on time, on budget, and beyond expectation.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              The Studio
            </span>
            <h2 className="mt-4 font-display text-4xl font-light text-white md:text-5xl">
              Two directors. <br />
              One <span className="text-primary italic">obsession</span> with light.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Imejination Sdn Bhd — trading as imeji Studio (Moseslim Photography) —
              is a Kuala Lumpur–based photography and video production studio
              specialising in property, architecture and commercial imagery. We work
              where the drone, the tripod and the food stylist all matter.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">
              1.5K+ followers · 98% recommend on Facebook
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-8 md:grid-cols-2 md:gap-8">
            {team.map((m) => (
              <article
                key={m.name}
                className="group relative overflow-hidden bg-black"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <ShutterImage
                    src={m.img}
                    alt={`Portrait of ${m.name}`}
                    className="tile h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl font-light text-white">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-primary">
                    {m.role}
                  </p>
                  <div className="my-4 h-px w-10 bg-primary/40" />
                  <p className="text-sm leading-relaxed text-white/60">{m.bio}</p>
                  <a
                    href={`tel:${m.tel}`}
                    className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-primary"
                  >
                    {m.phone} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}