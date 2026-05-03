import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class VjjlFooter extends DDDSuper(LitElement) {
  static get tag() { return "vjjl-footer"; }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        padding: 40px 20px;
        background: #fff;
        color: #000;
        border-top: 4px solid var(--ddd-theme-default-original87Red);
      }
      .footer-wrap {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .socials {
        display: flex; /* Horizontal alignment */
        gap: 40px;
      }
      .socials a {
        text-decoration: none;
        color: #000;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1.2rem;
      }
      .socials a:hover { color: var(--ddd-theme-default-original87Red); }
      @media (max-width: 768px) {
        .footer-wrap { flex-direction: column; gap: 20px; text-align: center; }
      }
    `];
  }

  render() {
    return html`
      <div class="footer-wrap">
        <div>© 2026 VJJL</div>
        <div class="socials">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    `;
  }
}
customElements.define(VjjlFooter.tag, VjjlFooter);