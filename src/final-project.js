import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./components/vjjl-team-card.js";
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
    this.menuOpen = false;
    this.menuItems = [
      
      { 
        title: "Home", 
        page: "home",
        links: [
          { label: "Top", section: "top" },
          { label: "Weekly Schedule", section: "weekly" },
          { label: "League News", section: "news" },
          { label: "About Section", section: "about-band" }
        ]
      },
      { 
        title: "Schedule", 
        page: "schedule",
        links: [
          { label: "Full Calendar", page: "schedule" }
        ]
      },
      { 
        title: "Teams", 
        page: "team",
        links: [
          { label: "All Teams", page: "team" },
          { label: "Team Redline", page: "team-redline" },
          { label: "Clutch Grappling", page: "clutch-grappling" },
          { label: "Garage Guard", page: "garage-guard" }
        ]
      },
      { 
        title: "About", 
        page: "about",
        links: [
          { label: "Our Story", page: "about" }
        ]
      }
    ];
    this.images = [
      new URL("./assets/slideshowimg.jpg", import.meta.url).href,
      new URL("./assets/slideshowimg1.jpg", import.meta.url).href,
      new URL("./assets/slideshowimg2.jpg", import.meta.url).href
    ];

    this.rosters = {
  "TEAM REDLINE": [
    {
      name: "Austin Hollister",
      rank: "Head Coach",
      image: new URL("./assets/rosters/vjjl_player_images/team-redline/austin-hollister.png", import.meta.url).href
    },
    {
      name: "Kyle Caldwell",
      rank: "Featherweight",
      image: new URL("./assets/rosters/vjjl_player_images/team-redline/kyle-caldwell.png", import.meta.url).href
    },
    {
      name: "Grant Whitaker",
      rank: "Middleweight",
      image: new URL("./assets/rosters/vjjl_player_images/team-redline/grant-whitaker.png", import.meta.url).href
    },
    {
      name: "Logan Whitman",
      rank: "Heavyweight",
      image: new URL("./assets/rosters/vjjl_player_images/team-redline/logan-whitman.png", import.meta.url).href
    },
    {
      name: "Trevor Callahan",
      rank: "Open Division",
      image: new URL("./assets/rosters/vjjl_player_images/team-redline/trevor-callahan.png", import.meta.url).href
    }
  ],

  "CLUTCH GRAPPLING": [
    {
      name: "Hayden Worthington",
      rank: "Head Coach",
      image: new URL("./assets/rosters/vjjl_player_images/clutch-grappling/hayden-worthington.png", import.meta.url).href
    },
    {
      name: "Brett Hartley",
      rank: "Featherweight",
      image: new URL("./assets/rosters/vjjl_player_images/clutch-grappling/brett-hartley.png", import.meta.url).href
    },
    {
      name: "Austin Sullivan",
      rank: "Middleweight",
      image: new URL("./assets/rosters/vjjl_player_images/clutch-grappling/austin-sullivan.png", import.meta.url).href
    },
    {
      name: "Austin Ellsworth",
      rank: "Heavyweight",
      image: new URL("./assets/rosters/vjjl_player_images/clutch-grappling/austin-ellsworth.png", import.meta.url).href
    },
    {
      name: "Brandon Holloway",
      rank: "Open Division",
      image: new URL("./assets/rosters/vjjl_player_images/clutch-grappling/brandon-holloway.png", import.meta.url).href
    }
  ],

  "GARAGE GUARD": [
    {
      name: "Brad Granger",
      rank: "Head Coach",
      image: new URL("./assets/rosters/vjjl_player_images/garage-guard/brad-granger.png", import.meta.url).href
    },
    {
      name: "Hayden Granger",
      rank: "Featherweight",
      image: new URL("./assets/rosters/vjjl_player_images/garage-guard/hayden-granger.png", import.meta.url).href
    },
    {
      name: "Brad Beckett",
      rank: "Middleweight",
      image: new URL("./assets/rosters/vjjl_player_images/garage-guard/brad-beckett.png", import.meta.url).href
    },
    {
      name: "Wyatt Fitzgerald",
      rank: "Heavyweight",
      image: new URL("./assets/rosters/vjjl_player_images/garage-guard/wyatt-fitzgerald.png", import.meta.url).href
    },
    {
      name: "Kyle Holloway",
      rank: "Open Division",
      image: new URL("./assets/rosters/vjjl_player_images/garage-guard/kyle-holloway.png", import.meta.url).href
    }
  ]
};
  }

  getViewFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "home";
  }

  goToPage(page, section = null) {
    this.view = page;
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);

    // If a section is provided, scroll to it after rendering
    if (section) {
      setTimeout(() => {
        const el = this.shadowRoot.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          --vjjl-card-bg: #f5f5f5;
          background-color: var(--vjjl-bg);
          color: var(--vjjl-text);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --vjjl-bg: #000000;
            --vjjl-header: #1a1a1a;
            --vjjl-text: #ffffff;
            --vjjl-accent: var(--ddd-theme-default-original87Red);
            --vjjl-card-bg: #222222;
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

        /* Dropdown Navigation Styles */
        nav {
          display: flex;
          gap: 1.5rem;
        }

        .nav-item {
          position: relative;
          display: inline-block;
        }

        .nav-button {
          background: none;
          border: none;
          font-family: inherit;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          padding: 10px;
          color: var(--vjjl-text);
          transition: color 0.2s ease;
        }

        .nav-button:hover {
          color: var(--vjjl-red);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: var(--vjjl-header);
          min-width: 180px;
          box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
          z-index: 100;
          border-top: 3px solid var(--vjjl-red);
          border-radius: 0 0 4px 4px;
        }

        .nav-item:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          color: var(--vjjl-text);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          font-size: 0.9rem;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .dropdown-content a:hover {
          background-color: var(--vjjl-card-bg);
          color: var(--vjjl-red);
        }

        /* Interactive Weekly Schedule */
        vjjl-event-strip {
          display: block;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
        }

        vjjl-event-strip:hover {
          transform: scale(1.01);
          cursor: pointer;
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

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .news-card {
          background: var(--vjjl-card-bg);
          /* Injecting the requested background image */
          background-image: linear-gradient(rgba(245, 245, 245, 0.9), rgba(245, 245, 245, 0.9)), url('image_89b8b8.jpg');
          background-size: cover;
          background-position: center;
          border-left: 5px solid var(--vjjl-red);
          padding: 1.5rem;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-left-color 0.3s ease;
          cursor: default;
        }

        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
          border-left-color: #ff4d4d;
        }

        .news-card h4 {
          margin: 0 0 10px 0;
          color: var(--vjjl-red);
          text-transform: uppercase;
          font-weight: bold;
        }

        .news-card p {
          font-size: 0.95rem;
          line-height: 1.4;
          margin-bottom: 0;
          color: #000; /* Ensuring text stays legible over the background */
        }

        @media (prefers-color-scheme: dark) {
          .news-card {
            background-image: linear-gradient(rgba(34, 34, 34, 0.9), rgba(34, 34, 34, 0.9)), url('image_89b8b8.jpg');
          }
          .news-card p { color: #fff; }
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

        .hamburger {
  display: none;
  background: none;
  border: 2px solid var(--vjjl-accent);
  color: var(--vjjl-text);
  font-size: 1.8rem;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  border-radius: 6px;
}

@media (max-width: 768px) {
  header {
    position: relative;
  }

  .hamburger {
    display: block;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    right: 1rem;
    left: 1rem;
    background: var(--vjjl-header);
    border: 2px solid var(--vjjl-accent);
    border-radius: 8px;
    padding: 1rem;
    z-index: 999;
    flex-direction: column;
  }

  nav.open {
    display: flex;
  }

  .nav-item {
    width: 100%;
  }

  .nav-button {
    width: 100%;
    text-align: left;
  }

  .dropdown-content {
    position: static;
    display: block;
    box-shadow: none;
    border-top: none;
    background: transparent;
    padding-left: 1rem;
  }
}
      `,
    ];
  }

  renderHome() {
    return html`
      <div id="top"></div>
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

      <div id="weekly">
        <vjjl-event-strip></vjjl-event-strip>
      </div>

      <vjjl-content-band id="news">
        <h2>League News</h2>
        <div class="news-grid">
          <div class="news-card">
            <h4>Redline Sweeps Quals</h4>
            <p>Team Redline absolutely dominated the Thursday night Open Div Qualifiers. Their anchor player pulled off a stunning seatbelt-assisted triangle in the final two minutes, proving that the SUV bracket is still their territory to lose.</p>
          </div>
          <div class="news-card">
            <h4>Rules Committee Update</h4>
            <p>The VJJL board met this morning to clarify seatbelt usage. Moving forward, "passive tension" from the retractable belt is allowed for posture control, but manual locking for chokes remains the gold standard for technique points.</p>
          </div>
          <div class="news-card">
            <h4>Freehold Open Registration</h4>
            <p>Sign-ups are officially live for the Freehold Open. We're moving to the larger lot this month to accommodate the Heavyweight division. Grab your mouthpiece and make sure your registration is submitted by Monday night.</p>
          </div>
        </div>
      </vjjl-content-band>

      <vjjl-content-band id="about-band">
        <h2>About the League</h2>
        <p>Vehicular Jiu-Jitsu blends grappling with tactical vehicle positioning.</p>
      </vjjl-content-band>
    `;
  }

  renderSchedule() {
    return html`
      <section class="page-section">
        <h2>League Full Schedule</h2>
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
    const roster = this.rosters[teamName];
    return html`
      <section class="page-section">
        <button class="back-btn" @click="${() => this.goToPage('team')}">← Back to Teams</button>
        <h1>${teamName} Roster</h1>
        <div class="card-grid">
          ${roster.map(member => html`
<vjjl-team-card
  name="${member.name}"
  rank="${member.rank}"
  image="${member.image}"
></vjjl-team-card>          `)}
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
        <img
          src="${new URL("./assets/vjjl-logo-cropped.jpg", import.meta.url).href}"
          alt="VJJL Logo"
        />
      </button>

      <button
        class="hamburger"
        @click="${() => (this.menuOpen = !this.menuOpen)}"
      >
        ☰
      </button>

      <nav class="${this.menuOpen ? "open" : ""}">
        ${this.menuItems.map(item => html`
          <div class="nav-item">
            <button
              class="nav-button"
              @click="${() => {
                this.goToPage(item.page);
                this.menuOpen = false;
              }}"
            >
              ${item.title}
            </button>

            <div class="dropdown-content">
              ${item.links.map(link => html`
                <a
                  href="javascript:void(0)"
                  @click="${() => {
                    this.goToPage(link.page || item.page, link.section);
                    this.menuOpen = false;
                  }}"
                >
                  ${link.label}
                </a>
              `)}
            </div>
          </div>
        `)}
      </nav>
    </header>

    <main>
      ${this.renderView()}
    </main>

    <vjjl-footer></vjjl-footer>
  `;
}
}

customElements.define(FinalProject.tag, FinalProject);