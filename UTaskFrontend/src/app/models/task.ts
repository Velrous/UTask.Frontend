export class Task {
  Id: number;
  TaskTypeId: number;
  CategoryId?: number;
  Name: string;
  IsComplete: boolean;

  constructor(id: number, taskTypeId: number, name: string, isComplete: boolean, categoryId?: number) {
    this.Id = id;
    this.TaskTypeId = taskTypeId;
    this.CategoryId = categoryId;
    this.Name = name;
    this.IsComplete = isComplete;
  }
}
