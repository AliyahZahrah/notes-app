import { gsap } from 'gsap';
import Swal from 'sweetalert2';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set note(note) {
    this._note = note;
    this.setAttribute('data-id', note.id);
    this.render();
  }

  render() {
    const isArchived = this._note.archived;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; box-sizing: border-box; }
        .note {
          background: #FFF7D1;
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 -2px 10px #6A42C2, 0 4px 6px #6A42C2;
          display: flex;
          flex-direction: column;
          word-wrap: break-word;
        }
        .note:hover { transform: scale(1.02); transition: transform .3s; }
        .note h3 { color: #8B5DFF; margin-bottom: 10px; }
        .note p { color: #563A9C; margin-bottom: 10px; }
        .note small { font-size: 11px; color: #6A42C2; text-align: right; }
        .button-group {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 10px;
        }
        button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #563A9C;
          color: #FFF7D1;
          border: none;
          border-radius: 5px;
          padding: 8px 12px;
          font-weight: bold;
          cursor: pointer;
        }
        button:hover { background: #8B5DFF; }
      </style>
      <div class="note">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <small>${new Date(this._note.createdAt).toLocaleString()}</small>
        <div class="button-group">
          <button class="delete-btn">
            <ion-icon name="trash-sharp"></ion-icon>
            Delete
          </button>
          <button class="archive-btn">
            <ion-icon name="${isArchived ? 'bookmark-outline' : 'bookmark'}"></ion-icon>
            ${isArchived ? 'Unarchive' : 'Archive'}
          </button>
        </div>
      </div>
    `;

    gsap.from(this.shadowRoot.querySelector('.note'), {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
    });

    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#563A9C',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dispatchEvent(
            new CustomEvent('note-deleted', {
              detail: this._note.id,
              bubbles: true,
              composed: true,
            }),
          );
        }
      });
    });

    this.shadowRoot.querySelector('.archive-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-archive-toggle', {
          detail: this._note,
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}

customElements.define('note-item', NoteItem);
