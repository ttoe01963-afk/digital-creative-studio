import { useEffect, useState } from "react";
import {
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
          <div className="hero-top">
            <span className="eyebrow">
              <span className="status-dot" />
              PRODUCT IMAGERY. ART DIRECTION. MOTION.
            </span>
            <span className="hero-edition eyebrow">
              A STUDY IN PERSPECTIVE / VOL. 01
            </span>
          </div>
          <div className="hero-title">
            <h1>
              Good products.
              <br />
              Impossible <span>to ignore.</span>
              <ArrowDownRight aria-hidden="true" />
            </h1>
          </div>
          <div className="hero-bottom">
            <div className="hero-description">
              <p>
                We turn everyday products into
                <br />
                extraordinary visual experiences.
              </p>
              <span className="hero-subcopy">
                Considered imagery for brands
                <br />
                with something worth showing.
              </span>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">
                  Explore selected work
                  <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#contact">
                  Start a project
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/art/hero.webp"
                alt="Original silver headphone concept floating above a brushed metal pedestal"
                fetchPriority="high"
                width="1536"
                height="1024"
              />
              <div className="hero-image-top">
                <span className="eyebrow">FORM / MATERIAL / PERSPECTIVE</span>
                <span className="crosshair">+</span>
              </div>
              <span className="hero-image-bottom eyebrow">
                001 — A DIFFERENT FREQUENCY / AI-ASSISTED CONCEPT
              </span>
              <span className="hero-image-label">
                An independent
                <br />
                point of view.
              </span>
            </div>
          </div>
          <div className="hero-footnote">
            <a href="#showcase-start">
              <ArrowDown size={14} />
              SCROLL TO EXPLORE
            </a>
            <span>CREATIVE THINKING. PRECISE EXECUTION.</span>
            <span>IMAGINED WITH INTENTION.</span>
          </div>
        </section>
        <div className="discipline-strip" id="showcase-start">
          {[
            "PRODUCT IMAGERY",
            "ART DIRECTION",
            "VISUAL STORYTELLING",
            "MOTION & REELS",
          ].map((t) => (
            <span key={t}>
              {t}
              <Asterisk size={22} />
            </span>
          ))}
        </div>
        <Showcase />
        <Portfolio
          filter={filter}
          setFilter={setFilter}
          onProject={(p) => openProject(p.id)}
        />
        <Comparison />
        <Services
          onViewWork={(c) => {
            setFilter(c);
            window.location.hash = "work";
            document
              .getElementById("work")
              ?.scrollIntoView({ behavior: "smooth" });
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
          <a href="#home">BACK TO TOP ↑</a>
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
