import Page from "../components/Page";
import { asset } from "../components/paths";
export default function Content() {
  return (
    <Page
      title="Home"
      description="Fuad Hasan (Toreno79): cybersecurity projects, experience, certifications and practical security writeups."
    >
      <section className="hero">
        <div className="ascii-art" aria-hidden="true">
          {
            "\n  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557   \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2557  \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557\n  \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557    \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\n  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\n  \u2588\u2588\u2554\u2550\u2550\u255d  \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2557\u2588\u2588\u2551\n  \u2588\u2588\u2551     \u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d    \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2588\u2551\n  \u255a\u2550\u255d      \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u255d     \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u2550\u2550\u255d\n            "
          }
        </div>
        <h1>{"Fuad Hasan"}</h1>
        <p className="hero-intro">
          {
            "Cyber Security Engineering undergraduate \u00b7 Web security enthusiast"
          }
        </p>
        <h3
          className="hero-motto"
          data-text="Differences give birth to new things"
        >
          {"Differences give birth to new things"}
        </h3>
        <div className="btn-group">
          <a href={asset("/about.html")} className="btn">
            {"[ About ]"}
          </a>
          <a href={asset("/education.html")} className="btn">
            {"[ Education ]"}
          </a>
          <a href={asset("/achievements.html")} className="btn btn-primary">
            {"[ Achievements ]"}
          </a>
          <a href={asset("/experience.html")} className="btn">
            {"[ Experience ]"}
          </a>
          <a href={asset("/projects.html")} className="btn">
            {"[ Projects ]"}
          </a>
          <a href={asset("/blog.html")} className="btn">
            {"[ Blog ]"}
          </a>
          <a href={asset("/contact.html")} className="btn">
            {"[ Contact ]"}
          </a>
        </div>
      </section>

      <section>
        <h2>{"> tail -f /var/log/sys_activity.log"}</h2>
        <div
          className="card"
          style={{
            background: "#050505",
            border: "1px solid var(--green, #9fef00)",
            padding: "1.5rem",
            fontFamily: "monospace",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#888", marginBottom: "0.5rem" }}>
            {"[+] Connecting to Toreno79 main server... OK"}
          </p>
          <p style={{ color: "#888", marginBottom: "1.5rem" }}>
            {"[+] Fetching recent activity logs..."}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "#555" }}>{"[SYS]"}</span>
            <span style={{ color: "var(--primary-color, #9fef00)" }}>
              {"Rank Up:"}
            </span>
            {
              ' Achieved "Script Kiddie" status on Hack The Box & Top 2% on TryHackMe.'
            }
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "#555" }}>{"[SYS]"}</span>
            <span style={{ color: "var(--green, #9fef00)" }}>
              {"Build Init:"}
            </span>
            {
              " LogRisk Analyzer \u2014 Automated GRC log scanning tool (Python)"
            }
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "#555" }}>{"[SYS]"}</span>
            <span style={{ color: "var(--green, #9fef00)" }}>
              {"Cert Acquired:"}
            </span>
            {" Certified Cybersecurity Foundations - CORD on Hackviser"}
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <span style={{ color: "#555" }}>{"[SYS]"}</span>
            <span style={{ color: "var(--green, #9fef00)" }}>
              {"Process Started:"}
            </span>
            {" Prepping for kWAPTA certification on Knight academy."}
          </p>
          <p>
            {"root@toreno79:~# "}
            <span
              style={{
                animation: "blink 1s step-end infinite",
                color: "var(--green, #9fef00)",
              }}
            >
              {"\u2588"}
            </span>
          </p>
        </div>
      </section>
      <hr className="section-divider" />

      <div className="stats-grid">
        <div className="stat-card animate-fade-up delay-1">
          <span className="stat-number">{"1+"}</span>
          <span className="stat-label">{"Years Experience"}</span>
        </div>
        <div className="stat-card animate-fade-up delay-2">
          <span className="stat-number">{"1+"}</span>
          <span className="stat-label">{"Projects Built"}</span>
        </div>
        <div className="stat-card animate-fade-up delay-3">
          <span className="stat-number">{"4"}</span>
          <span className="stat-label">{"Certifications"}</span>
        </div>
        <div className="stat-card animate-fade-up delay-4">
          <span className="stat-number">{"\u221e"}</span>
          <span className="stat-label">{"Coffee Consumed"}</span>
        </div>
      </div>

      <h2>{"quick_links"}</h2>
      <div
        className="card-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        <a
          href={asset("/projects.html")}
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2>{" Projects"}</h2>
          <p>
            {
              "Explore my open-source tools, security utilities, and web applications built with modern tech stacks."
            }
          </p>
          <span className="card-link">{"Browse Projects \u2192"}</span>
        </a>
        <a
          href={asset("/achievements.html")}
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2>{" Achievements"}</h2>
          <p>
            {
              "View my professional certifications in cybersecurity and information security from leading organizations."
            }
          </p>
          <span className="card-link">{"View Achievements \u2192"}</span>
        </a>
        <a
          href={asset("/contact.html")}
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2>{" Contact"}</h2>
          <p>
            {
              "Interested in collaborating or have a security concern? Let's connect and discuss your next project."
            }
          </p>
          <span className="card-link">{"Get in Touch \u2192"}</span>
        </a>
      </div>
      <hr className="section-divider" />

      <div className="quote-block">
        <p>
          {
            "The only secure system is the one that is powered off. \u2014 Gene Spafford"
          }
        </p>
      </div>
    </Page>
  );
}
