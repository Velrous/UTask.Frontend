export class GoalTaskRelation {
  GoalId: number;
  TaskId: number;

  constructor(goalId: number, taskId: number) {
    this.GoalId = goalId;
    this.TaskId = taskId;
  }
}
