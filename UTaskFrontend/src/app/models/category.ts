export class Category {
  Id: number;
  Name: string;
  Created: Date;

  constructor(id: number, name: string, created: Date) {
    this.Id = id;
    this.Name = name;
    this.Created = created;
  }
}
