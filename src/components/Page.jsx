import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { asset } from "./paths";
const links = [
  "Home",
  "About",
  "Education",
  "Achievements",
  "Experience",
  "Projects",
  "Blog",
  "Contact",
];
export default function Page({ title, description, children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`Toreno79 | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:title" content={`Fuad Hasan | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href={asset("/favicon.svg")} type="image/svg+xml" />
        {title === "Page not found" && <meta name="robots" content="noindex" />}
      </Head>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav
        className="navbar"
        aria-label="Main navigation"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.getElementById("nav-toggle")?.focus();
          }
        }}
      >
        <div className="navbar-inner">
          <a className="navbar-brand" href={asset("/index.html")}>
            :&gt; Toreno79_
          </a>
          <button
            id="nav-toggle"
            className="nav-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          <div id="nav-links" className={`navbar-links${open ? " open" : ""}`}>
            {links.map((label) => {
              const path = label === "Home" ? "/" : "/" + label.toLowerCase();
              const active = router.pathname === path;
              return (
                <a
                  key={label}
                  href={asset(path === "/" ? "/index.html" : path + ".html")}
                  className={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
      <main id="main" className="main-wrapper" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer">
        <p>© 2026 Toreno79</p>
      </footer>
    </>
  );
}
