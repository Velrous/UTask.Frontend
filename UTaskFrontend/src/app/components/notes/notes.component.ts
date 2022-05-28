import { Component, OnInit } from '@angular/core';
import {Note} from "../../models/note";
import {NoteService} from "../../services/note.service";
import {DataState} from "../../models/data-state";
import {faMagnifyingGlass, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {CompositeFilter} from "../../models/composite-filter";
import {FilterOptions} from "../../models/filter-options";
import {SortingOptions} from "../../models/sorting-options";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;

  notes: Note[] = [];
  editableNote?: Note;
  descriptionFilter = new FilterOptions("Description", "contains", "");
  dataState = new DataState(1,5,0, new CompositeFilter("and", []),
    [ new SortingOptions("Created", "desc") ]);
  description: string = "";

  isLoading = false;
  isEdited = false;

  constructor(
    private service: NoteService
  ) { }

  async createNote(): Promise<void> {
    //TODO Добавить вывод ошибки, если пустой текст
    let note = new Note(0, this.description, new Date());
    await this.service.createNote(note);
    this.description = "";
    await this.getNotes();
  }

  async applyFilter(event: Event) {
    this.descriptionFilter.value = (event.target as HTMLInputElement).value;
    this.dataState.filter.options = [];
    this.dataState.filter.options.push(this.descriptionFilter);
    await this.getNotes();
  }

  async getNotes(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getNotes(this.dataState);
    this.notes = pageData.data;
    this.dataState.collectionSize = pageData.totalCount;
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
