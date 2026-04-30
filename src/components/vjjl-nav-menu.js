import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class VjjlNavMenu extends DDDSuper(LitElement) {
  static get tag() { return "vjjl-nav-menu"; }
  static get properties() { return { items: { type: Array }, currentPage: { type: String } }; }
  static get styles() {
    return [super.styles, css`
      
      
      .menu {
  display: flex;
  gap: var(--ddd-spacing-4);
}


:host a {
  text-decoration: none;
  color: var(--vjjl-red);
font-family: var(--ddd-font-navigation);
  font-weight: 700;
  padding: var(--ddd-spacing-2);
}


:host a:hover {
  text-decoration: underline;
  text-shadow: 0 0 4px var(--vjjl-red);
}


:host a.active {
  border-bottom: 3px solid var(--vjjl-red);

  text-shadow: 0 0 6px var(--vjjl-red);

  transition: all 0.2s ease;
}
    `];
  }
  goToPage(page, e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("page-changed", { detail: { page }, bubbles: true, composed: true }));
  }
  render() {
  return html`
    <nav class="menu">
      ${this.items.map(item => html`
        <a
          href="?page=${item.page}"
          style="color: var(--ddd-theme-default-original87Red);"
          class="${this.currentPage === item.page ? "active" : ""}"
          @click="${(e) => this.goToPage(item.page, e)}"
        >
          ${item.title}
        </a>
      `)}
    </nav>
  `;
}
}
customElements.define(VjjlNavMenu.tag, VjjlNavMenu);