import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class VjjlTeamCard extends DDDSuper(LitElement) {
  static get tag() { return "vjjl-team-card"; }

  static get properties() {
    return {
      name: { type: String },
      rank: { type: String },
      image: { type: String },
      description: { type: String }
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        background: #1a1a1a;
        color: white;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #333;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      :host(:hover) {
        transform: translateY(-10px);
        border-color: var(--ddd-theme-default-original87Red);
        box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2);
      }
      .image-container {
        width: 100%;
        height: 200px;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .placeholder { color: #555; font-weight: bold; }
      .content { padding: 1.5rem; }
      .name { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--ddd-theme-default-original87Red); }
      .rank { font-size: 1rem; opacity: 0.8; font-style: italic; }
    `];
  }

  render() {
    return html`
      <div class="card">
        <div class="image-container">
          ${this.image 
            ? html`<img src="${this.image}" alt="${this.name}" />` 
            : html`<div class="placeholder">PHOTO PENDING</div>`}
        </div>
        <div class="content">
          <div class="name">${this.name}</div>
          <div class="rank">${this.rank}</div>
        </div>
      </div>
    `;
  }
}
customElements.define(VjjlTeamCard.tag, VjjlTeamCard);