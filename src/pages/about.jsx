import Page from "../components/Page";
import { asset } from "../components/paths";
export default function Content() {
  return (
    <Page
      title="About"
      description="Learn about Fuad Hasan, a Cyber Security Engineering undergraduate focused on web and AI security."
    >
      <div className="page-header">
        <h1>{"About Me"}</h1>
        <p>{"Get to know the person behind the terminal."}</p>
      </div>
      <hr className="section-divider" />
      <h2 style={{ marginTop: "2rem" }}>{"[ Focus & Trajectory ]"}</h2>
      <p>
        {
          "\n        My journey in cybersecurity is driven by a relentless curiosity to understand and secure the technologies of tomorrow. Currently, my primary focus is dedicated to "
        }
        <strong>{"Web and AI Penetration Testing"}</strong>
        {
          ". I spend my time analyzing the unique attack vectors introduced by large language models (LLMs) and dissecting complex web application frameworks. I actively apply these advanced concepts as a Cyber Security Engineering undergraduate at the University of Frontier Technology, balancing my academic foundation with intensive, practical application.\n    "
        }
      </p>
      <br />
      <p>
        {
          "\n        My dedication to this specialized path is reflected in my recent milestones. To formalize my expertise in emerging threats, I earned the "
        }
        <strong>{"Certified LLM Security Expert (CLLMSE)"}</strong>
        {" credential from Red Team Leaders and cleared the "}
        <strong>{"CORD"}</strong>
        {
          " certification on Hackviser. These achievements build upon a proven track record of competitive, hands-on exploitation: I currently rank in the "
        }
        <strong>{"Top 2% on TryHackMe"}</strong>
        {
          ' with over 80 completed rooms, and hold the "Script Kiddie" rank on Hack The Box, having conquered 17+ active labs and academy modules.\n    '
        }
      </p>
      <br />
      <p>
        {
          "\n        Looking forward, my ultimate goal is to remain at the bleeding edge of offensive security. As artificial intelligence becomes inextricably linked with modern web infrastructure, I am dedicated to discovering, analyzing, and mitigating vulnerabilities at the intersection of these two domains. I aim to uncover the flaws in next-generation platforms before malicious actors do, ensuring that the future of the web is built securely from the ground up.\n    "
        }
      </p>
      <h2 style={{ marginTop: "2rem" }}>{"[ Technical Skills ]"}</h2>
      <div className="skill-tags">
        <span className="skill-tag">{"Kali Linux OS"}</span>
        <span className="skill-tag">{"Python"}</span>
        <span className="skill-tag">{"C / C++"}</span>
        <span className="skill-tag">{"Web Security & Exploits"}</span>
        <span className="skill-tag">{"Network Scanning"}</span>
        <span className="skill-tag">{"AI"}</span>
      </div>
      <h2 style={{ marginTop: "2rem" }}>{"[ Core Competencies ]"}</h2>
      <div className="skill-tags">
        <span className="skill-tag">{"Critical Thinking"}</span>
        <span className="skill-tag">{"Leadership"}</span>
        <span className="skill-tag">{"Teamwork"}</span>
        <span className="skill-tag">{"Communication"}</span>
      </div>
    </Page>
  );
}
