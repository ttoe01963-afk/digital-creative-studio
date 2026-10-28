import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Film } from "lucide-react";
import {
  categories,
  projects,
  type Category,
  type Project,
} from "../data/site";
export function ProjectDialog({
  project,
  onClose,
  onNavigate,
}: {
  project: Project;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [videoError, setVideoError] = useState(false);
  useEffect(() => {
    const el = dialog.current;
    const focused = document.activeElement as HTMLElement;
    el?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = "";
      focused?.focus();
    };
  }, []);
  useEffect(() => {
    setVideoError(false);
    if (dialog.current) dialog.current.scrollTop = 0;
  }, [project]);
  const index = projects.findIndex((p) => p.id === project.id);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const nodes = Array.from(
          dialog.current!.querySelectorAll<HTMLElement>(
            "button:not([disabled]),a[href],input,select,textarea,video[controls]",
          ),
        ).filter((el) => el.getClientRects().length > 0);
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="project-title"
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="eyebrow">
            PROJECT {project.id} / {project.status.toUpperCase()}
          </span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close project"
          >
            <X />
          </button>
        </div>
        <div className="dialog-hero">
          <img src={project.image} alt={project.imageAlt} />
          <span className="image-badge">
            INDEPENDENT CONCEPT / NOT CLIENT WORK
          </span>
        </div>
        <div className="dialog-content">
          <span className="eyebrow">{project.category}</span>
          <h2 id="project-title">{project.title}</h2>
          <p className="large-copy">{project.description}</p>
          <div className="project-facts">
            <div>
              <h3>The objective</h3>
              <p>{project.objective}</p>
            </div>
            <div>
              <h3>Art direction</h3>
              <p>{project.direction}</p>
            </div>
            <div>
              <h3>Work explored</h3>
              <ul>
                {project.work.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Concept deliverables</h3>
              <ul>
                {project.deliverables.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
          {project.storyboard && (
            <section className="storyboard">
              <h3>Motion storyboard</h3>
              <p className="small-note">
                Sequence concept — no playable video has been supplied.
              </p>
              <div className="storyboard-grid">
                {project.storyboard.map((s, i) => (
                  <div key={s}>
                    <div className={`story-frame frame-${i}`}>
                      <img
                        src={project.image}
                        alt={`Storyboard frame ${i + 1}: ${s.split("—")[0]}`}
                      />
                      <span>0{i + 1}</span>
                    </div>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {project.video && (
            <div>
              <video
                key={project.video}
                controls
                playsInline
                preload="none"
                poster={project.image}
                onError={() => setVideoError(true)}
              >
                <source src={project.video} />
                <track kind="captions" />
              </video>
              {videoError && (
                <p role="alert">
                  This video could not be loaded. Please try again later.
                </p>
              )}
            </div>
          )}
          <div className="tag-row">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a href="#contact" className="button button-dark" onClick={onClose}>
            Create something like this <ArrowUpRight size={18} />
          </a>
          <div className="project-pagination">
            <button
              onClick={() =>
                onNavigate(
                  projects[(index + projects.length - 1) % projects.length].id,
                )
              }
            >
              <ArrowLeft size={18} />
              Previous project
            </button>
            <button
              onClick={() =>
                onNavigate(projects[(index + 1) % projects.length].id)
              }
            >
              Next project
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
export function Portfolio({
  filter,
  setFilter,
  onProject,
}: {
  filter: Category;
  setFilter: (c: Category) => void;
  onProject: (p: Project) => void;
}) {
  const shown = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <section id="work" className="portfolio section-pad">
      <div className="section-top">
        <span className="eyebrow">01 / SELECTED EXPLORATIONS</span>
        <span className="eyebrow">THE OBJECT STUDIES — 10 CONCEPTS</span>
      </div>
      <div className="section-heading">
        <h2>
          Objects, with
          <br />
          <span>something to say.</span>
        </h2>
        <p>
          A study in form, light and feeling.
          <br />
          Ten photographic concepts. Ten distinct points of view. One considered
          approach to making products stand out.
        </p>
      </div>
      <div className="portfolio-controls">
        <div className="filters" role="group" aria-label="Filter portfolio">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
              {filter === c && (
                <span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              )}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {String(shown.length).padStart(2, "0")} PROJECTS
        </span>
      </div>
      <div
        className={`project-grid ${filter !== "All work" ? "is-filtered" : ""}`}
      >
        {shown.map((p) => (
          <button
            className={`project-card project-${p.id}`}
            key={p.id}
            onClick={() => onProject(p)}
          >
            <div className="project-image">
              <img
                src={p.image}
                srcSet={`${p.image.replace(".webp", "-small.webp")} 480w, ${p.image} 764w`}
                sizes="(max-width: 700px) 90vw, 55vw"
                alt={p.imageAlt}
                loading="lazy"
                width="768"
                height="512"
              />
              <span className="image-badge">STUDIO CONCEPT</span>
              <span className="project-open">
                <ArrowUpRight size={23} />
              </span>
              {p.storyboard && (
                <span className="motion-badge">
                  <Film size={14} />
                  STORYBOARD
                </span>
              )}
            </div>
            <div className="project-caption">
              <div>
                <span className="eyebrow">
                  {p.id} / {p.category}
                </span>
                <h3>{p.title}</h3>
              </div>
              <ArrowUpRight size={22} />
            </div>
          </button>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="empty-state">
          No work in this selection yet.{" "}
          <button onClick={() => setFilter("All work")}>
            Explore all work
          </button>
        </p>
      )}
      <div className="portfolio-end">
        <span className="small-note">
          All projects are original demonstration concepts. No client
          relationships or results are implied.
        </span>
        <a className="text-link" href="#contact">
          Your product could be next <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
