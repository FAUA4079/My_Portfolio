import Page from "../components/Page";
import { asset } from "../components/paths";
export default function Content() {
  return (
    <Page
      title="Page not found"
      description="This portfolio page could not be found."
    >
      <h1>{"404 — Page not found"}</h1>

      <p
        style={{
          color: "var(--text-dim, #7a7a7a)",
          maxWidth: "480px",
          marginBottom: "24px",
          fontSize: "0.95rem",
        }}
      >
        {
          "The page may have moved or the address may be incorrect. Return home to continue exploring."
        }
      </p>

      <div className="btn-group" style={{ justifyContent: "center" }}>
        <a
          href={asset("/index.html")}
          className="btn btn-primary"
          style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
        >
          {"[ cd ~/home ]"}
        </a>
      </div>
    </Page>
  );
}
