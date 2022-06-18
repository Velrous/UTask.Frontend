import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlanPriority} from "../models/plan-priority";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanPriorityService {

  constructor(
    private http: HttpClient
  ) { }

  async getPlanPriorities(): Promise<PlanPriority[]> {
    return await lastValueFrom(this.http.get<PlanPriority[]>(`api/PlanPriorities`)) || [];
  }
}
