export class Plan {
  Id: number;
  TaskId: number;
  PlanPriorityId: number;
  Date: Date;
  Position: number;

  constructor(id: number, taskId: number, planPriorityId: number, date: Date, position: number) {
    this.Id = id;
    this.TaskId = taskId;
    this.PlanPriorityId = planPriorityId;
    this.Date = date;
    this.Position = position;
  }
}
