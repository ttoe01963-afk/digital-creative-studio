import { useRef, useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  MessageCircle,
} from "lucide-react";
import { services, site } from "../data/site";
type Brief = {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
  deadline: string;
  references: string;
};
const initial: Brief = {
  name: "",
  email: "",
  phone: "",
  service: "",
  description: "",
  budget: "",
  deadline: "",
  references: "",
};
export function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Brief, string>>>(
    {},
  );
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const configured = Boolean(site.inquiryEndpoint);
  function validate() {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.service)
      next.service = "Choose a service so we can understand your brief.";
    if (form.description.trim().length < 20)
      next.description = "Tell us a little more — at least 20 characters.";
    if (
      form.references.trim() &&
      !form.references
        .trim()
        .split(/\s+/)
        .every((v) => {
          try {
            return ["https:", "http:"].includes(new URL(v).protocol);
          } catch {
            return false;
          }
        })
    )
      next.references =
        "Use complete http or https links, separated by spaces or new lines.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return false;
    }
    return true;
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("");
    if (!validate()) return;
    if (!configured) {
      const text = `PROJECT BRIEF — ${site.name}\n\n${Object.entries(form)
        .map(
          ([key, value]) => `${key.toUpperCase()}: ${value || "Not specified"}`,
        )
        .join("\n\n")}`;
      const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "studio-project-brief.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(
        "Your brief file is ready. It has not been sent. Keep it to share when studio contact details are available.",
      );
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(site.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error();
      setStatus(
        "Your inquiry has been accepted. Thank you for sharing your project.",
      );
      setForm(initial);
    } catch {
      setStatus(
        "Your inquiry could not be sent. Your brief is still here; please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: keyof Brief,
    label: string,
    type = "text",
    placeholder = "",
    required = false,
  ) => (
    <label className={`field field-${name}`} key={name}>
      <span>
        {label}
        {required ? " *" : " (optional)"}
      </span>
      <input
        type={type}
        name={name}
        value={form[name]}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]}
        </span>
      )}
    </label>
  );
  return (
    <section id="contact" className="contact section-pad">
      <div className="section-top">
        <span className="eyebrow">07 / LET’S MAKE SOMETHING MATTER</span>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
      </div>
      <div className="contact-layout">
        <div className="contact-intro">
          <h2>
            Good things
            <br />
            start with
            <br />
            <span>a conversation.</span>
          </h2>
          <p>
            A product to launch? An image to refine?
            <br />
            An idea that needs a new perspective?
            <br />
            Tell us what you have in mind.
          </p>
          {site.email ? (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <p className="contact-setup">Studio email will be added here.</p>
          )}
          {site.whatsapp ? (
            <a
              className="text-link whatsapp"
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="contact-setup">
              <MessageCircle size={16} /> WhatsApp contact coming soon
            </span>
          )}
        </div>
        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="inquiry-form"
        >
          <div className="form-heading">
            <span>Tell us about your project.</span>
            <span className="small-note">* REQUIRED</span>
          </div>
          <div className="form-grid">
            {field("name", "Your name", "text", "Alex Morgan", true)}
            {field(
              "email",
              "Email address",
              "email",
              "you@yourbrand.com",
              true,
            )}
            {field("phone", "Phone / WhatsApp", "tel", "Include country code")}
            <label className="field">
              <span>Interested service *</span>
              <select
                name="service"
                value={form.service}
                required
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
              </select>
              {errors.service && (
                <span className="field-error" id="service-error">
                  {errors.service}
                </span>
              )}
            </label>
            <label className="field field-wide">
              <span>A little about your project *</span>
              <textarea
                name="description"
                rows={4}
                placeholder="Your product, your goals, and what you’d like to create…"
                required
                value={form.description}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors.description && (
                <span className="field-error" id="description-error">
                  {errors.description}
                </span>
              )}
            </label>
            {field(
              "budget",
              "Estimated budget",
              "text",
              "Your range and currency",
            )}
            {field("deadline", "Preferred deadline", "date")}
            <label className="field field-wide">
              <span>Reference links (optional)</span>
              <textarea
                name="references"
                rows={2}
                placeholder="https://…"
                value={form.references}
                aria-invalid={!!errors.references}
                aria-describedby={
                  errors.references ? "references-error" : undefined
                }
                onChange={(e) =>
                  setForm({ ...form, references: e.target.value })
                }
              />
              {errors.references && (
                <span className="field-error" id="references-error">
                  {errors.references}
                </span>
              )}
            </label>
          </div>
          {!configured && (
            <div className="integration-note">
              <span className="status-dot" />
              <p>
                Inquiry delivery is not connected yet. You can prepare and
                download a brief below. Nothing is sent or stored by this site.
              </p>
            </div>
          )}
          <button
            className="button button-dark submit-button"
            type="submit"
            disabled={busy}
          >
            {busy
              ? "Sending…"
              : configured
                ? "Send project inquiry"
                : "Save my project brief"}
            {configured ? (
              <ArrowUpRight size={19} />
            ) : (
              <ArrowDownToLine size={19} />
            )}
          </button>
          {status && (
            <p className="form-status" role="status">
              <Check size={18} />
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
