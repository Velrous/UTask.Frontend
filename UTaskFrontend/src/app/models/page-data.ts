export class PageData<Type> {
  data: Type[];
  totalCount: number;

  constructor(data: Type[], totalCount: number) {
    this.data = data;
    this.totalCount = totalCount;
  }
}
