import { useEffect, useState } from "react";
import Page from "../components/Page";
import blogs from "../data/blogs.json";
const tags = [...new Set(blogs.flatMap((b) => b.tags))];
const newest = (a, b) => Date.parse(b.date) - Date.parse(a.date) || b.id - a.id;
const latest = [...blogs].sort(newest)[0].id;
export default function Blog() {
  const [state, setState] = useState({ tag: "all", page: 1, asc: false });
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(location.search);
      const p = Number(q.get("page"));
      setState({
        tag: tags.includes(q.get("tag")) ? q.get("tag") : "all",
        page: Number.isSafeInteger(p) && p > 0 ? p : 1,
        asc: q.get("sort") === "asc",
      });
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const filtered = blogs
    .filter((b) => state.tag === "all" || b.tags.includes(state.tag))
    .sort((a, b) => (state.asc ? -newest(a, b) : newest(a, b)));
  const pages = Math.max(1, Math.ceil(filtered.length / 5)),
    page = Math.min(state.page, pages);
  const update = (next) => {
    const s = { ...state, ...next };
    const u = new URL(location.href);
    s.tag === "all"
      ? u.searchParams.delete("tag")
      : u.searchParams.set("tag", s.tag);
    s.page === 1
      ? u.searchParams.delete("page")
      : u.searchParams.set("page", String(s.page));
    s.asc ? u.searchParams.set("sort", "asc") : u.searchParams.delete("sort");
    if (u.href !== location.href) history.pushState(null, "", u.href);
    setState(s);
  };
  return (
    <Page
      title="Blog"
      description="Security writeups, CTF walkthroughs and programming notes by Fuad Hasan."
    >
      <header className="page-header">
        <h1>Security &amp; Code Writeups</h1>
        <p>
          Chronological logs of pentest findings, CTF walkthroughs, and
          programming insights.
        </p>
      </header>
      <div className="filter-bar">
        <div
          className="tag-filters"
          role="group"
          aria-label="Filter articles by tag"
        >
          {["all", ...tags].map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-btn ${t === state.tag ? "active" : ""}`}
              aria-pressed={t === state.tag}
              onClick={() => update({ tag: t, page: 1 })}
            >
              {t === "all" ? "All Tags" : t}
            </button>
          ))}
        </div>
        <button
          className="filter-btn"
          type="button"
          onClick={() => update({ asc: !state.asc, page: 1 })}
        >
          {state.asc ? "↑ Oldest First" : "↓ Newest First"}
        </button>
      </div>
      <div className="blog-container" aria-live="polite">
        {filtered.slice((page - 1) * 5, page * 5).map((b) => (
          <article
            className={`blog-row ${b.id === latest ? "is-latest" : ""}`}
            id={`post-${b.id}`}
            key={b.id}
          >
            <div className="blog-info">
              <div className="blog-title-line">
                <h2 className="blog-title">{b.title}</h2>
                {b.id === latest && <span className="blog-new-badge">NEW</span>}
              </div>
              <div className="blog-meta">
                {b.tags.map((t) => (
                  <span key={t} className="blog-tag-badge">
                    {t}
                  </span>
                ))}
                <time dateTime={b.date}>{b.date.slice(0, 10)}</time>
              </div>
            </div>
            <a
              className="btn-link-style blog-read-link"
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${b.title} (opens in a new tab)`}
            >
              Read More →
            </a>
          </article>
        ))}
      </div>
      <nav className="pagination" aria-label="Article pages">
        <button
          className="page-btn"
          type="button"
          disabled={page === 1}
          onClick={() => update({ page: page - 1 })}
        >
          ← Prev
        </button>
        <span className="page-indicator" aria-live="polite">
          Page {page} of {pages}
        </span>
        <button
          className="page-btn"
          type="button"
          disabled={page === pages}
          onClick={() => update({ page: page + 1 })}
        >
          Next →
        </button>
      </nav>
      <noscript>
        <p>
          Enable JavaScript to filter articles, or{" "}
          <a href="https://medium.com/@fuadh6565">
            read all writeups on Medium
          </a>
          .
        </p>
      </noscript>
    </Page>
  );
}
