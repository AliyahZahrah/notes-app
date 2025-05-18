import api from '../data/utils/notes-api.js';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input, textarea {
          padding: 10px;
          border: 1px solid #8B5DFF;
          border-radius: 5px;
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #563A9C;
          color: #FFF7D1;
          border: none;
          border-radius: 5px;
          padding: 10px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover {
          background-color: #8B5DFF;
        }
        ion-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
        .error {
          color: red;
          font-size: 12px;
        }
      </style>
      <form id="note-form">
        <input type="text" id="title" placeholder="Title" required />
        <span class="error" id="title-error"></span>
        <textarea id="body" placeholder="Write your note here..." required></textarea>
        <span class="error" id="body-error"></span>
        <button type="submit">
          <ion-icon name="add-circle-outline"></ion-icon>
          Add Note
        </button>
      </form>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('#note-form');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const titleError = this.shadowRoot.querySelector('#title-error');
    const bodyError = this.shadowRoot.querySelector('#body-error');

    titleInput.addEventListener('input', () => {
      titleError.textContent = titleInput.value.trim() ? '' : 'Title is required';
    });
    bodyInput.addEventListener('input', () => {
      bodyError.textContent = bodyInput.value.trim() ? '' : 'Body cannot be empty';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!titleInput.value.trim()) {
        titleError.textContent = 'Title is required';
        return;
      }
      if (!bodyInput.value.trim()) {
        bodyError.textContent = 'Body cannot be empty';
        return;
      }
      try {
        const newNote = await api.createNote({
          title: titleInput.value,
          body: bodyInput.value,
        });
        document.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));
        titleInput.value = '';
        bodyInput.value = '';

        gsap.from(form, {
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '⚠️ Failed to save note to server.',
        });
      }
    });
  }
}

customElements.define('note-form', NoteForm);
