import { useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
const styles = [
  {
    name: "Silver studio",
    note: "Soft light. Strong presence.",
    class: "silver",
  },
  { name: "Concrete", note: "Raw texture. Refined form.", class: "concrete" },
  { name: "Graphite", note: "Less light. More drama.", class: "graphite" },
];
export function Showcase() {
  const [active, setActive] = useState(0);
  return (
    <section className="showcase section-pad" aria-labelledby="showcase-title">
      <div className="section-top">
        <span className="eyebrow">02 / THE ART OF PERSPECTIVE</span>
        <span className="eyebrow">ONE PRODUCT. DIFFERENT PERSPECTIVES.</span>
      </div>
      <div className="showcase-layout">
        <div className="showcase-copy">
          <h2 id="showcase-title">
            Same product.
            <br />
            New possibilities.
          </h2>
          <p>
            A change in light. A shift in mood. A completely different story.
            Explore how art direction changes the way a product feels.
          </p>
          <div
            className="style-options"
            role="group"
            aria-label="Art direction style"
          >
            {styles.map((s, i) => (
              <button
                key={s.name}
                aria-pressed={active === i}
                className={
                  active === i ? "style-option selected" : "style-option"
                }
                onClick={() => setActive(i)}
              >
                <span className={`swatch ${s.class}`} />
                {s.name}
                <span className="option-index">0{i + 1}</span>
              </button>
            ))}
          </div>
          <span className="small-note">
            Interactive lighting study · Original product concept
          </span>
        </div>
        <div className={`showcase-art ${styles[active].class}`}>
          <div className="scene-grid" />
          <img
            src="/art/photography/headphone-study.webp"
            alt="Original silver headphone concept in an adjustable studio environment"
            loading="lazy"
          />
          <div className="art-caption">
            <span>EXPERIMENT / 001</span>
            <span aria-live="polite">{styles[active].note}</span>
            <ArrowUpRight size={17} />
          </div>
        </div>
      </div>
    </section>
  );
}
export function Comparison() {
  const [position, setPosition] = useState(50);
  return (
    <section
      className="comparison-section section-pad"
      aria-labelledby="comparison-title"
    >
      <div className="comparison-copy">
        <span className="eyebrow">03 / THE FINER DETAILS</span>
        <h2 id="comparison-title">
          The difference
          <br />
          is in the detail.
        </h2>
        <p>
          Clean edges. Considered color. A shadow that feels right. Small
          decisions add up to a more compelling product image.
        </p>
        <p className="small-note">
          Illustrative comparison using an original rendered concept. This is
          not a client retouch or a genuine before-and-after photo.
        </p>
        <a className="text-link" href="#contact">
          Let’s refine your product imagery <ArrowUpRight size={17} />
        </a>
      </div>
      <div>
        <div className="comparison-frame">
          <img
            src="/art/photography/headphone-study.webp"
            alt="Refined silver headphone concept with clean studio treatment"
            loading="lazy"
          />
          <div
            className="before-layer"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src="/art/photography/headphone-study.webp"
              alt="Same headphone concept with an illustrative flatter, darker treatment"
              loading="lazy"
            />
          </div>
          <span className="compare-label before">BEFORE / CONCEPT</span>
          <span className="compare-label after">AFTER / CONCEPT</span>
          <div className="compare-divider" style={{ left: `${position}%` }}>
            <span>
              <MoveHorizontal size={22} />
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Before and after comparison position"
            aria-valuetext={`${position}% before, ${100 - position}% after`}
          />
        </div>
        <div className="comparison-legend">
          <span>DRAG TO EXPLORE</span>
          <output aria-live="off">
            {position}% / {100 - position}%
          </output>
          <span>USE LEFT / RIGHT KEYS</span>
        </div>
      </div>
    </section>
  );
}
