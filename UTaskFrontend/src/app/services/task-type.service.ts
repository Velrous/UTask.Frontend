import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskType} from "../models/task-type";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

  constructor(
    private http: HttpClient
  ) { }

  async getTaskTypes(): Promise<TaskType[]> {
    return await lastValueFrom(this.http.get<TaskType[]>(`api/TaskTypes`)) || [];
  }
}
