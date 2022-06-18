import { Component, OnInit } from '@angular/core';
import {Goal} from "../../models/goal";
import {GoalView} from "../../models/goal-view";
import {DataState} from "../../models/data-state";
import {CompositeFilter} from "../../models/composite-filter";
import {SortingOptions} from "../../models/sorting-options";
import {FilterOptions} from "../../models/filter-options";
import {GoalService} from "../../services/goal.service";
import {TaskView} from "../../models/task-view";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {faClipboardList, faMagnifyingGlass, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {GoalTaskRelation} from "../../models/goal-task-relation";
import {DialogService} from "../../dialogs/dialog.service";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faClipboardList = faClipboardList;

  nameFilter = new FilterOptions("Name", "contains", "");
  dataState = new DataState(1,3,0, new CompositeFilter("and", []), [new SortingOptions("Name", "asc")]);

  goalViews: GoalView[] = [];

  editableGoal?: Goal;

  name: string = "";
  description: string = "";

  isLoading = false;
  isEdited = false;

  constructor(
    private service: GoalService,
    private taskService: TaskService,
    private dialogService: DialogService
  ) { }

  async createGoal(): Promise<void> {
    if(this.name.length > 0)
    {
      let goal = new Goal(0, this.name, this.description, new Date());
      await this.service.createGoal(goal);
      this.name = "";
      this.description = "";
      await this.getGoals();
    }
    else {
      this.dialogService.openErrorDialog("Название цели не может быть пустым");
    }
  }

  async getGoals(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getGoals(this.dataState);
    this.goalViews = pageData.data;
    this.dataState.collectionSize = pageData.totalCount;
    this.isLoading = false;
  }

  async getTasksForGoal(goalView: GoalView): Promise<void> {
    goalView.IsGoalTasksLoading = true;
    goalView.GoalTasks = await this.service.getTasksForGoal(goalView.Id);
    goalView.IsGoalTasksLoading = false;
  }

  async getTasksToAdd(goalView: GoalView): Promise<void> {
    goalView.IsTasksToAddLoading = true;
    let pageData = await this.taskService.getTasksToAddToGoal(goalView.TaskDataState, goalView.Id);
    goalView.Tasks = pageData.data;
    goalView.TaskDataState.collectionSize = pageData.totalCount;
    goalView.IsTasksToAddLoading = false;
  }

  async editGoal(goalView: GoalView): Promise<void> {
    this.editableGoal = new Goal(goalView.Id, goalView.Name, goalView.Description, goalView.Created);
    this.name = this.editableGoal.Name;
    this.description = this.editableGoal.Description;
    this.isEdited = true;
  }

  async updateGoal(): Promise<void> {
    if(this.editableGoal && this.name.length > 0)
    {
      let goal = this.editableGoal;
      goal.Name = this.name;
      goal.Description = this.description;
      await this.service.updateGoal(goal);
      this.editableGoal = undefined;
      this.name = "";
      this.description = "";
      this.isEdited = false;
      await this.getGoals();
    }
  }

  async deleteGoal(): Promise<void> {
    if(this.editableGoal)
    {
      await this.service.deleteGoal(this.editableGoal.Id);
      this.editableGoal = undefined;
      this.name = "";
      this.description = "";
      this.isEdited = false;
      await this.getGoals();
    }
  }

  async AddTask(goalView: GoalView, taskView: TaskView): Promise<void> {
    let goalTaskRelation = new GoalTaskRelation(goalView.Id, taskView.Id);
    await this.service.addTask(goalTaskRelation);
    goalView.IsNeedShowTasksToAdd = false;
    await this.getTasksForGoal(goalView);
    await this.refreshGoal(goalView);
  }

  async DeleteTask(goalView: GoalView, taskView: TaskView): Promise<void> {
    let goalTaskRelation = new GoalTaskRelation(goalView.Id, taskView.Id);
    await this.service.deleteTask(goalTaskRelation);
    await this.getTasksForGoal(goalView);
    await this.refreshGoal(goalView);
    if(goalView.IsNeedShowTasksToAdd) {
      await this.getTasksToAdd(goalView);
    }
  }

  async changeExecutionStatus(taskView: TaskView, goalView: GoalView): Promise<void> {
    let task = new Task(taskView.Id, taskView.TaskTypeId, taskView.Name, taskView.IsComplete, taskView.CategoryId);
    task.IsComplete = !task.IsComplete;
    await this.taskService.updateTask(task);
    await this.getTasksForGoal(goalView);
    await this.refreshGoal(goalView);
  }

  async showGoalTasks(goalView: GoalView): Promise<void> {
    goalView.IsNeedShowGoalTasks = !goalView.IsNeedShowGoalTasks;
    if(goalView.IsNeedShowGoalTasks) {
      await this.getTasksForGoal(goalView);
    }
    else {
      goalView.GoalTasks = [];
    }
  }

  async showTasksToAdd(goalView: GoalView): Promise<void> {
    goalView.IsNeedShowTasksToAdd = !goalView.IsNeedShowTasksToAdd;
    if(goalView.IsNeedShowTasksToAdd) {
      goalView.TaskDataState = new DataState(1,5,0, new CompositeFilter("and", []),
        [new SortingOptions("Name", "asc")]);
      goalView.TaskNameFilter = new FilterOptions("Name", "contains", "");
      await this.getTasksToAdd(goalView);
    }
    else {
      goalView.Tasks = [];
    }
  }

  async refreshGoal(goalView: GoalView): Promise<void> {
    let updatedGoalView = await this.service.getById(goalView.Id);
    if(updatedGoalView) {
      goalView.PercentageCompletion = updatedGoalView.PercentageCompletion;
    }
  }

  async applyFilter(event: Event) {
    this.nameFilter.value = (event.target as HTMLInputElement).value;
    this.dataState.filter.options = [];
    this.dataState.filter.options.push(this.nameFilter);
    await this.getGoals();
  }

  async applyTaskFilter(event: Event, goalView: GoalView) {
    goalView.TaskNameFilter.value = (event.target as HTMLInputElement).value;
    goalView.TaskDataState.filter.options = [];
    goalView.TaskDataState.filter.options.push(goalView.TaskNameFilter);
    await this.getTasksToAdd(goalView);
  }

  async discardChange(): Promise<void> {
    this.editableGoal = undefined;
    this.name = "";
    this.description = "";
    this.isEdited = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getGoals();
  }

}
