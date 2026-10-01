import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const routes = [
  "index",
  "about",
  "education",
  "experience",
  "projects",
  "achievements",
  "blog",
  "contact",
  "404",
];
for (const route of routes) {
  const html = fs.readFileSync(`out/${route}.html`, "utf8");
  assert.equal((html.match(/<h1(?: |>)/g) || []).length, 1, `${route}: one h1`);
  assert.match(html, /<main[^>]*id="main"/, `${route}: main landmark`);
  assert.match(html, /<meta name="description"/, `${route}: description`);
  for (const match of html.matchAll(
    /(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g,
  )) {
    let url = match[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    if (base && url.startsWith("/"))
      assert.ok(url.startsWith(base + "/"), `${route}: base path ${url}`);
    if (base && url.startsWith(base + "/")) url = url.slice(base.length);
    const target = path.join("out", url.replace(/^\//, ""));
    assert.ok(fs.existsSync(target), `${route}: missing ${target}`);
  }
}
const experience = fs.readFileSync("out/experience.html", "utf8");
assert.match(experience, /Cyber Invasion Army \(CIA\)/);
assert.match(experience, /Sep 2026 – Present/);
assert.ok(experience.indexOf("Sep 2026") < experience.indexOf("April 2025"));
assert.match(
  fs.readFileSync("out/contact.html", "utf8"),
  /href="mailto:fuadh6565@gmail.com"/,
);
const data = JSON.parse(fs.readFileSync("src/data/achievements.json"));
const bcs = data.ctfs.find((c) => c.id === 2);
assert.equal(bcs.position, "43 / 391");
assert.equal(bcs.points, 5513);
assert.equal(
  bcs.members.reduce((sum, m) => sum + Number(m[2]), 0),
  5513,
);
console.log(
  `PASS: ${routes.length} exported routes, local links/assets, landmarks, metadata, CIA chronology, email and CTF totals (${base || "root"}).`,
);
