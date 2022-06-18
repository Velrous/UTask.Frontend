export class TaskView {
  Id: number;
  TaskTypeId: number;
  TaskTypeName: string;
  CategoryId?: number;
  CategoryName?: string;
  Name: string;
  Created: Date;
  IsComplete: boolean;

  constructor(id: number, taskTypeId: number, taskTypeName: string, name: string, created: Date,
              isComplete:boolean, categoryId?: number, categoryName?: string) {
    this.Id = id;
    this.TaskTypeId = taskTypeId;
    this.TaskTypeName = taskTypeName;
    this.CategoryId = categoryId;
    this.CategoryName = categoryName;
    this.Name = name;
    this.Created = created;
    this.IsComplete = isComplete;
  }
}
