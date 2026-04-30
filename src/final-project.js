import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./components/vjjl-team-card.js";
import "./components/vjjl-nav-menu.js";
import "./components/vjjl-logo.js";
import "./components/vjjl-footer.js";
import "./components/vjjl-content-band.js";
import "./components/vjjl-full-calander.js";
import "./components/vjjl-event-strip.js";

export class FinalProject extends DDDSuper(LitElement) {
  static get tag() {
    return "final-project";
  }

  static get properties() {
  return {
    view: { type: String },
    activeIndex: { type: Number },
    schedule: { type: Array },
    menuItems: { type: Array },
    menuOpen: { type: Boolean }
  };
}

  constructor() {
    super();
    this.view = this.getViewFromUrl();
    this.activeIndex = 0;
    this.schedule = [];
    this.menuItems = [];
    this.menuOpen = false;
    this.images = [
  new URL("./assets/slideshowimg.jpg", import.meta.url).href,
  new URL("./assets/slideshowimg1.jpg", import.meta.url).href,
  new URL("./assets/slideshowimg2.jpg", import.meta.url).href
];
  }

  getViewFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

goToPage(page) {
  this.view = page;

  const url = new URL(window.location.href);
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
}

handlePopState = () => {
  this.view = this.getViewFromUrl();
};

connectedCallback() {
  super.connectedCallback();
  window.addEventListener("popstate", this.handlePopState);
}

disconnectedCallback() {
  window.removeEventListener("popstate", this.handlePopState);
  super.disconnectedCallback();
}

  async firstUpdated() {
  setInterval(() => {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }, 5000);

  try {
  const res = await fetch("/api/schedule");
  if (!res.ok) throw new Error("Schedule API not found");
  this.schedule = await res.json();
} catch (e) {
  console.error("Schedule API failed:", e);
  this.schedule = [];
}

try {
  const menuRes = await fetch("/api/menu");
  if (!menuRes.ok) throw new Error("Menu API not found");
  this.menuItems = [
    { title: "Home", page: "home" },
    { title: "Schedule", page: "schedule" },
    { title: "Team", page: "team" },
    { title: "About", page: "about" }
  ];
} catch (e) {
  console.error("Menu API failed:", e);
}
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100vh;
          font-family: var(--ddd-font-navigation);

          color-scheme: light dark;

          --vjjl-red: var(--ddd-theme-default-original87Red);
          --vjjl-bg: var(--ddd-theme-default-original87Red);
          --vjjl-header: #ffffff;
          --vjjl-text: #000000;
          --vjjl-accent: #000000;
          background-color: var(--vjjl-bg);
          color: var(--vjjl-text);
        }

        /* DARK MODE: Black background, Red accents, White text */
        @media (prefers-color-scheme: dark) {
          :host {
            --vjjl-bg: #000000;
            --vjjl-header: #1a1a1a;
            --vjjl-text: #ffffff;
            --vjjl-accent: var(--ddd-theme-default-original87Red);
            
          }
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--vjjl-header);
          border-bottom: 4px solid var(--vjjl-accent);
        }

        .logo-container {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  border: 2px solid var(--ddd-theme-default-original87Red);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.logo-container:hover {
  transform: scale(1.08) rotate(-4deg);
  box-shadow: 0 0 18px rgba(255, 0, 0, 0.45);
}

.logo-container:active {
  transform: scale(0.96);
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
        /* Hero / Slideshow */
        .hero {
          position: relative;
          height: 500px;
          background: #000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        .hero img.active {
          opacity: 0.6;
        }

        .hero-overlay {
          position: relative;
          z-index: 2;
          color: white;
          text-align: center;
          background: rgba(0,0,0,0.4);
          padding: 2rem;
          border: 2px solid var(--ddd-theme-default-original87Red);
        }


        .calendar-container {
          padding: 2rem;
          background: var(--vjjl-header);
          margin: 2rem;
          border-radius: 8px;
          color: var(--vjjl-text);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          margin-top: 1rem;
        }

        .cal-day {
          border: 1px solid #ccc;
          padding: 1rem;
          min-height: 80px;
        }
        .circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--ddd-theme-default-original87Red);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.page-section {
  padding: 2rem;
  background: var(--vjjl-header);
  margin: 2rem;
  border-radius: 8px;
  color: var(--vjjl-text);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.home-slideshow {
  position: relative;
  min-height: 650px;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-slideshow img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.home-slideshow img.active {
  opacity: 0.65;
}

.home-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.45);
  padding: 2rem 3rem;
  border: 2px solid var(--ddd-theme-default-original87Red);
  border-radius: 8px;
}

.home-overlay h1 {
  font-size: 4rem;
  margin: 0;
  text-transform: uppercase;
}

.nav-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  background: var(--ddd-theme-default-original87Red);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}



@media (max-width: 768px) {
  .nav-area {
    align-items: flex-end;
    flex-direction: column;
  }

  .menu-toggle {
    display: block;
  }

  nav {
    display: none;
    flex-direction: column;
    gap: 1rem;
    background: var(--vjjl-header);
    padding: 1rem;
    border-radius: 8px;
  }

  nav.open {
    display: flex;
  }
}
      `,
    ];
  }

  render() {
    return html`
      <header>
  <button class="logo-container" @click="${() => this.goToPage("home")}">
    <img src="${new URL("./assets/vjjl-logo-cropped.jpg", import.meta.url).href}" alt="VJJL Logo" />
  </button>
        <div class="nav-area">
  <button class="menu-toggle" @click="${() => (this.menuOpen = !this.menuOpen)}">
    Menu
  </button>
  <vjjl-nav-menu
  .items=${this.menuItems}
  .currentPage=${this.view}
  @page-changed=${(e) => this.goToPage(e.detail.page)}
></vjjl-nav-menu>
</div>
      </header>

      <main>
  ${this.renderView()}
  <vjjl-footer></vjjl-footer>
</main>
    `;
  }
renderHome() {
  return html`
    <section class="home-slideshow">
      ${this.images.map(
        (img, i) => html`
          <img
            src="${img}"
            class="${this.activeIndex === i ? "active" : ""}"
            alt="VJJL slideshow image"
          />
        `
      )}

      <div class="home-overlay">
        <h1>Welcome to the VJJL</h1>
        <p>Where grappling meets the open road.</p>
      </div>
    </section>

    <vjjl-event-strip></vjjl-event-strip>

    <vjjl-content-band>
      <h2>About the League</h2>
      <p>Vehicular Jiu-Jitsu blends grappling with tactical vehicle positioning.</p>
    </vjjl-content-band>
  `;
}

renderSchedule() {
  return html`
    <vjjl-full-calendar></vjjl-full-calendar>
  `;

  return html`
    <div class="calendar-container">
      <h2>April 2026 League Calendar</h2>

      <div class="calendar-grid">
        ${days.map(
          day => html`<div class="calendar-header">${day}</div>`
        )}

        ${Array.from({ length: 35 }, (_, i) => {
          const dayNum = i + 1;
          return html`
            <div class="cal-day">
              <strong>${dayNum <= 30 ? dayNum : ""}</strong>
              ${matches[dayNum]
                ? html`<div class="match-event">${matches[dayNum]}</div>`
                : ""}
            </div>
          `;
        })}
      </div>
    </div>
  `;
}

renderTeam() {
  return html`
    <section class="page-section">
      <h1>VJJL Teams</h1>
      <p>Meet the competitors and staff of the league.</p>

      <div class="card-grid">
        <vjjl-team-card
  name="Team Redline"
  rank="Blue Belt"
  image="${new URL("./assets/team-redline.jpg", import.meta.url).href}"
  description="Technical control and precision finishes."
></vjjl-team-card>

<vjjl-team-card
  name="Clutch Grappling"
  rank="Purple Belt"
  image="${new URL("./assets/clutch-grappling.jpg", import.meta.url).href}"
  description="Fast, aggressive, high-pressure grappling."
></vjjl-team-card>

<vjjl-team-card
  name="Garage Guard"
  rank="Brown Belt"
  image="${new URL("./assets/garage-guard.jpg", import.meta.url).href}"
  description="Grip, position, and domination inside the vehicle."
></vjjl-team-card>
      </div>
    </section>
  `;
}

renderAbout() {
  return html`
    <section class="page-section">  
    <h1>About the VJJL</h1>
      <p>
        The Vehicular Jiu-Jitsu League is a competitive platform combining
        grappling with vehicle-based scenarios.
      </p>
    </section>
  `;
}

renderView() {
  switch (this.view) {
    case "home":
      return this.renderHome();
    case "schedule":
      return this.renderSchedule();
    case "team":
      return this.renderTeam();
    case "about":
      return this.renderAbout();
    default:
      return this.renderHome();
  }
}
}

customElements.define(FinalProject.tag, FinalProject);