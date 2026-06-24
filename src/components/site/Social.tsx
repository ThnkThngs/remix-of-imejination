export function Social() {
  return (
    <section id="social" className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mint-divider" />
        <div className="grid grid-cols-12 gap-8 pt-16 md:pt-20">
          <div className="col-span-12 md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              Social
            </span>
            <h2 className="mt-4 font-display text-4xl font-light text-white md:text-5xl">
              Latest from the <span className="italic text-primary">field</span>.
            </h2>
          </div>
          <p className="col-span-12 self-end text-sm leading-relaxed text-white/60 md:col-span-6 md:col-start-7">
            Behind-the-scenes frames, recent shoots, and small moments between
            the big ones — straight from our social feeds.
          </p>
        </div>
        <div className="mt-12 overflow-hidden border border-white/10 bg-black md:mt-16">
          <iframe
            src="https://widget.taggbox.com/328738?website=1"
            allow="fullscreen"
            title="Imejination social feed"
            className="block h-[720px] w-full border-0"
          />
        </div>
        <div className="mint-divider mt-20" />
      </div>
    </section>
  );
}