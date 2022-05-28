import {CompositeFilter} from "./composite-filter";
import {SortingOptions} from "./sorting-options";

export class DataState {
  page: number;
  pageSize: number;
  collectionSize: number;
  filter: CompositeFilter;
  sort: Array<SortingOptions>;


  constructor(page: number, pageSize: number, collectionSize: number, filter: CompositeFilter, sort: Array<SortingOptions>) {
    this.page = page;
    this.pageSize = pageSize;
    this.collectionSize = collectionSize;
    this.filter = filter;
    this.sort = sort;
  }

  public get skip() {
    return (this.page - 1) * this.pageSize;
  }
}
