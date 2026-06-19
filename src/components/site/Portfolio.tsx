import { ShutterImage } from "./ShutterImage";
import elmina1 from "@/assets/elmina-1.jpg";
import elmina2 from "@/assets/elmina-2.jpg";
import bukit1 from "@/assets/bukit-raja-1.jpg";
import bukit2 from "@/assets/bukit-raja-2.jpg";
import myra1 from "@/assets/myra-1.jpg";
import myra2 from "@/assets/myra-2.jpg";
import wow from "@/assets/wow-cafe.jpg";
import pintea from "@/assets/pintea.jpg";
import sushi from "@/assets/sushi.jpg";

interface Project {
  client: string;
  title: string;
  discipline: string;
  images: { src: string; alt: string; aspect: string }[];
}

const projects: Project[] = [
  {
    client: "Sime Darby Property",
    title: "Elmina Lakeside Mall & Sales Gallery",
    discipline: "Aerial · Architecture · Interior",
    images: [
      { src: elmina1, alt: "Elmina Lakeside Mall aerial at dusk", aspect: "aspect-[4/5]" },
      { src: elmina2, alt: "Sales gallery interior", aspect: "aspect-[4/3]" },
    ],
  },
  {
    client: "Sime Darby Property",
    title: "Bukit Raja",
    discipline: "Aerial · Property",
    images: [
      { src: bukit1, alt: "Bukit Raja township aerial", aspect: "aspect-square" },
      { src: bukit2, alt: "Bukit Raja show home twilight", aspect: "aspect-[4/5]" },
    ],
  },
  {
    client: "Myra",
    title: "Myra Gardens",
    discipline: "Landscape · Property",
    images: [
      { src: myra1, alt: "Myra Gardens lush canopy aerial", aspect: "aspect-[4/3]" },
      { src: myra2, alt: "Myra Gardens pool twilight", aspect: "aspect-[4/5]" },
    ],
  },
  {
    client: "Commercial & Still Life",
    title: "WOW Cafe · Pintea · Sushi",
    discipline: "Still Life · Commercial",
    images: [
      { src: wow, alt: "WOW Cafe latte interior", aspect: "aspect-square" },
      { src: pintea, alt: "Pintea macarons and tea", aspect: "aspect-[4/5]" },
      { src: sushi, alt: "Sushi platter on slate", aspect: "aspect-[4/3]" },
    ],
  },
];

export function Portfolio() {
  return (
    <section id="work" className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              Selected Work · 2019 — 2026
            </span>
            <h2 className="mt-4 font-display text-4xl font-light text-white md:text-6xl">
              Frames that sell <br className="hidden md:block" />
              the <span className="text-primary italic">place</span>, not the pixel.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            A curated selection of recent commissions for Malaysia's leading
            developers and hospitality brands.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <article key={p.title} className="grid grid-cols-12 gap-4 md:gap-6">
              {/* Caption rail */}
              <header className="col-span-12 md:col-span-3 md:pt-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-primary">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-light leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{p.client}</p>
                <div className="mt-4 h-px w-12 bg-primary/60" />
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">
                  {p.discipline}
                </p>
              </header>

              {/* Image grid */}
              <div
                className={`col-span-12 grid gap-4 md:col-span-9 md:gap-6 ${
                  p.images.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}
              >
                {p.images.map((img) => (
                  <figure
                    key={img.src}
                    className={`group relative overflow-hidden bg-card ${img.aspect}`}
                  >
                    <ShutterImage
                      src={img.src}
                      alt={img.alt}
                      className="tile h-full w-full object-cover"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 text-xs uppercase tracking-[0.2em] text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}