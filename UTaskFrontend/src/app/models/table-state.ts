export class TableState {
  page: number;
  pageSize: number;
  collectionSize: number;
  filter?: string;

  constructor(page: number, pageSize: number, collectionSize: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.collectionSize = collectionSize;
  }

  public get skip() {
    return (this.page - 1) * this.pageSize;
  }
}
