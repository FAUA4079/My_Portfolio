import Page from "../components/Page";
import Modal from "../components/Modal";
import useHash from "../components/useHash";
import data from "../data/achievements.json";
export default function Achievements() {
  const [hash, navigate] = useHash();
  const tabs = ["certifications", "ctfs", "seminars"];
  const selected = data.ctfs.find((c) => hash === `ctf-${c.id}`);
  const tab = selected ? "ctfs" : tabs.includes(hash) ? hash : "certifications";
  return (
    <Page
      title="Achievements"
      description="Fuad Hasan’s certifications, CTF results and seminar participation."
    >
      <header className="page-header">
        <h1>Achievements</h1>
        <p>Certifications, CTF competitions, and continuous learning.</p>
      </header>
      <div className="tab-nav" role="group" aria-label="Achievement categories">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`tab-btn ${tab === t ? "active" : ""}`}
            aria-pressed={tab === t}
            onClick={() => navigate(t)}
          >
            {t === "ctfs" ? "CTFs" : t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === "ctfs"
        ? data.ctfs.map((c) => (
            <article className="ctf-block" key={c.id}>
              <div className="ctf-header">
                <h2>{c.title}</h2>
                <span className="ctf-date">{c.date}</span>
              </div>
              <div className="ctf-details">
                <p>
                  <strong>Team Name:</strong> {c.team}
                </p>
                <p>
                  <strong>Position:</strong> {c.position}
                </p>
                <p>
                  <strong>Team Points:</strong> {c.points}
                </p>
              </div>
              <div className="ctf-block-footer">
                <button
                  type="button"
                  className="btn-link-style"
                  onClick={() => navigate(`ctf-${c.id}`)}
                >
                  More Details →
                </button>
              </div>
            </article>
          ))
        : data[tab].map((c) => (
            <article className="ctf-block" key={c.title}>
              <div className="ctf-header">
                <h2>{c.title}</h2>
                <span className="cert-date">{c.date}</span>
              </div>
              <p>
                <strong>
                  {tab === "seminars" ? "Organizer:" : "Issuing Organization:"}
                </strong>{" "}
                {c.organizationUrl ? (
                  <a
                    href={c.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.organization} ↗
                  </a>
                ) : (
                  c.organization
                )}
              </p>
              <div className="ctf-block-footer">
                <a
                  className="btn-link-style"
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tab === "seminars"
                    ? "View Certificate"
                    : "Verify Credential"}{" "}
                  ↗
                </a>
              </div>
            </article>
          ))}
      <noscript>
        <p>
          Enable JavaScript to switch achievement categories and open CTF
          details.
        </p>
      </noscript>
      {selected && (
        <Modal title={selected.title} onClose={() => navigate("ctfs")}>
          <div className="ctf-modal-summary">
            <span>Team: {selected.team}</span>
            <span>Position: {selected.position}</span>
            <span>Total Points: {selected.points}</span>
            <span>Date: {selected.date}</span>
          </div>
          <div
            className="table-scroll"
            role="region"
            aria-label="Team member points"
            tabIndex={0}
          >
            <table className="ctf-score-table">
              <caption>Team Member Points</caption>
              <thead>
                <tr>
                  <th scope="col">Member Name</th>
                  <th scope="col">Challenges Solved</th>
                  <th scope="col">Individual Points</th>
                </tr>
              </thead>
              <tbody>
                {selected.members.map((m) => (
                  <tr key={m[0]}>
                    {m.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </Page>
  );
}
