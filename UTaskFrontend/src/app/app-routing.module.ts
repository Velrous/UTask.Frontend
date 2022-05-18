import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NotesComponent} from "./views/notes/notes.component";
import {GoalsComponent} from "./views/goals/goals.component";
import {CategoriesComponent} from "./views/categories/categories.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {PlanningComponent} from "./views/planning/planning.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'goals', component: GoalsComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'tasks', component: TasksComponent },
    ], { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
