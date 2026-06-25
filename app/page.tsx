const navItems = [
  { label: "Home", href: "#home" },
  { label: "Property & Architecture", href: "#property" },
  { label: "Food & Beverage", href: "#food" },
  { label: "Live Events & Portraits", href: "#events" },
  { label: "Work With Us", href: "#contact" },
  { label: "Admin", href: "/admin" },
];

const propertyHighlights = [
  {
    title: "Aerial & Landscape",
    copy: "Drone perspectives for master-planned communities, township scale, natural landscapes, and commercial context.",
  },
  {
    title: "Architecture Exterior",
    copy: "Dusk, night-lighting, bridges, malls, and exterior forms captured with cinematic atmosphere and clean detail.",
  },
  {
    title: "Interior Staging",
    copy: "Modern living rooms, luxury bedrooms, bathrooms, and sales galleries photographed with pristine lighting.",
  },
];

const foodHighlights = [
  {
    title: "Dynamic Product Shoots",
    copy: "Ingredients in motion, specialty drinks, fruit teas, and campaign-ready product moments.",
  },
  {
    title: "Commercial Styling",
    copy: "Styled flat lays for pizzas, salads, Korean dishes, sushi platters, and branded culinary menus.",
  },
  {
    title: "Lifestyle Integration",
    copy: "Customer interaction, models at counters, and branded moments that connect appetite to identity.",
  },
];

const eventHighlights = [
  "Concert crowds",
  "Corporate event coverage",
  "Professional portraiture",
];

const facebookUrl = "https://www.facebook.com/imejination.my/";
const mapsUrl = "https://maps.app.goo.gl/qKWApokoSCWkyReh6";

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Main navigation">
        <a className="brand-link" href="#home" aria-label="Imejination home">
          <img
            src="/brand/imejination-full.png"
            alt="Imejination"
            className="brand-mark"
          />
        </a>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="home" aria-label="Imejination hero">
        <img
          src="/portfolio/bridge-dusk.jpg"
          alt="Glowing over-water bridge photographed at dusk"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>See beyond the blueprint.</h1>
          <p className="hero-copy">
            Elevating properties with stunning aerial and ground perspectives.
          </p>
          <a className="primary-button" href="#property">
            Explore Our Commercial Services
          </a>
        </div>
      </section>

      <section className="intro-band" aria-label="Service portals introduction">
        <div>
          <p className="eyebrow dark">Service portals</p>
          <h2>Built for business visuals that need to sell the feeling.</h2>
        </div>
        <p>
          From township launches and architectural portfolios to campaign-ready
          culinary content, Imejination shapes visuals around the buyer,
          operator, and audience each project needs to reach.
        </p>
      </section>

      <section className="portal portal-property" id="property">
        <div className="portal-copy">
          <p className="service-index">01</p>
          <p className="eyebrow dark">Property & Architecture</p>
          <h2>Scale, atmosphere, and detail for built environments.</h2>
          <p className="audience">
            For real estate developers, architects, and interior designers.
          </p>
          <p>
            We specialize in capturing the true scale, atmosphere, and detail
            of commercial and residential developments, from expansive aerial
            context to the quiet precision of staged interiors.
          </p>
          <div className="highlight-list">
            {propertyHighlights.map((item) => (
              <article key={item.title} className="highlight-item">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="media-grid property-grid" aria-label="Property samples">
          <img
            src="/portfolio/property-masterplan.jpg"
            alt="Aerial view of a master-planned property development"
            className="wide"
          />
          <img
            src="/portfolio/architecture-dusk.jpg"
            alt="Dusk architecture and illuminated bridge photography"
          />
          <img
            src="/portfolio/interior-bedroom.jpg"
            alt="Luxury bedroom interior photography"
          />
          <img
            src="/portfolio/interior-gallery.jpg"
            alt="Interior and sales gallery photography collage"
            className="wide"
          />
        </div>
      </section>

      <section className="portal portal-food" id="food">
        <div className="portal-copy">
          <p className="service-index">02</p>
          <p className="eyebrow dark">Food & Beverage</p>
          <h2>High-impact culinary visuals for appetite and brand identity.</h2>
          <p className="audience">
            For restaurant owners, cafe franchises, and FMCG brands.
          </p>
          <p>
            We create styled, energetic, campaign-ready visuals that make a menu
            feel immediate, tactile, and unmistakably branded.
          </p>
          <div className="highlight-list">
            {foodHighlights.map((item) => (
              <article key={item.title} className="highlight-item">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="media-grid food-grid" aria-label="Food and beverage samples">
          <img
            src="/portfolio/fnb-drinks.jpg"
            alt="Styled beverage product shoot collage"
          />
          <img
            src="/portfolio/fnb-food.jpg"
            alt="Styled food flat lays and plated dishes"
            className="wide"
          />
          <img
            src="/portfolio/fnb-lifestyle.jpg"
            alt="Food and beverage lifestyle shoot with model interaction"
          />
        </div>
      </section>

      <section className="portal portal-events" id="events">
        <div className="portal-copy">
          <p className="service-index">03</p>
          <p className="eyebrow dark">Live Events & Portraits</p>
          <h2>Live moments, corporate presence, and the people behind them.</h2>
          <p className="audience">
            For corporate event planners, concert promoters, and PR agencies.
          </p>
          <p>
            Our concert, event, and portrait divisions document the moments that
            define a launch, performance, gathering, or leadership story.
          </p>
        </div>
        <div className="reserved-gallery" aria-label="Live events gallery space">
          <div className="reserved-image">
            <img
              src="/portfolio/bridge-dusk.jpg"
              alt="Atmospheric dusk city bridge photography"
            />
          </div>
          <div className="reserved-panel">
            <p className="eyebrow">Gallery space reserved</p>
            <ul>
              {eventHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-brand">
          <img src="/brand/cloud-nation-horizontal.png" alt="Cloud Nation" />
        </div>
        <div className="footer-copy">
          <p className="eyebrow">Work with us</p>
          <h2>Ready to elevate your visual identity?</h2>
          <p>
            Get in touch directly with our leadership team to discuss your next
            commercial project, B2B contract, or event coverage.
          </p>
        </div>
        <div className="contact-grid">
          <a href="tel:+60183940060" className="contact-card">
            <span>Moses Lim</span>
            <strong>Executive Director</strong>
            <span>018-3940060</span>
          </a>
          <a href="tel:+60129200789" className="contact-card">
            <span>Nicholas Chen</span>
            <strong>Managing Director</strong>
            <span>012-9200789</span>
          </a>
        </div>
        <div className="visit-grid">
          <a href={mapsUrl} className="visit-card" target="_blank" rel="noreferrer">
            <span>Visit the studio</span>
            <strong>Imejination Sdn Bhd</strong>
            <small>Google Maps: 3.1281811, 101.7544636</small>
          </a>
          <a
            href={facebookUrl}
            className="visit-card"
            target="_blank"
            rel="noreferrer"
          >
            <span>Follow our work</span>
            <strong>Facebook</strong>
            <small>facebook.com/imejination.my</small>
          </a>
        </div>
      </footer>
    </main>
  );
}
