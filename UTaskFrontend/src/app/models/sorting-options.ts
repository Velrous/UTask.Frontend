export class SortingOptions {
  field: string;
  direction: 'asc' | 'desc';

  constructor(field: string, direction: 'asc' | 'desc') {
    this.field = field;
    this.direction = direction;
  }
}
