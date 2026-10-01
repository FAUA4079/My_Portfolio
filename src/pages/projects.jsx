import Page from "../components/Page";
import Modal from "../components/Modal";
import useHash from "../components/useHash";
import projects from "../data/projects.json";
import { useState } from "react";
export default function Projects() {
  const [hash, navigate] = useHash();
  const [lastCategory, setLastCategory] = useState("all");
  const categories = ["all", "defensive", "offensive"];
  const selected = projects.find((p) => hash === `project-${p.id}`);
  const category = categories.includes(hash)
    ? hash
    : selected
      ? lastCategory
      : "all";
  const filtered = projects.filter(
    (p) => category === "all" || p.category === category,
  );
  return (
    <Page
      title="Projects"
      description="Explore Fuad Hasan’s open-source security tools and applications."
    >
      <header className="page-header">
        <h1>Projects</h1>
        <p>
          Open-source tools and applications I&apos;ve built or contributed to.
        </p>
      </header>
      <div className="tab-nav" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`tab-btn ${c === category ? "active" : ""}`}
            aria-pressed={c === category}
            onClick={() => {
              setLastCategory(c);
              navigate(c);
            }}
          >
            {c[0].toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {filtered.map((p) => (
          <article className="card" key={p.id}>
            <h2>{p.title}</h2>
            <div className="card-tech">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <button
              type="button"
              className="btn-link-style details-button"
              onClick={() => {
                setLastCategory(category);
                navigate(`project-${p.id}`);
              }}
            >
              Details →
            </button>
          </article>
        ))}
        {!filtered.length && (
          <article className="card">
            <h2>
              No {category === "offensive" ? "Offensive" : "Defensive"} Projects
              Yet
            </h2>
            <p>Stay tuned for future security projects.</p>
          </article>
        )}
      </div>
      {selected && (
        <Modal title={selected.title} onClose={() => navigate(category)}>
          {[
            ["Goal", "goal"],
            ["Problem", "problem"],
            ["Solution", "solution"],
          ].map(([label, key]) => (
            <section className="modal-section" key={key}>
              <h3>{label}</h3>
              <p>{selected[key]}</p>
            </section>
          ))}
          <div className="card-tech">
            {selected.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="dialog-actions">
            <a
              className="btn"
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub ↗
            </a>
          </div>
        </Modal>
      )}
    </Page>
  );
}
