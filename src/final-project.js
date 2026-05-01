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
      menuItems: { type: Array }
    };
  }

  constructor() {
    super();
    this.view = this.getViewFromUrl();
    this.activeIndex = 0;
    this.schedule = [];
    this.menuItems = [
      { title: "Home", page: "home" },
      { title: "Schedule", page: "schedule" },
      { title: "Teams", page: "team" },
      { title: "About", page: "about" }
    ];
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

        .logo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .page-section {
          padding: 2rem;
          background: var(--vjjl-header);
          margin: 2rem;
          border-radius: 8px;
          color: var(--vjjl-text);
        }

        .page-section h1,
        .page-section h2,
        .page-section h3 {
          color: var(--vjjl-text);
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .contact-info {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 2px solid var(--vjjl-accent);
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .back-btn {
          background: transparent;
          color: var(--vjjl-text);
          border: none;
          padding: 0;
          cursor: pointer;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .back-btn:hover {
          color: var(--ddd-theme-default-original87Red);
        }

        @media (max-width: 768px) {
          .nav-area {
            align-items: flex-end;
            flex-direction: column;
          }
        }
      `,
    ];
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
      <section class="page-section">
        <h2>League Full Schedule</h2>
        <!-- Weekly event strip placed in the previously blank space to tighten layout -->
        <vjjl-event-strip></vjjl-event-strip>
        <vjjl-full-calendar></vjjl-full-calendar>
      </section>
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
            rank="League Contender"
            image="${new URL("./assets/team-redline.jpg", import.meta.url).href}"
            @click="${() => this.goToPage('team-redline')}"
          ></vjjl-team-card>

          <vjjl-team-card
            name="Clutch Grappling"
            rank="League Contender"
            image="${new URL("./assets/clutch-grappling.jpg", import.meta.url).href}"
            @click="${() => this.goToPage('clutch-grappling')}"
          ></vjjl-team-card>

          <vjjl-team-card
            name="Garage Guard"
            rank="League Contender"
            image="${new URL("./assets/garage-guard.jpg", import.meta.url).href}"
            @click="${() => this.goToPage('garage-guard')}"
          ></vjjl-team-card>
        </div>
      </section>
    `;
  }

  renderRoster(teamName) {
    const roles = ["Head Coach", "Featherweight", "Middleweight", "Heavyweight", "Open Division"];
    return html`
      <section class="page-section">
        <button class="back-btn" @click="${() => this.goToPage('team')}">← Back to Teams</button>
        <h1>${teamName} Roster</h1>
        <div class="card-grid">
          ${roles.map(role => html`
            <vjjl-team-card name="TBD" rank="${role}" image=""></vjjl-team-card>
          `)}
        </div>
      </section>
    `;
  }

  renderAbout() {
    return html`
      <section class="page-section">
        <h1>About the VJJL</h1>
        <p>
          The Vehicular Jiu-Jitsu League (VJJL) wasn't born in a traditional BJJ gym, it was born in the front seat of a sedan. 
          Founded by <strong>Elijah Knarr and Jake Butler</strong>, the league was created to answer a question everyone has: 
          How does grappling change when you add steering wheels, seatbelts, and a center console?
        </p>
        
        <h3>The Rules of the Road</h3>
        <p>
          Matches take place entirely within the cabin of a stationary vehicle. It’s the ultimate high-stakes match.
        </p>
        <ul>
          <li><strong>5-Minute Rounds:</strong> Pure grappling intensity.</li>
          <li><strong>Seatbelt Legal:</strong> The seatbelt is an extension of the Gi and can be used for chokes.</li>
          <li><strong>Position Before Ignition:</strong> Athletes start buckled in.</li>
          <li><strong>No Striking:</strong> Leverage and technique are the only paths to victory.</li>
        </ul>

        <div class="contact-info">
          <h2>Contact Us</h2>
          <p><strong>Address:</strong> 253 W Main St, Freehold, NJ 07728</p>
          <p><strong>Phone:</strong> (732) 555-0198</p>
          <p><strong>Email:</strong> <a href="mailto:tapout@vjjl-grappling.com" style="color: var(--vjjl-red);">tapout@vjjl-grappling.com</a></p>
        </div>
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
      case "team-redline":
        return this.renderRoster("TEAM REDLINE");
      case "clutch-grappling":
        return this.renderRoster("CLUTCH GRAPPLING");
      case "garage-guard":
        return this.renderRoster("GARAGE GUARD");
      default:
        return this.renderHome();
    }
  }

  render() {
    return html`
      <header>
        <button class="logo-container" @click="${() => this.goToPage("home")}">
          <img src="${new URL("./assets/vjjl-logo-cropped.jpg", import.meta.url).href}" alt="VJJL Logo" />
        </button>
        <div class="nav-area">
          <vjjl-nav-menu
            .items=${this.menuItems}
            .currentPage=${this.view}
            @page-changed=${(e) => this.goToPage(e.detail.page)}
          ></vjjl-nav-menu>
        </div>
      </header>

      <main>
        ${this.renderView()}
      </main>

      <vjjl-footer></vjjl-footer>
    `;
  }
}

customElements.define(FinalProject.tag, FinalProject);