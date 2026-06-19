const services = ["Aerial", "Landscape", "Architecture", "Property", "Still Life"];

export function Services() {
  return (
    <section id="services" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mint-divider" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-5 md:py-16">
          {services.map((s, i) => (
            <div
              key={s}
              className="fade-up flex flex-col items-center gap-3 text-center"
              style={{ animationDelay: `${i * 80}ms` }}
              ref={useInView}
            >
              <span className="font-display text-xs text-primary">0{i + 1}</span>
              <h3 className="font-display text-xl font-light tracking-[0.15em] text-white md:text-2xl">
                {s.toUpperCase()}
              </h3>
            </div>
          ))}
        </div>
        <div className="mint-divider" />
      </div>
    </section>
  );
}

// Lightweight intersection observer ref-callback
function useInView(node: HTMLElement | null) {
  if (!node) return;
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        node.classList.add("in-view");
        obs.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  obs.observe(node);
}