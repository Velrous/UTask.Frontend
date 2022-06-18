import {TaskView} from "./task-view";
import {DataState} from "./data-state";
import {CompositeFilter} from "./composite-filter";
import {SortingOptions} from "./sorting-options";
import {FilterOptions} from "./filter-options";

export class GoalView {
  Id: number;
  Name: string;
  Description: string;
  Created: Date;
  PercentageCompletion: number;
  GoalTasks?: TaskView[];
  IsNeedShowGoalTasks: boolean = false;
  IsGoalTasksLoading: boolean = false;
  Tasks?: TaskView[];
  IsNeedShowTasksToAdd: boolean = false;
  IsTasksToAddLoading: boolean = false;
  TaskDataState: DataState;
  TaskNameFilter: FilterOptions;

  constructor(id: number, name: string, description: string, created: Date, percentageCompletion: number) {
    this.Id = id;
    this.Name = name;
    this.Description = description;
    this.Created = created;
    this.PercentageCompletion = percentageCompletion;
    this.TaskDataState = new DataState(1,5,0, new CompositeFilter("and", []),
      [new SortingOptions("Created", "desc")]);
    this.TaskNameFilter = new FilterOptions("Name", "contains", "");
  }
}
