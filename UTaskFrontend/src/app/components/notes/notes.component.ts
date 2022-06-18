import { Component, OnInit } from '@angular/core';
import {Note} from "../../models/note";
import {NoteService} from "../../services/note.service";
import {DataState} from "../../models/data-state";
import {faBars, faMagnifyingGlass, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {CompositeFilter} from "../../models/composite-filter";
import {FilterOptions} from "../../models/filter-options";
import {SortingOptions} from "../../models/sorting-options";
import {DialogService} from "../../dialogs/dialog.service";
import {TableFilter} from "../../models/table-filter";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;
  faBars = faBars;

  notes: Note[] = [];
  editableNote?: Note;
  descriptionTableFilter: TableFilter = new TableFilter([], -1, false, false, false);
  createDateTimeTableFilter: TableFilter = new TableFilter([], -1, false, true, false);
  descriptionFilter = new FilterOptions("Description", "contains", "");
  dataState = new DataState(1,5,0, new CompositeFilter("and", []), []);
  description: string = "";

  isLoading = false;
  isEdited = false;

  constructor(
    private service: NoteService,
    private dialogService: DialogService
  ) { }

  async createNote(): Promise<void> {
    if (this.description.length > 0) {
      let note = new Note(0, this.description, new Date());
      await this.service.createNote(note);
      this.description = "";
      await this.getNotes();
    }
    else {
      this.dialogService.openErrorDialog("Заметка не может быть пустая");
    }
  }

  async openDescriptionTableFilter() {
    await this.dialogService.openDescriptionTableFilter(this.descriptionTableFilter, this.dataState);
    this.getNotes().then();
  }

  async openCreateDateTimeTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.createDateTimeTableFilter, this.dataState);
    this.getNotes().then();
  }

  async applyFilter(event: Event) {
    this.descriptionFilter.value = (event.target as HTMLInputElement).value;
    const index = this.dataState.filter.options.findIndex(x => x.field == 'Description');
    if(index == -1) {
      this.dataState.filter.options.push(this.descriptionFilter);
    }
    else {
      this.dataState.filter.options[index].value = this.descriptionFilter.value;
    }
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
    this.dataState.sort.push(new SortingOptions('Created', "desc"));
    await this.getNotes();
  }
}
