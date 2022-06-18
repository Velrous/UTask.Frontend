import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {DataState} from "../models/data-state";
import {PageData} from "../models/page-data";
import {OdataHelperService} from "../helpers/odata-helper.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createCategory(category: Category): Promise<void> {
    await lastValueFrom(this.http.post(`api/Categories`, category));
  }

  async getCategories(): Promise<PageData<Category>> {
    return await lastValueFrom(this.http.get<PageData<Category>>(`api/Categories?&count=true&$orderBy=name asc`))|| [];
  }

  async getPageDataCategories(dataState: DataState): Promise<PageData<Category>> {
    return await lastValueFrom(this.http.get<PageData<Category>>(`api/Categories${this.odataHelper.toOdataString(dataState)}`)) || new PageData<Category>([],0);
  }

  async updateCategory(category: Category): Promise<void> {
    await lastValueFrom(this.http.put(`api/Categories`, category));
  }

  async deleteCategory(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`api/Categories/${id}`));
  }
}

