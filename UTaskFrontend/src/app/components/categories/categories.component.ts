import { Component, OnInit } from '@angular/core';
import {faMagnifyingGlass, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../models/category";
import {DataState} from "../../models/data-state";
import {CategoryService} from "../../services/category.service";
import {CompositeFilter} from "../../models/composite-filter";
import { FilterOptions } from 'src/app/models/filter-options';
import {SortingOptions} from "../../models/sorting-options";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;

  categories: Category[] = [];
  editableCategory?: Category;
  nameFilter = new FilterOptions("Name", "contains", "");
  dataState = new DataState(1,5,0, new CompositeFilter("and", []),
    [new SortingOptions("Name", "asc")]); //TODO Стоит подумать над улучшением
  name: string = "";

  isLoading = false;
  isEdited = false;

  constructor(
    private service: CategoryService
  ) { }

  async createCategory(): Promise<void> {
    //TODO Добавить вывод ошибки, если пустой текст
    let category = new Category(0, this.name, new Date());
    await this.service.createCategory(category);
    this.name = "";
    await this.getCategories();
  }

  async applyFilter(event: Event) {
    this.nameFilter.value = (event.target as HTMLInputElement).value;
    this.dataState.filter.options = [];
    this.dataState.filter.options.push(this.nameFilter);
    await this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getCategories(this.dataState);
    this.categories = pageData.data;
    this.dataState.collectionSize = pageData.totalCount;
    this.isLoading = false;
  }

  async editCategory(category: Category): Promise<void> {
    this.editableCategory = category;
    this.name = this.editableCategory.Name;
    this.isEdited = true;
  }

  async updateCategory(): Promise<void> {
    if(this.editableCategory && this.name.length > 0) {
      this.editableCategory.Name = this.name;
      await this.service.updateCategory(this.editableCategory);
      this.editableCategory = undefined;
      this.name = "";
      this.isEdited = false;
      await this.getCategories();
    }
  }

  async deleteCategory(id: number): Promise<void> {
    await this.service.deleteCategory(id);
    await this.getCategories();
  }

  async discardChange(): Promise<void> {
    this.editableCategory = undefined;
    this.name = "";
    this.isEdited = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getCategories();
  }

}
