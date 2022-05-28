export class FilterOptions {
  field: string;
  operator: string;
  value?: any;

  constructor(field: string, operator: string, value: any) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}
