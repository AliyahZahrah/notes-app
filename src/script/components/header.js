class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        header {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          background-color: #6A42C2;
          color: #FFF7D1;
          padding: 5px;
          font-size: 20px;
        }
        img {
          width: 70px;
          height: 70px;
          margin-right: 15px;
        }
      </style>
      <header>
        <img src="notes.png" alt="Notes Logo">
        <h1>Notes App</h1>
      </header>
    `;
  }
}
customElements.define('app-header', AppHeader);
