import Page from "../components/Page";
export default function Experience() {
  return (
    <Page
      title="Experience"
      description="Fuad Hasan’s experience with Cyber Invasion Army and CodSoft."
    >
      <header className="page-header">
        <h1>Experience</h1>
        <p>Professional journey in cybersecurity and software development.</p>
      </header>
      <div className="timeline">
        <article className="timeline-item">
          <div className="experience-header">
            <span className="organization-placeholder" aria-hidden="true">
              CIA
            </span>
            <div>
              <span className="timeline-date">Sep 2026 – Present</span>
              <h2 className="timeline-title">Member</h2>
              <p className="organization-name">Cyber Invasion Army (CIA)</p>
            </div>
          </div>
          <p className="experience-meta">Part-time · Bangladesh · Hybrid</p>
        </article>
        <article className="timeline-item">
          <span className="timeline-date">April 2025 — May 2025</span>
          <h2 className="timeline-title">
            Python Programmer — CodSoft (Remote)
          </h2>
          <p>
            Completed a Python programming internship focused on practical
            applications and problem-solving.
          </p>
          <ul>
            <li>
              Built 5+ Python applications, including a To-Do List with CRUD
              operations, a Secure Password Generator, a Contact Book with JSON
              storage, a CLI Calculator, and a Rock-Paper-Scissors game with
              score tracking.
            </li>
            <li>
              Used OOP and modular code, with error handling and input
              validation.
            </li>
            <li>
              Managed projects on GitHub with version control, organized
              repositories, and documentation.
            </li>
          </ul>
          <div className="card-tech">
            {["Python", "Problem Solving", "GitHub", "OOP"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </article>
      </div>
    </Page>
  );
}
