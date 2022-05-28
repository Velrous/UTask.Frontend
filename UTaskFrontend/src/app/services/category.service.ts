import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {DataState} from "../models/data-state";
import {PageData} from "../models/page-data";
import {OdataHelperService} from "../helpers/odata-helper.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createCategory(category: Category): Promise<void> {
    await this.http.post(`api/Categories`, category).toPromise();
  }

  async getCategories(dataState: DataState): Promise<PageData<Category>> {
    return await this.http.get<PageData<Category>>(`api/Categories${this.odataHelper.toOdataString(dataState)}`).toPromise() || new PageData<Category>([],0);
  }

  async updateCategory(category: Category): Promise<void> {
    await this.http.put(`api/Categories`, category).toPromise();
  }

  async deleteCategory(id: number): Promise<void> {
    await this.http.delete(`api/Categories/${id}`).toPromise();
  }
}

