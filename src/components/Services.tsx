import { useState } from "react";
import { ArrowDown, ArrowUpRight, Plus, Minus, Film } from "lucide-react";
import { services, projects, type Category, type Project } from "../data/site";
export function Services({
  onViewWork,
}: {
  onViewWork: (c: Category) => void;
}) {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="services section-pad">
      <div className="section-top">
        <span className="eyebrow">04 / WHAT WE BRING TO THE TABLE</span>
        <span className="eyebrow">FROM THE FIRST IMAGE TO THE FULL STORY</span>
      </div>
      <div className="section-heading">
        <h2>
          Considered craft.
          <br />
          <span>For every touchpoint.</span>
        </h2>
        <p>
          One product or a whole collection.
          <br />
          The right creative approach, shaped around your brand.
        </p>
      </div>
      <div className="services-layout">
        <div className="service-visual">
          <img
            key={active}
            src={`/art/${services[Math.max(active, 0)].image}.svg`}
            alt={`${services[Math.max(active, 0)].title} — original studio concept preview`}
            loading="lazy"
          />
          <span className="image-badge">CREATIVE DIRECTION / CONCEPT</span>
          <span className="service-big-index">0{Math.max(active, 0) + 1}</span>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-row ${active === i ? "expanded" : ""}`}
            >
              <h3>
                <button
                  onClick={() => setActive(active === i ? -1 : i)}
                  aria-expanded={active === i}
                  aria-controls={`service-${i}`}
                >
                  <span className="eyebrow">0{i + 1}</span>
                  {s.title}
                  {active === i ? <Minus size={19} /> : <Plus size={19} />}
                </button>
              </h3>
              <div id={`service-${i}`} hidden={active !== i}>
                <p>{s.description}</p>
                <span className="small-note">{s.deliverable}</span>
                <div className="service-actions">
                  <button
                    className="text-link"
                    onClick={() => onViewWork(s.category)}
                  >
                    Explore work
                    <ArrowUpRight size={15} />
                  </button>
                  <a href="#contact" className="text-link">
                    Request a quote
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function MotionSection({
  onProject,
}: {
  onProject: (p: Project) => void;
}) {
  const motion = projects.filter((p) => p.storyboard);
  return (
    <section className="motion-section section-pad">
      <div className="motion-intro">
        <span className="eyebrow">05 / BEYOND THE STILL</span>
        <h2>
          A little motion.
          <br />A lasting impression.
        </h2>
        <p>
          Product stories, frame by frame.
          <br />
          Explore the direction behind the movement.
        </p>
        <span className="small-note">
          CONCEPT STORYBOARDS / VIDEO ASSETS NOT YET SUPPLIED
        </span>
      </div>
      <div className="motion-cards">
        {motion.map((p) => (
          <button
            key={p.id}
            className="motion-card"
            onClick={() => onProject(p)}
          >
            <img
              src={p.image}
              alt={`${p.title} motion concept poster`}
              loading="lazy"
            />
            <span className="motion-card-top">
              MOTION STUDY / {p.id}
              <Film size={16} />
            </span>
            <span className="storyboard-open">
              <ArrowUpRight size={27} />
            </span>
            <span className="motion-card-caption">
              {p.title}
              <small>EXPLORE STORYBOARD ↗</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
export function About() {
  return (
    <>
      <section className="process section-pad">
        <div className="section-top">
          <span className="eyebrow">A SIMPLE PATH FROM IDEA TO IMAGE</span>
          <ArrowDown size={20} />
        </div>
        <h2>
          A considered process.
          <br />A clear next step.
        </h2>
        <div className="process-grid">
          {[
            [
              "Share your product.",
              "Tell us about your product, your audience and what you want to create.",
            ],
            [
              "Find your direction.",
              "Explore a visual approach and agree on the scope and deliverables.",
            ],
            [
              "Make it happen.",
              "Bring the direction to life through considered imagery and editing.",
            ],
            [
              "Refine. Receive.",
              "Review the creative together and prepare the agreed final formats.",
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <span className="process-number">
                0{i + 1}
                <ArrowUpRight size={18} />
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="about" className="about section-pad">
        <div className="about-symbol" aria-hidden="true">
          <div />
          <div />
          <div />
        </div>
        <div className="about-copy">
          <span className="eyebrow">
            06 / INDEPENDENT IN SPIRIT. PRECISE BY DESIGN.
          </span>
          <h2>
            Good design
            <br />
            makes you look.
            <br />
            <span>
              Great design
              <br />
              makes you feel.
            </span>
          </h2>
          <p>
            We believe every product has a point of view worth bringing into
            focus. This studio is built around that idea — combining careful
            visual craft with a willingness to see things differently.
          </p>
          <p>
            From the quiet precision of a catalog image to the energy of a
            launch campaign, the goal is the same: thoughtful content that puts
            your product first.
          </p>
          <div className="about-values">
            <span>PRODUCT FIRST</span>
            <span>DETAIL OBSESSED</span>
            <span>OPEN TO POSSIBILITY</span>
          </div>
        </div>
      </section>
    </>
  );
}
