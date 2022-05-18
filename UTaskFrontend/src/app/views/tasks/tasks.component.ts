import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbTimepickerConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  model: NgbDateStruct | undefined;
  time = {hour: 13, minute: 30};
  date: {year: number, month: number} | undefined;

  constructor(config: NgbTimepickerConfig) {
    config.seconds = false;
    config.spinners = false;
  }

  ngOnInit(): void {
  }

}
