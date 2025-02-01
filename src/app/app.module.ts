import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseChartDirective } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: WorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: 'workout-chart', component: WorkoutChartComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    WorkoutFormComponent,
    NgxPaginationModule,
    BaseChartDirective
  ],
  bootstrap: []
})
export class AppModule { }
