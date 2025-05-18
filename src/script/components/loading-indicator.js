class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .loading-container p {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: #563A9C;
          font-weight: bold;
        }

        .loading-indicator {
          border: 16px solid #8B5DFF;
          border-radius: 50%;
          border-top: 16px solid #563A9C;
          border-bottom: 16px solid #563A9C;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>

      <div class="loading-container">
        <div class="loading-indicator"></div>
        <p>Loading, please wait...</p>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
