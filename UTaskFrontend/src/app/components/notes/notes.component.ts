import { Component, OnInit } from '@angular/core';
import {Note} from "../../models/note";
import {NoteService} from "../../services/note.service";
import {TableState} from "../../models/table-state";
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  notes: Note[] = [];
  editableNote?: Note;
  tableState = new TableState(1, 5, 0);
  description: string = "";

  isLoading = false;
  isEdited = false;
  test = "";

  constructor(
    private service: NoteService ) { }

  async createNote(): Promise<void> {
    //TODO Добавить вывод ошибки, если пустой текст
    let note = new Note(0, this.description, new Date());
    await this.service.createNote(note);
    this.description = "";
    await this.getNotes();
  }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableState.filter = filterValue;
    await this.getNotes();
  }

  async getNotes(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getNotes(this.tableState);
    this.notes = pageData.data;
    this.tableState.collectionSize = pageData.totalCount;
    this.isLoading = false;
  }

  async editNote(note: Note): Promise<void> {
    this.editableNote = note;
    this.description = this.editableNote.Description;
    this.isEdited = true;
  }

  async updateNote(): Promise<void> {
    if(this.editableNote && this.description.length > 0) {
      this.editableNote.Description = this.description;
      await this.service.updateNote(this.editableNote);
      this.editableNote = undefined;
      this.description = "";
      this.isEdited = false;
      await this.getNotes();
    }
  }

  async deleteNote(id: number): Promise<void> {
    await this.service.deleteNote(id);
    await this.getNotes();
  }

  async discardChange(): Promise<void> {
    this.editableNote = undefined;
    this.description = "";
    this.isEdited = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getNotes();
  }
}
