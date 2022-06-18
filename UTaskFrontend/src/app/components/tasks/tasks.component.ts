import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbTimepickerConfig} from "@ng-bootstrap/ng-bootstrap";
import {TaskType} from "../../models/task-type";
import {TaskTypeService} from "../../services/task-type.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {TaskView} from "../../models/task-view";
import {faBars, faCopy, faMagnifyingGlass, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {FilterOptions} from "../../models/filter-options";
import {DataState} from "../../models/data-state";
import {CompositeFilter} from "../../models/composite-filter";
import {SortingOptions} from "../../models/sorting-options";
import { Note } from 'src/app/models/note';
import {NoteService} from "../../services/note.service";
import {DialogService} from "../../dialogs/dialog.service";
import {TableFilter} from "../../models/table-filter";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;
  faCopy = faCopy;
  faBars = faBars;

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#f2f4f6',
      buttonColor: '#1f2937'
    },
    dial: {
      dialBackgroundColor: '#1f2937',
    },
    clockFace: {
      clockFaceBackgroundColor: '#1f2937',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  taskTypes: TaskType[] = [];
  categories: Category[] = [];
  taskViews: TaskView[] = [];
  notes: Note[] = [];

  model: NgbDateStruct | undefined;
  selectedTime = "12:00";
  date: {year: number, month: number} | undefined;
  nameTableFilter: TableFilter = new TableFilter([], -1, false, false, false);
  taskTypeTableFilter: TableFilter = new TableFilter(this.taskTypes, -1, false, false, true);
  categoryTableFilter: TableFilter = new TableFilter(this.categories, -1, false, false, true);
  createDateTimeTableFilter: TableFilter = new TableFilter([], -1, false, true, false);
  isCompleteTableFilter: TableFilter = new TableFilter([], -1, false, false, false);
  nameFilter = new FilterOptions("Name", "contains", "");
  dataState = new DataState(1,5,0, new CompositeFilter("and", []), []);
  noteDescriptionFilter = new FilterOptions("Description", "contains", "");
  noteDataState = new DataState(1,5,0, new CompositeFilter("and", []), [new SortingOptions("Name", "asc")]);

  editableTask?: Task;

  name: string = "";

  selectedTaskTypeId: number = 1;
  selectedCategoryId: number = 0;

  isLoading = false;
  isNoteLoading = false;
  isEdited = false;
  isShowNotes = false;

  constructor(
    private service: TaskService,
    private taskTypeService: TaskTypeService,
    private categoryService: CategoryService,
    private noteService: NoteService,
    public dialogService: DialogService,
    config: NgbTimepickerConfig
  ) {
    config.minuteStep = 5;
    config.seconds = false;
    config.spinners = true;
    config.readonlyInputs = true;
  }

  async createTask(): Promise<void> {
    if (this.name.length > 0) {
      let task = this.getTaskObject();
      await this.service.createTask(task);
      this.name = "";
      this.selectedTaskTypeId = 1;
      this.selectedCategoryId = 0;
      await this.getTasks();
    }
    else {
      this.dialogService.openErrorDialog("Название задачи не может быть пустым");
    }
  }

  async openNameTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.nameTableFilter, this.dataState);
    this.getTasks().then();
  }

  async openTaskTypeTableFilter() {
    await this.dialogService.openTaskTypeTableFilter(this.taskTypeTableFilter, this.dataState);
    this.getTasks().then();
  }

  async openCategoryTableFilter() {
    await this.dialogService.openCategoryTableFilter(this.categoryTableFilter, this.dataState);
    this.getTasks().then();
  }

  async openCreateDateTimeTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.createDateTimeTableFilter, this.dataState);
    this.getTasks().then();
  }

  async openIsCompleteTableFilter() {
    await this.dialogService.openIsCompleteTableFilter(this.isCompleteTableFilter, this.dataState);
    this.getTasks().then();
  }

  async applyFilter(event: Event) {
    this.nameFilter.value = (event.target as HTMLInputElement).value;
    const index = this.dataState.filter.options.findIndex(x => x.field == 'Name');
    if(index == -1) {
      this.dataState.filter.options.push(this.nameFilter);
    }
    else {
      this.dataState.filter.options[index].value = this.nameFilter.value;
    }
    await this.getTasks();
  }

  async getTasks(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getTasks(this.dataState);
    this.taskViews = pageData.data;
    this.dataState.collectionSize = pageData.totalCount;
    this.isLoading = false;
  }

  async applyNoteFilter(event: Event) {
    this.noteDescriptionFilter.value = (event.target as HTMLInputElement).value;
    this.noteDataState.filter.options = [];
    this.noteDataState.filter.options.push(this.noteDescriptionFilter);
    await this.getNotes();
  }

  async getNotes(): Promise<void> {
    this.isNoteLoading = true;
    let pageData = await this.noteService.getNotes(this.noteDataState);
    this.notes = pageData.data;
    this.noteDataState.collectionSize = pageData.totalCount;
    this.isNoteLoading = false;
  }

  async changeExecutionStatus(taskView: TaskView): Promise<void> {
    let task = new Task(taskView.Id, taskView.TaskTypeId, taskView.Name, taskView.IsComplete, taskView.CategoryId);
    task.IsComplete = !task.IsComplete;
    await this.service.updateTask(task);
    await this.getTasks();
  }

  async editTask(taskView: TaskView): Promise<void> {
    this.editableTask = new Task(taskView.Id, taskView.TaskTypeId, taskView.Name, taskView.IsComplete, taskView.CategoryId);
    this.name = this.editableTask.Name;
    this.selectedTaskTypeId = this.editableTask.TaskTypeId;
    this.selectedCategoryId = this.editableTask.CategoryId || 0;
    this.isEdited = true;
  }

  async updateTask(): Promise<void> {
    if(this.editableTask)
    {
      if(this.name.length > 0) {
        let task = this.getTaskObject();
        task.Id = this.editableTask.Id;
        await this.service.updateTask(task);
        this.editableTask = undefined;
        this.name = "";
        this.selectedTaskTypeId = 1;
        this.selectedCategoryId = 0;
        this.isEdited = false;
        await this.getTasks();
      }
      else {
        this.dialogService.openErrorDialog("Название задачи не может быть пустым");
      }
    }
    else {
      this.dialogService.openErrorDialog("Не найдена редактируемая задачи");
    }
  }

  async deleteTask(id: number): Promise<void> {
    await this.service.deleteTask(id);
    await this.getTasks();
  }

  async deleteNote(id: number): Promise<void> {
    await this.noteService.deleteNote(id);
    await this.getNotes();
  }

  async discardChange(): Promise<void> {
    this.editableTask = undefined;
    this.name = "";
    this.selectedTaskTypeId = 1;
    this.selectedCategoryId = 0;
    this.isEdited = false;
  }

  async showNotes(): Promise<void> {
    this.isShowNotes = !this.isShowNotes;
    if(this.isShowNotes)
    {
      await this.getNotes();
    }
    else {
      this.notes = [];
    }
  }

  async ngOnInit(): Promise<void> {
    this.dataState.sort.push(new SortingOptions('Created', "desc"));
    this.taskTypes = await this.taskTypeService.getTaskTypes();
    this.taskTypeTableFilter.Objects = this.taskTypes;
    let categoryPageData = await this.categoryService.getCategories();
    categoryPageData.data.push(new Category(0, "Не задано", new Date()));
    categoryPageData.data.sort((a,b) => a.Id - b.Id);
    this.categories = categoryPageData.data;
    this.categoryTableFilter.Objects = this.categories;
    await this.getTasks();
  }

  private getTaskObject(): Task {
    let task = new Task(0, this.selectedTaskTypeId, this.name, false,
      this.selectedCategoryId == 0 ? undefined : this.selectedCategoryId);
    return task;
  }
}
