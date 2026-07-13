// ---------- helpers ----------

// Reads the first present, non-empty value from a row across several
// possible column-name spellings, so this survives minor schema differences.
function pick(row, keys, fallback = "") {
  if (!row) return fallback;
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && row[k] !== "") return row[k];
  }
  return fallback;
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------- terminal (signature element) ----------

const termLog = document.getElementById("term-log");
const termStatus = document.getElementById("term-status");
const rawToggle = document.getElementById("raw-toggle");
const rawJson = document.getElementById("raw-json");
const footerStatus = document.getElementById("footer-status");

function typeLine(text, cls) {
  return new Promise((resolve) => {
    const line = el("p", "line" + (cls ? " " + cls : ""));
    termLog.appendChild(line);
    let i = 0;
    const speed = 14;
    const timer = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(resolve, 120);
      }
    }, speed);
  });
}

async function runRequest() {
  await typeLine("$ curl -i https://localhost:3500/api/portfolio", "prompt");
  await typeLine("Connecting to server...");

  const start = performance.now();
  let ok = false;
  let json = null;
  let statusCode = 0;

  try {
    const res = await fetch("/api/portfolio");
    statusCode = res.status;
    json = await res.json();
    ok = res.ok && json && json.success;
  } catch (e) {
    ok = false;
  }

  const elapsed = Math.round(performance.now() - start);

  if (ok) {
    await typeLine(`HTTP/1.1 ${statusCode} OK  (${elapsed}ms)`, "key");
    termStatus.textContent = `200 OK · ${elapsed}ms · content-type: application/json`;
    termStatus.classList.add("ok");
    footerStatus.textContent = `200 OK in ${elapsed}ms`;
    footerStatus.classList.add("ok");
  } else {
    await typeLine(`HTTP/1.1 ${statusCode || 500} ERROR  (${elapsed}ms)`, "key");
    termStatus.textContent = "request failed — showing placeholder content";
    termStatus.classList.add("err");
    footerStatus.textContent = "could not reach /api/portfolio";
    footerStatus.classList.add("err");
  }

  if (json && json.data) {
    rawToggle.style.display = "inline-block";
    rawJson.textContent = JSON.stringify(json.data, null, 2);
    rawToggle.addEventListener("click", () => {
      const hidden = rawJson.hasAttribute("hidden");
      if (hidden) rawJson.removeAttribute("hidden");
      else rawJson.setAttribute("hidden", "");
      rawToggle.textContent = hidden ? "hide raw response" : "view raw response";
    });
  }

  render(json && json.data ? json.data : {});
}

// ---------- render ----------

function render(data) {
  renderPersonal(data.personal);
  renderProjects(data.projects || []);
  renderExperience(data.experience || []);
  renderSkills(data.skills || []);
  renderEducation(data.education || []);
  renderCertifications(data.certifications || []);
  renderLinks(data.socialLinks || []);
}

function renderPersonal(p) {
  const name = pick(p, ["name", "full_name", "fullName"], "Your Name");
  const role = pick(p, ["title", "role", "designation", "headline"], "Backend Developer");
  const bio = pick(p, ["bio", "about", "summary", "description"], "");

  document.getElementById("hero-name").textContent = name;
  document.getElementById("nav-logo").textContent = "/" + name.split(" ")[0].toLowerCase();
  document.getElementById("hero-role").textContent = role;
  document.getElementById("hero-bio").textContent = bio;

  const email = pick(p, ["email"]);
  const phone = pick(p, ["phone", "phone_number"]);
  const location = pick(p, ["location", "city"]);
  const linksWrap = document.getElementById("hero-links");
  linksWrap.innerHTML = "";
  if (email) linksWrap.appendChild(el("a", null, `✉ ${escapeHtml(email)}`)).href = `mailto:${email}`;
  if (phone) linksWrap.appendChild(el("a", null, `☎ ${escapeHtml(phone)}`)).href = `tel:${phone}`;
  if (location) linksWrap.appendChild(el("span", "chip", `📍 ${escapeHtml(location)}`));
}

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  if (!projects.length) {
    grid.appendChild(el("p", "empty", "no projects returned"));
    return;
  }
  projects.forEach((proj) => {
    const title = pick(proj, ["title", "name", "project_name"], "Untitled project");
    const desc = pick(proj, ["description", "summary", "details"], "");
    const tech = pick(proj, ["tech_stack", "stack", "technologies", "tags"], "");
    const github = pick(proj, ["github_url", "github", "repo_url", "source_url"], "");
    const live = pick(proj, ["live_url", "demo_url", "url"], "");
    const features = Array.isArray(proj.features) ? proj.features : [];

    const card = el("div", "card");
    card.appendChild(el("h3", null, escapeHtml(title)));
    if (desc) card.appendChild(el("p", null, escapeHtml(desc)));

    if (features.length) {
      const ul = el("ul");
      features.forEach((f) => ul.appendChild(el("li", null, escapeHtml(f))));
      card.appendChild(ul);
    }

    if (tech) {
      const techText = Array.isArray(tech) ? tech.join(" · ") : tech;
      card.appendChild(el("p", null, `<span style="color:var(--text-dim)">${escapeHtml(techText)}</span>`));
    }

    const linksRow = el("div", "card-links");
    if (github) linksRow.appendChild(el("a", null, "source ↗")).href = github;
    if (live) linksRow.appendChild(el("a", null, "live ↗")).href = live;
    if (github || live) card.appendChild(linksRow);

    grid.appendChild(card);
  });
}

function renderExperience(items) {
  const wrap = document.getElementById("experience-list");
  wrap.innerHTML = "";
  if (!items.length) {
    wrap.appendChild(el("p", "empty", "no experience returned"));
    return;
  }
  items.forEach((exp) => {
    const role = pick(exp, ["role", "position", "title"], "Role");
    const company = pick(exp, ["company", "organization", "company_name"], "");
    const duration = pick(exp, ["duration", "period", "dates"], "");
    const start = pick(exp, ["start_date", "from_date"], "");
    const end = pick(exp, ["end_date", "to_date"], "");
    const desc = pick(exp, ["description", "summary", "details"], "");

    const meta = duration || [start, end].filter(Boolean).join(" — ");

    const item = el("div", "timeline-item");
    item.appendChild(el("h3", null, `${escapeHtml(role)}${company ? " · " + escapeHtml(company) : ""}`));
    if (meta) item.appendChild(el("p", "timeline-meta", escapeHtml(meta)));
    if (desc) item.appendChild(el("p", null, escapeHtml(desc)));
    wrap.appendChild(item);
  });
}

function renderSkills(skills) {
  const wrap = document.getElementById("skills-list");
  wrap.innerHTML = "";
  if (!skills.length) {
    wrap.appendChild(el("p", "empty", "no skills returned"));
    return;
  }
  skills.forEach((s) => {
    const name = pick(s, ["name", "skill", "skill_name"], "");
    if (!name) return;
    wrap.appendChild(el("span", "chip", escapeHtml(name)));
  });
}

function renderEducation(items) {
  const wrap = document.getElementById("education-list");
  wrap.innerHTML = "";
  if (!items.length) {
    wrap.appendChild(el("p", "empty", "no education returned"));
    return;
  }
  items.forEach((e) => {
    const degree = pick(e, ["degree", "course", "qualification"], "Degree");
    const institution = pick(e, ["institution", "school", "college", "university"], "");
    const year = pick(e, ["year", "duration", "graduation_year"], "");

    const item = el("div", "stack-item");
    const left = el("div");
    left.appendChild(el("h3", null, escapeHtml(degree)));
    if (institution) left.appendChild(el("p", null, escapeHtml(institution)));
    item.appendChild(left);
    if (year) item.appendChild(el("span", "meta", escapeHtml(String(year))));
    wrap.appendChild(item);
  });
}

function renderCertifications(items) {
  const wrap = document.getElementById("certifications-list");
  wrap.innerHTML = "";
  if (!items.length) {
    wrap.appendChild(el("p", "empty", "no certifications returned"));
    return;
  }
  items.forEach((c) => {
    const name = pick(c, ["name", "title", "certification_name"], "Certification");
    const issuer = pick(c, ["issuer", "organization", "platform"], "");
    const date = pick(c, ["date", "year", "issued_date"], "");

    const item = el("div", "stack-item");
    const left = el("div");
    left.appendChild(el("h3", null, escapeHtml(name)));
    if (issuer) left.appendChild(el("p", null, escapeHtml(issuer)));
    item.appendChild(left);
    if (date) item.appendChild(el("span", "meta", escapeHtml(String(date))));
    wrap.appendChild(item);
  });
}

function renderLinks(links) {
  const wrap = document.getElementById("links-list");
  wrap.innerHTML = "";
  if (!links.length) {
    wrap.appendChild(el("p", "empty", "no social links returned"));
    return;
  }
  links.forEach((l) => {
    const platform = pick(l, ["platform", "name", "type"], "Link");
    const url = pick(l, ["url", "link", "href"], "#");
    const a = el("a", "chip", escapeHtml(platform));
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    wrap.appendChild(a);
  });
}

// ---------- init ----------
runRequest();
