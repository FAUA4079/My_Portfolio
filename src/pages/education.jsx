import Page from "../components/Page";
import { asset } from "../components/paths";
export default function Content() {
  return (
    <Page
      title="Education"
      description="Fuad Hasan’s academic background and qualifications."
    >
      <div className="page-header">
        <h1>{"Education"}</h1>
        <p>{"Academic background and qualifications."}</p>
      </div>
      <hr className="section-divider" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div className="card card-accent animate-fade-up delay-1">
          <h2>{" B.Sc. (Eng.) in Cyber Security Engineering"}</h2>
          <p style={{ marginBottom: "6px" }}>
            <strong style={{ color: "var(--green)" }}>{"Institution:"}</strong>
            {" University of Frontier Technology, Bangladesh"}
          </p>
          <p style={{ marginBottom: "6px" }}>
            <strong style={{ color: "var(--green)" }}>{"Period:"}</strong>
            {" 2024 — Present"}
          </p>
          <p style={{ marginTop: "10px" }}>
            {
              "\n                    Pursuing a specialized undergraduate degree in "
            }
            <strong>{"Cyber Security Engineering"}</strong>
            {
              ". \n                    Focusing on core technical pillars including network security, ethical hacking methodologies, \n                    system administration, and secure software development principles.\n                "
            }
          </p>
          <div className="card-tech">
            <span>{"Cyber Security"}</span>
            <span>{"Network Security"}</span>
            <span>{"Ethical Hacking"}</span>
            <span>{"Systems"}</span>
          </div>
        </div>

        <div className="card card-accent animate-fade-up delay-2">
          <h2>{" Higher Secondary Certificate (HSC)"}</h2>
          <p style={{ marginBottom: "6px" }}>
            <strong style={{ color: "var(--green)" }}>{"Institution:"}</strong>
            {" Cantonment College, Cumilla"}
          </p>
          <p style={{ marginBottom: "6px" }}>
            <strong style={{ color: "var(--green)" }}>{"Period:"}</strong>
            {" 2021 — 2023"}
          </p>
          <p style={{ marginTop: "10px" }}>
            {"\n                    Majored in "}
            <strong>{"Science"}</strong>
            {
              " with a strong emphasis on Mathematics, Physics, \n                    and foundational computer science concepts, building the analytical and technical groundwork \n                    for engineering studies.\n                "
            }
          </p>
          <div className="card-tech">
            <span>{"Science"}</span>
            <span>{"Mathematics"}</span>
            <span>{"Physics"}</span>
          </div>
        </div>
      </div>
    </Page>
  );
}
