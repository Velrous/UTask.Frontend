import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  date: Date = new Date(Date.now());
  pipe = new DatePipe('ru');
  currentDate = this.pipe.transform(this.date, 'dd MMMM yyyy');

  constructor() {
  }

  addDay(count: number): void {
    this.date.setDate(this.date.getDate() + count);
    this.currentDate = this.pipe.transform(this.date, 'dd MMMM yyyy');
  }

  ngOnInit(): void {

  }

}
