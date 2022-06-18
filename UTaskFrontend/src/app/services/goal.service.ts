import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OdataHelperService} from "../helpers/odata-helper.service";
import {Goal} from "../models/goal";
import {lastValueFrom} from "rxjs";
import {DataState} from "../models/data-state";
import {PageData} from "../models/page-data";
import {GoalView} from "../models/goal-view";
import {GoalTaskRelation} from "../models/goal-task-relation";
import {TaskView} from "../models/task-view";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(
    private http: HttpClient,
    private odataHelper: OdataHelperService
  ) { }

  async createGoal(goal: Goal): Promise<void> {
    await lastValueFrom(this.http.post(`/api/Goals`, goal));
  }

  async getById(id: number): Promise<GoalView> {
    return lastValueFrom(this.http.get<GoalView>(`api/Goals/${id}`));
  }

  async getGoals(dataState: DataState): Promise<PageData<GoalView>> {
    return await lastValueFrom(this.http.get<PageData<GoalView>>(`api/Goals${this.odataHelper.toOdataString(dataState)}`))
      || new PageData<GoalView>([],0);
  }

  async getTasksForGoal(id: number): Promise<TaskView[]> {
    return await lastValueFrom(this.http.get<TaskView[]>(`api/Goals/GetTasks/${id}`)) || [];
  }

  async updateGoal(goal: Goal): Promise<void> {
    await lastValueFrom(this.http.put(`api/Goals`, goal));
  }

  async addTask(goalTaskRelation: GoalTaskRelation): Promise<void> {
    await lastValueFrom(this.http.post(`api/Goals/AddTask`, goalTaskRelation));
  }

  async deleteGoal(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`api/Goals/${id}`));
  }

  async deleteTask(goalTaskRelation: GoalTaskRelation): Promise<void> {
    await lastValueFrom(this.http.post(`api/Goals/DeleteTask`, goalTaskRelation));
  }
}
