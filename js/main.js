window.addEventListener("load", () => {
  renderSkills();
  renderProjects();
  renderContact();
  initScrollSpy();
});

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
grid.innerHTML = PORTFOLIO_DATA.skills.map(skill => `
    <div class="skill-card">
      <p class="skill-category">${skill.category}</p>
      <div class="tags">
        ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
grid.innerHTML = PORTFOLIO_DATA.projects.map(project => `
    <div class="project-card ${!project.github ? 'placeholder' : ''}">
      <p class="project-tech">${project.tech}</p>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-links">
        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub ↗</a>` : ""}
        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link">Live Demo ↗</a>` : ""}
      </div>
    </div>
  `).join("");
}

function renderContact() {
  const el = document.getElementById("contact-links");
  if (!el) return;
  const c = PORTFOLIO_DATA.contact;
  el.innerHTML = `
    <div class="contact-card">
      <div class="contact-item">
        <p class="contact-label">GitHub</p>
        <a href="https://${c.github}" target="_blank" class="contact-value">${c.github}</a>
      </div>
      <div class="divider"></div>
      <div class="contact-item">
        <p class="contact-label">Kariyer.net</p>
        <a href="https://${c.kariyer}" target="_blank" class="contact-value">${c.kariyer}</a>
      </div>
       <div class="divider"></div>
      <div class="contact-item">
        <p class="contact-label">LinkedIn</p>
        <a href="https://${c.linkedin}" target="_blank" class="contact-value">${c.linkedin}</a>
      </div>
      <div class="divider"></div>
      <div class="contact-item">
        <p class="contact-label">Location</p>
        <p class="contact-value">${c.location}</p>
      </div>
    </div>
  `;
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}