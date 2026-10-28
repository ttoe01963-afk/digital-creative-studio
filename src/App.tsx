import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
} from "lucide-react";
import { Navigation, Mark } from "./components/Navigation";
import { Showcase, Comparison } from "./components/Showcase";
import { Portfolio, ProjectDialog } from "./components/Portfolio";
import { Services, MotionSection, About } from "./components/Services";
import { Contact } from "./components/Contact";
import { projects, site, type Category } from "./data/site";
export default function App() {
  const [filter, setFilter] = useState<Category>("All work");
  const [projectId, setProjectId] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#project-(\d+)$/);
      setProjectId(
        match && projects.some((p) => p.id === match[1]) ? match[1] : null,
      );
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading,.showcase-layout,.process-grid,.about-copy",
      )
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, []);
  const openProject = (id: string) => {
    window.location.hash = `project-${id}`;
    setProjectId(id);
  };
  const closeProject = () => {
    setProjectId(null);
    history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}#work`,
    );
  };
  const activeProject = projects.find((p) => p.id === projectId);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-copy">
            <span className="eyebrow hero-kicker">
              <span className="status-dot" /> INDEPENDENT CREATIVE STUDIO
            </span>
            <div className="hero-title">
              <h1>
                Products.
                <br />
                <span>Reimagined.</span>
              </h1>
            </div>
            <p className="hero-lead">
              A different perspective.
              <br />
              An unmistakable presence.
            </p>
            <p className="hero-description">
              Product imagery, art direction and motion.
              <br />
              Considered down to the last detail.
              <br />
              Created to make people look.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#work">
                Explore Our Work <ArrowUpRight size={20} />
              </a>
              <a className="text-link" href="#contact">
                Start a Project <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-copy-bottom">
              <span className="eyebrow">FORM. LIGHT. FEELING.</span>
              <ArrowDownRight size={38} strokeWidth={1} />
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/art/photography/hero-bag.webp"
              srcSet="/art/photography/hero-bag-small.webp 768w, /art/photography/hero-bag.webp 1536w"
              sizes="(max-width: 700px) 150vw, 90vw"
              alt="Photorealistic charcoal leather handbag concept on a concrete monolith, lit by a silver studio highlight"
              fetchPriority="high"
              width="1536"
              height="1024"
            />
            <div className="hero-image-top">
              <span className="eyebrow">THE OBJECT STUDIES / 001</span>
              <span className="crosshair">+</span>
            </div>
            <div className="hero-image-bottom">
              <span>LEATHER / LIGHT / PERSPECTIVE</span>
              <span>AI-ASSISTED STUDIO CONCEPT</span>
            </div>
          </div>
          <div className="hero-footnote">
            <a href="#work">
              <ArrowDown size={14} />
              DISCOVER A DIFFERENT PERSPECTIVE
            </a>
            <span>PRODUCT IMAGERY · ART DIRECTION · MOTION</span>
          </div>
        </section>
        <div className="discipline-strip" id="showcase-start">
          <span>
            Good products deserve <em>extraordinary presence.</em>
          </span>
          <Asterisk size={36} strokeWidth={1} />
        </div>
        <Portfolio
          filter={filter}
          setFilter={setFilter}
          onProject={(p) => openProject(p.id)}
        />
        <Showcase />
        <Comparison />
        <Services
          onViewWork={(c) => {
            setFilter(c);
            window.location.hash = "work";
            document.getElementById("work")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }}
        />
        <MotionSection onProject={(p) => openProject(p.id)} />
        <About />
        <Contact />
        <section className="final-cta section-pad">
          <span className="eyebrow">
            A PRODUCT. AN IDEA. A DIFFERENT PERSPECTIVE.
          </span>
          <a href="#contact">
            Let’s make it
            <br />
            <span>worth a second look.</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="brand">
            <Mark />
            <span>
              {site.name}
              <small>INDEPENDENT CREATIVE STUDIO</small>
            </span>
          </a>
          <p>
            Considered visuals.
            <br />
            Extraordinary possibilities.
          </p>
          <div className="footer-links">
            <a href="#work">
              Work
              <ArrowUpRight size={14} />
            </a>
            <a href="#services">
              Services
              <ArrowUpRight size={14} />
            </a>
            <a href="#contact">
              Contact
              <ArrowUpRight size={14} />
            </a>
            {site.socialLinks.map((s) => (
              <a href={s.url} key={s.label} target="_blank" rel="noreferrer">
                {s.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>ALL PORTFOLIO WORK SHOWN IS CONCEPTUAL.</span>
          <a href="#home">
            BACK TO TOP <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </footer>
      {activeProject && (
        <ProjectDialog
          project={activeProject}
          onClose={closeProject}
          onNavigate={openProject}
        />
      )}
    </>
  );
}
