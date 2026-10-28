import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../data/site";
export function Mark() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M3 3h17v10h-7v6h16v10H3V19h7v-6H3z" />
    </svg>
  );
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  return (
    <header className="header">
      <a href="#home" className="brand" aria-label={`${site.name} home`}>
        <Mark />
        <span>
          {site.name}
          <small>INDEPENDENT CREATIVE STUDIO</small>
        </span>
      </a>
      <nav
        className={open ? "nav is-open" : "nav"}
        aria-label="Main navigation"
        id="navigation"
      >
        {["Work", "Services", "About", "Contact"].map((s, i) => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            <span className="nav-number">0{i + 1}</span>
            {s}
          </a>
        ))}
        <a
          href="#contact"
          className="button nav-cta"
          onClick={() => setOpen(false)}
        >
          {site.cta}
          <ArrowUpRight size={16} />
        </a>
      </nav>
      <button
        ref={toggle}
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="navigation"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
