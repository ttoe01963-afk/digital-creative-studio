export const site = {
  name: "[STUDIO NAME]",
  email: "",
  whatsapp: "", // International digits only, e.g. country code + number.
  inquiryEndpoint: "", // HTTPS endpoint accepting JSON; must return a 2xx status only on acceptance.
  socialLinks: [] as { label: string; url: string }[],
  cta: "Start a project",
};
export const categories = [
  "All work",
  "Image editing",
  "Product visuals",
  "Catalogs",
  "Advertising",
  "Motion concepts",
  "Social & campaigns",
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  id: string;
  title: string;
  category: Category;
  description: string;
  objective: string;
  direction: string;
  work: string[];
  deliverables: string[];
  image: string;
  gallery: string[];
  tags: string[];
  status: "Studio concept";
  video?: string;
  storyboard?: string[];
};
const records: Omit<Project, "id" | "status" | "gallery">[] = [
  {
    title: "A clearer perspective.",
    category: "Image editing",
    description:
      "An exploration of product cleanup, precise edges and considered shadows.",
    objective: "Give a product a consistent, distraction-free presentation.",
    direction:
      "Cool neutral surfaces, soft directional light and a precise silhouette. The comparison is an illustrative rendering, not an authentic retouch.",
    work: ["Background treatment", "Edge refinement concept", "Shadow study"],
    deliverables: ["Concept comparison", "Catalog-ready composition"],
    image: "headphones",
    tags: ["Retouching", "Product study"],
  },
  {
    title: "The art of less.",
    category: "Product visuals",
    description:
      "A quiet fragrance study with a distinctly sculptural presence.",
    objective: "Build a premium hero visual around a fictional fragrance.",
    direction:
      "Sage-tinted glass against a mineral backdrop; tactile metal and a generous crop.",
    work: ["Visual concept", "Composition", "Light and color direction"],
    deliverables: ["Hero artwork", "Detail crop", "Square placement"],
    image: "forme",
    tags: ["Art direction", "Fragrance"],
  },
  {
    title: "Consistency, by design.",
    category: "Catalogs",
    description:
      "A unified visual system for a fictional daily-care collection.",
    objective: "Make a product family feel cohesive across a storefront.",
    direction:
      "Repeated alignments, matched backgrounds and deliberate variation in scale.",
    work: ["Catalog direction", "Product grouping", "Image consistency"],
    deliverables: [
      "Collection image",
      "Individual image direction",
      "Crop guidelines",
    ],
    image: "catalog",
    tags: ["E-commerce", "Catalog"],
  },
  {
    title: "Sound. In focus.",
    category: "Product visuals",
    description:
      "An editorial feature graphic for a sculptural speaker concept.",
    objective:
      "Create a clear visual hierarchy without unverified product specifications.",
    direction:
      "Circular geometry, technical annotation and brushed silver surfaces.",
    work: ["Feature layout", "Product composition", "Annotation design"],
    deliverables: ["Feature graphic", "Detail composition"],
    image: "feature",
    tags: ["Feature graphic", "Industrial"],
  },
  {
    title: "Less noise. More presence.",
    category: "Advertising",
    description:
      "A monochrome fragrance advertisement with a bold editorial voice.",
    objective: "Explore a campaign visual with a focused product silhouette.",
    direction:
      "Oversized type, deep mineral tones and a restrained light source.",
    work: ["Advertisement concept", "Typography", "Campaign crop"],
    deliverables: [
      "Campaign hero",
      "Social adaptation",
      "CTA placement direction",
    ],
    image: "advert",
    tags: ["Advertising", "Campaign"],
  },
  {
    title: "Made to move you.",
    category: "Motion concepts",
    description: "A cinematic speaker storyboard in three considered frames.",
    objective:
      "Translate sculptural product form into a short motion narrative.",
    direction:
      "From silhouette to material detail to the complete object. Storyboard only; no video is supplied.",
    work: ["Motion direction", "Storyboard", "Sequence planning"],
    deliverables: ["Three-frame storyboard", "Shot direction", "Edit notes"],
    image: "cinematic",
    tags: ["Storyboard", "Motion"],
    storyboard: [
      "01 / Reveal — a silhouette emerges from graphite light.",
      "02 / Detail — move across the brushed surface and circular grille.",
      "03 / Resolve — reveal the full object, then hold for the end card.",
    ],
  },
  {
    title: "The everyday, elevated.",
    category: "Motion concepts",
    description:
      "A vertical product feature concept for a fictional skincare ritual.",
    objective:
      "Plan a concise social-first sequence focused on form and texture.",
    direction:
      "Portrait crops, paced type and soft natural grey. Illustrative product, with no efficacy claims.",
    work: ["Vertical concept", "Typographic direction", "Storyboard"],
    deliverables: [
      "Portrait storyboard",
      "Opening frame",
      "End-card direction",
    ],
    image: "reel",
    tags: ["Vertical", "Storyboard"],
    storyboard: [
      "01 / Introduce — the daily ritual, held in soft light.",
      "02 / Explore — a close crop follows the packaging texture.",
      "03 / Finish — the complete composition and a minimal title.",
    ],
  },
  {
    title: "A new frequency.",
    category: "Social & campaigns",
    description: "A unified launch direction for a fictional headphone design.",
    objective: "Connect a launch hero, social placement and motion idea.",
    direction:
      "Floating product forms, metallic finishes and diagonally cut silver planes.",
    work: ["Launch direction", "Social design", "Motion planning"],
    deliverables: ["Launch hero", "Social artwork", "Video concept"],
    image: "launch",
    tags: ["Launch", "Art direction"],
  },
  {
    title: "One idea. Many expressions.",
    category: "Social & campaigns",
    description:
      "A coordinated series of layouts for different social placements.",
    objective: "Keep a recognizable visual language across a creative series.",
    direction:
      "Paired products, sage-grey color fields and balanced typography.",
    work: ["Visual system", "Placement design", "Creative variations"],
    deliverables: [
      "Square direction",
      "Portrait direction",
      "Landscape direction",
    ],
    image: "social",
    tags: ["Social", "Visual system"],
  },
  {
    title: "A complete point of view.",
    category: "Social & campaigns",
    description:
      "Catalog, campaign and motion direction brought into one visual world.",
    objective:
      "Show how a creative package can connect multiple product touchpoints.",
    direction:
      "A shared material palette across fictional objects, with consistent lighting and scale.",
    work: ["Creative package", "Catalog layout", "Motion concept"],
    deliverables: [
      "Catalog direction",
      "Promotional graphics",
      "Product video storyboard",
    ],
    image: "package",
    tags: ["Creative package", "Strategy"],
  },
];
export const projects: Project[] = records.map((p, i) => ({
  ...p,
  id: String(i + 1).padStart(2, "0"),
  status: "Studio concept",
  image: p.image === "headphones" ? "/art/hero.webp" : `/art/${p.image}.svg`,
  gallery: [`/art/${p.image}.svg`],
}));
export const services = [
  {
    title: "Product image editing",
    description:
      "Thoughtful cleanup, background removal, color treatment and shadows that keep your product in focus.",
    category: "Image editing" as Category,
    image: "headphones",
    deliverable: "Retouched images · Background cleanup · Export variations",
  },
  {
    title: "E-commerce & catalogs",
    description:
      "A consistent visual language across your product range. Composed for the way customers actually browse.",
    category: "Catalogs" as Category,
    image: "catalog",
    deliverable: "Catalog imagery · Consistent crops · Collection layouts",
  },
  {
    title: "Product advertising",
    description:
      "Distinctive product heroes and promotional graphics, built around a clear creative direction.",
    category: "Advertising" as Category,
    image: "advert",
    deliverable: "Hero visuals · Campaign adaptations · Promotional graphics",
  },
  {
    title: "Reels & short-form motion",
    description:
      "Product-focused storyboards and editing for supplied footage, with attention to rhythm, detail and format.",
    category: "Motion concepts" as Category,
    image: "cinematic",
    deliverable: "Creative direction · Editing · Social formats",
  },
  {
    title: "Social media creatives",
    description:
      "Connected creative variations that bring a product story into your social channels.",
    category: "Social & campaigns" as Category,
    image: "social",
    deliverable: "Social graphics · Placement adaptations · Creative series",
  },
  {
    title: "Complete creative packages",
    description:
      "Bring catalog imagery, advertising and motion together in one considered visual system.",
    category: "Social & campaigns" as Category,
    image: "package",
    deliverable: "Catalog direction · Campaign graphics · Motion direction",
  },
  {
    title: "Something different?",
    description:
      "Have a product, an unusual brief or a direction you want to explore? Let’s shape the right project together.",
    category: "All work" as Category,
    image: "forme",
    deliverable:
      "Custom scope · Creative exploration · Project-specific outputs",
  },
];
