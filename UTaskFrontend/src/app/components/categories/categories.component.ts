import { Component, OnInit } from '@angular/core';
import {faBars, faMagnifyingGlass, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../models/category";
import {DataState} from "../../models/data-state";
import {CategoryService} from "../../services/category.service";
import {CompositeFilter} from "../../models/composite-filter";
import { FilterOptions } from 'src/app/models/filter-options';
import {DialogService} from "../../dialogs/dialog.service";
import {TableFilter} from "../../models/table-filter";
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
  faBars = faBars;

  categories: Category[] = [];
  editableCategory?: Category;
  nameFilter = new FilterOptions("Name", "contains", "");
  nameTableFilter: TableFilter = new TableFilter([], -1, true, false, false);
  dataState = new DataState(1,5,0, new CompositeFilter("and", []), []);
  name: string = "";

  isLoading = false;
  isEdited = false;

  constructor(
    private service: CategoryService,
    private dialogService: DialogService
  ) { }

  async createCategory(): Promise<void> {
    if(this.name.length > 0) {
      let category = new Category(0, this.name, new Date());
      await this.service.createCategory(category);
      this.name = "";
      await this.getCategories();
    }
    else {
      this.dialogService.openErrorDialog("Название категории не может быть пустым");
    }
  }

  async openNameTableFilter() {
    await this.dialogService.openCreateDateTimeTableFilter(this.nameTableFilter, this.dataState);
    this.getCategories().then();
  }

  async applyFilter(event: Event) {
    this.nameFilter.value = (event.target as HTMLInputElement).value;
    const index = this.dataState.filter.options.findIndex(x => x.field == 'Name');
    if(index == -1) {
      this.dataState.filter.options.push(this.nameFilter);
    }
    else {
      this.dataState.filter.options[index].value = this.nameFilter.value;
    }
    await this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.isLoading = true;
    let pageData = await this.service.getPageDataCategories(this.dataState);
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
    this.dataState.sort.push(new SortingOptions('Created', "desc"));
    await this.getCategories();
  }

}
