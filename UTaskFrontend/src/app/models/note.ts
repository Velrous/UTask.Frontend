export class Note {
  Id: number;
  Description: string;
  Created: Date;

  constructor(id: number, description: string, created: Date) {
    this.Id = id;
    this.Description = description;
    this.Created = created;
  }
}
