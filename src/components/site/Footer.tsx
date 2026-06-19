import logoAsset from "@/assets/imejination-logo.png.asset.json";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              Let's Make Something
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-[0.95] text-white md:text-7xl lg:text-8xl">
              Ready to <span className="italic text-primary">expose</span><br />
              your next project?
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:askimeji@gmail.com?subject=New%20Project%20Enquiry"
                className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-black transition-all hover:bg-primary/90"
              >
                Get a Quote
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-3 border border-white/15 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors hover:border-primary hover:text-primary"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:pl-12">
            <div className="space-y-8 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Studio
                </p>
                <p className="mt-2 text-white">IMEJINATION SDN BHD</p>
                <p className="text-white/50">Kuala Lumpur, Malaysia</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Enquiries
                </p>
                <a
                  href="mailto:askimeji@gmail.com"
                  className="mt-2 inline-block text-white transition-colors hover:text-primary"
                >
                  askimeji@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Disciplines
                </p>
                <p className="mt-2 text-white/70">
                  Aerial · Landscape · Architecture · Property · Still Life
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mint-divider mt-20" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <img src={logoAsset.url} alt="Imejination" className="h-7 w-auto opacity-80" />
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Imejination Sdn Bhd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}