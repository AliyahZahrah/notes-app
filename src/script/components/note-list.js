import api from '../data/utils/notes-api.js';
import Swal from 'sweetalert2';

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
    this.archived = false;
  }

  static get observedAttributes() {
    return ['archived'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'archived') {
      this.archived = newVal === 'true';
    }
  }

  async connectedCallback() {
    this.renderLoading();

    document.addEventListener('note-added', (e) => {
      if (!this.archived) this.addNote(e.detail);
    });

    document.addEventListener('note-deleted', async (e) => {
      try {
        await api.deleteNote(e.detail);
        this._notes = this._notes.filter((n) => n.id !== e.detail);
        this.render();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '⚠️ Failed to delete note from server.',
        });
      }
    });

    document.addEventListener('note-archive-toggle', async (e) => {
      const note = e.detail;
      try {
        if (note.archived) {
          await api.unarchiveNote(note.id);
        } else {
          await api.archiveNote(note.id);
        }
        await this.loadNotes();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '⚠️ Failed to change archive status of notes.',
        });
      }
    });

    await this.loadNotes();
  }

  async loadNotes() {
    this.renderLoading();
    try {
      const notes = this.archived ? await api.getArchivedNotes() : await api.getNotes();
      this._notes = notes;
      this.render();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '⚠️ Failed to load notes. Please try again.',
      });
      this.shadowRoot.innerHTML = `
        <p style="color:red; text-align:center;">⚠️ Failed to load notes. Please try again.</p>
      `;
    }
  }

  addNote(note) {
    this._notes = [...this._notes, note];
    this.render();
  }

  renderLoading() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-height: 200px;
          box-sizing: border-box;
        }
        .loading-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
      </style>
      <div class="loading-wrapper">
        <loading-indicator></loading-indicator>
      </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this._notes.forEach((note) => {
      const node = document.createElement('note-item');
      node.note = note;
      this.shadowRoot.appendChild(node);
    });
  }
}

customElements.define('note-list', NoteList);
