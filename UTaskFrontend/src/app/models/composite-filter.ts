import {FilterOptions} from "./filter-options";

export class CompositeFilter {
  logic: 'or' | 'and';
  options: Array<FilterOptions>

  constructor(logic: 'or' | 'and', options: Array<FilterOptions>) {
    this.logic = logic;
    this.options = options;
  }
}
