class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          text-align: center;
          padding: 1rem;
          background-color: #563A9C;
          color: #FFF7D1;
          font-weight: bold;
        }
      </style>
      <footer>
        <p>Aliyah Zahrah FC-11 &copy; Coding Camp 2025 powered by DBS Foundation</p>
      </footer>
    `;
  }
}
customElements.define('app-footer', AppFooter);
