import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PlanPriority} from "../../models/plan-priority";
import {PlanService} from "../../services/plan.service";
import {PlanPriorityService} from "../../services/plan-priority.service";
import {NgbCalendar, NgbDateNativeAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {faArrowDown, faArrowUp, faBars, faMagnifyingGlass, faPencil, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {FilterOptions} from "../../models/filter-options";
import {DataState} from "../../models/data-state";
import {CompositeFilter} from "../../models/composite-filter";
import {SortingOptions} from "../../models/sorting-options";
import {TaskView} from "../../models/task-view";
import {TaskService} from "../../services/task.service";
import {PlanView} from "../../models/plan-view";
import {PlanFilter} from "../../models/plan-filter";
import {Plan} from "../../models/plan";
import {Task} from "../../models/task";
import {DialogService} from "../../dialogs/dialog.service";
import {TableFilter} from "../../models/table-filter";
import {Category} from "../../models/category";
import {TaskTypeService} from "../../services/task-type.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  faPlus = faPlus;
  faMagnifyingGlass = faMagnifyingGlass;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faBars = faBars;

  planViews: PlanView[] = [];
  taskViews: TaskView[] = [];
  planPriorities: PlanPriority[] = [];

  date: Date = new Date(Date.now());
  dateModel?: NgbDateStruct;
  pipe = new DatePipe('ru');
  currentDate = this.pipe.transform(this.date, 'dd MMMM yyyy');
  taskNameFilter = new FilterOptions("Name", "contains", "");
  nameTableFilter: TableFilter = new TableFilter([], -1, false, false, false);
  taskTypeTableFilter: TableFilter = new TableFilter([], -1, false, false, true);
  categoryTableFilter: TableFilter = new TableFilter([], -1, false, false, true);
  createDateTimeTableFilter: TableFilter = new TableFilter([], -1, false, true, false);
  isCompleteTableFilter: TableFilter = new TableFilter([], -1, false, false, false);
  taskDataState = new DataState(1,5,0, new CompositeFilter("and", []), []);

  selectedTaskView: TaskView = new TaskView(0, 0, "","", new Date(), false);
  editablePlan?: Plan;

  selectedPlanPriorityId: number = 1;

  isLoading = false;
  isTaskLoading = false;
  isShowTasks = false;
  isEdited = false;
  isHaveChanges = false;


  constructor(
    private service: PlanService,
    private planPriorityService: PlanPriorityService,
    private taskTypeService: TaskTypeService,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private dateAdapter: NgbDateNativeAdapter,
    private ngbCalendar: NgbCalendar,
    private dialogService: DialogService
  ) {
  }

  async createPlan(): Promise<void> {
    if(this.dateModel && this.selectedTaskView.Id != 0) {
      let date = this.dateAdapter.toModel(this.dateModel);
      if(date) {
        let plan = new Plan(0, this.selectedTaskView.Id, this.selectedPlanPriorityId, date, 0);
        await this.service.createPlan(plan);
        await this.discardChange();
        await this.getPlans();
      }
    }
    else {
      this.dialogService.openErrorDialog("Не выбрана дата или задача");
    }
  }

  async getPlans(): Promise<void> {
    if(this.date)
    {
      this.isLoading = true;
      let planFilter = new PlanFilter(new Date(Date.UTC(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        this.date.getHours(),
        this.date.getMinutes(),
        this.date.getSeconds()
      )).toISOString());
      this.planViews = await this.service.getPlans(planFilter);
      this.isLoading = false;
    }
  }

  async getTasks(): Promise<void> {
    this.isTaskLoading = true;
    let pageData = await this.taskService.getTasks(this.taskDataState);
    this.taskViews = pageData.data;
    this.taskDataState.collectionSize = pageData.totalCount;
    this.isTaskLoading = false;
  }

  async updatePlan(): Promise<void> {
    if(this.editablePlan && this.dateModel)
    {
      let date = this.dateAdapter.toModel(this.dateModel);
      if(date) {
        let plan = new Plan(this.editablePlan.Id, this.selectedTaskView.Id, this.selectedPlanPriorityId, date, 0);
        await this.service.updatePlan(plan);
        this.isEdited = false;
        await this.discardChange();
        await this.getPlans();
      }
    }
    else {
      this.dialogService.openErrorDialog("Не найден редактируемый план или некорректно задана дата");
    }
  }

  async deletePlan(id: number): Promise<void> {
    await this.service.deletePlan(id);
    await this.getPlans();
  }

  async addDay(count: number): Promise<void> {
    this.date.setDate(this.date.getDate() + count);
    this.currentDate = this.pipe.transform(this.date, 'dd MMMM yyyy');
    await this.getPlans();
  }

  async applyTaskFilter(event: Event) {
    this.taskNameFilter.value = (event.target as HTMLInputElement).value;
    const index = this.taskDataState.filter.options.findIndex(x => x.field == 'Name');
    if(index == -1) {
      this.taskDataState.filter.options.push(this.taskNameFilter);
    }
    else {
      this.taskDataState.filter.options[index].value = this.taskNameFilter.value;
    }
    await this.getTasks();
  }

  async openNameTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.nameTableFilter, this.taskDataState);
    this.getTasks().then();
  }

  async openTaskTypeTableFilter() {
    await this.dialogService.openTaskTypeTableFilter(this.taskTypeTableFilter, this.taskDataState);
    this.getTasks().then();
  }

  async openCategoryTableFilter() {
    await this.dialogService.openCategoryTableFilter(this.categoryTableFilter, this.taskDataState);
    this.getTasks().then();
  }

  async openCreateDateTimeTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.createDateTimeTableFilter, this.taskDataState);
    this.getTasks().then();
  }

  async openIsCompleteTableFilter() {
    await this.dialogService.openIsCompleteTableFilter(this.isCompleteTableFilter, this.taskDataState);
    this.getTasks().then();
  }

  async editPlan(planView: PlanView): Promise<void> {
    this.editablePlan = new Plan(planView.Id, planView.TaskId, planView.PlanPriorityId, planView.Date, planView.Position);
    this.selectedPlanPriorityId = this.editablePlan.PlanPriorityId;
    this.selectedTaskView.Id = this.editablePlan.TaskId;
    this.selectedTaskView.Name = planView.TaskName;
    this.dateModel = this.dateAdapter.fromModel(new Date(this.editablePlan.Date)) || this.dateModel;
    this.isEdited = true;
  }

  async increasePosition(id: number): Promise<void> {
    await this.service.increasePosition(id);
    await this.getPlans();
  }

  async decreasePosition(id: number): Promise<void> {
    await this.service.decreasePosition(id);
    await this.getPlans();
  }

  async changeExecutionStatus(planView: PlanView): Promise<void> {
    let task = new Task(planView.TaskId, planView.TaskTypeId, planView.TaskName, planView.IsComplete, planView.CategoryId);
    task.IsComplete = !task.IsComplete;
    await this.taskService.updateTask(task);
    await this.getPlans();
  }

  async discardChange(): Promise<void> {
    this.selectedTaskView = new TaskView(0, 0, "","", new Date(), false);
    this.selectedPlanPriorityId = 1;
    this.dateModel = this.ngbCalendar.getToday();
    this.isHaveChanges = false;
  }

  async selectTask(taskView: TaskView): Promise<void> {
    this.selectedTaskView = taskView;
    this.isHaveChanges = true;
    await this.showTasks();
  }

  async showTasks(): Promise<void> {
    this.isShowTasks = !this.isShowTasks;
    if(this.isShowTasks)
    {
      await this.getTasks();
    }
    else {
      this.taskViews = [];
    }
  }

  async ngOnInit(): Promise<void> {
    this.taskDataState.sort.push(new SortingOptions('Created', "desc"));
    this.planPriorities = await this.planPriorityService.getPlanPriorities();
    this.dateModel = this.ngbCalendar.getToday();
    await this.getPlans();
    this.taskTypeTableFilter.Objects = await this.taskTypeService.getTaskTypes();
    let categoryPageData = await this.categoryService.getCategories();
    categoryPageData.data.push(new Category(0, "Не задано", new Date()));
    categoryPageData.data.sort((a,b) => a.Id - b.Id);
    this.categoryTableFilter.Objects = categoryPageData.data;
  }
}
