export class PlanView {
  Id: number;
  PlanPriorityId: number;
  PlanPriorityName: string;
  PlanPriorityValue: string;
  Date: Date;
  Position: number;
  TaskId: number;
  TaskName: string;
  TaskTypeId: number;
  TaskTypeName: string;
  CategoryId: number;
  CategoryName: string;
  IsComplete: boolean;

  constructor(id: number, planPriorityId: number, planPriorityName: string, planPriorityValue: string, date: Date,
              position: number, taskId: number, taskName: string, taskTypeId: number, taskTypeName: string,
              categoryId: number, categoryName: string, isComplete: boolean) {
    this.Id = id;
    this.PlanPriorityId = planPriorityId;
    this.PlanPriorityName = planPriorityName;
    this.PlanPriorityValue = planPriorityValue;
    this.Date = date;
    this.Position = position;
    this.TaskId = taskId;
    this.TaskName = taskName;
    this.TaskTypeId = taskTypeId;
    this.TaskTypeName = taskTypeName;
    this.CategoryId = categoryId;
    this.CategoryName = categoryName;
    this.IsComplete = isComplete;
  }
}
