import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Plan} from "../models/plan";
import {lastValueFrom} from "rxjs";
import {PlanFilter} from "../models/plan-filter";
import { PlanView } from '../models/plan-view';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  async createPlan(plan: Plan): Promise<void> {
    await lastValueFrom(this.http.post('api/Plans', plan));
  }

  async getPlans(planFilter: PlanFilter): Promise<PlanView[]> {
    return await lastValueFrom(this.http.post<PlanView[]>(`api/Plans/GetByDate`, planFilter)) || [];
  }

  async increasePosition(id: number): Promise<void> {
    await lastValueFrom(this.http.get(`api/Plans/Inc/${id}`));
  }

  async decreasePosition(id: number): Promise<void> {
    await lastValueFrom(this.http.get(`api/Plans/Dec/${id}`));
  }

  async updatePlan(plan: Plan): Promise<void> {
    await lastValueFrom(this.http.put(`api/Plans`, plan));
  }

  async deletePlan(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`api/Plans/${id}`));
  }
}
