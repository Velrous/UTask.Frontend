export class Goal {
  Id: number;
  Name: string;
  Description: string;
  Created: Date;

  constructor(id: number, name: string, description: string, created: Date) {
    this.Id = id;
    this.Name = name;
    this.Description = description;
    this.Created = created;
  }
}
