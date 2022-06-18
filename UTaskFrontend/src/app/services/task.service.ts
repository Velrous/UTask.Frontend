import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OdataHelperService} from "../helpers/odata-helper.service";
import {Task} from "../models/task";
import {lastValueFrom} from "rxjs";
import {DataState} from "../models/data-state";
import {PageData} from "../models/page-data";
import {TaskView} from "../models/task-view";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createTask(task: Task): Promise<void> {
    await lastValueFrom(this.http.post('api/Tasks', task));
  }

  async getTasks(dataState: DataState): Promise<PageData<TaskView>> {
    return await lastValueFrom(this.http.get<PageData<TaskView>>(`api/Tasks${this.odataHelper.toOdataString(dataState)}`))
      || new PageData<TaskView>([], 0);
  }

  async getTasksToAddToGoal(dataState: DataState, goalId: number): Promise<PageData<TaskView>> {
    return await lastValueFrom(this.http.get<PageData<TaskView>>(`api/Tasks/ForAddToGoal/${goalId + this.odataHelper.toOdataString(dataState)}`))
      || new PageData<TaskView>([], 0);
  }

  async updateTask(task: Task): Promise<void> {
    await lastValueFrom(this.http.put(`api/Tasks`, task));
  }

  async deleteTask(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`api/Tasks/${id}`));
  }
}
