import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css'
})
export class WorkoutChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  users: User[] = [];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Minutes' }
    ]
  };

  selectedUser: string = 'John Doe';

  ngOnInit() {
    this.loadInitialUsers();
    this.loadChartData();
    this.updateChartData();
  }

  loadInitialUsers() {
    this.users = [
      {
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
  }

  onUserChange(event: any) {
    this.selectedUser = event.target.value;
    this.updateChartData();
  }

  updateChartData() {
    const selectedUser = this.users.find(user => user.name === this.selectedUser);


    this.barChartLabels = selectedUser?.workouts.map(workout => workout.type) || [];



    this.barChartData.labels = this.barChartLabels;


    this.barChartData.datasets[0].data = selectedUser?.workouts.map(workout => workout.minutes) || [];



    this.chart?.update();
  }

  loadChartData() {
    const localStorageUsers = JSON.parse(localStorage.getItem('workouts') || '[]');

    localStorageUsers.forEach((localStorageUser: any) => {

      const userIndex = this.users.findIndex(user => user.name === localStorageUser.username);

      if (userIndex !== -1) {
        this.users[userIndex].workouts.push({
          type: localStorageUser.workoutType,
          minutes: localStorageUser.workoutMinutes
        });
      } else {
        this.users.push({
          name: localStorageUser.username,
          workouts: [
            {
              type: localStorageUser.workoutType,
              minutes: localStorageUser.workoutMinutes
            }
          ]
        });


        const selectedUser = this.users.find(user => user.name === this.selectedUser);


        this.barChartLabels = selectedUser?.workouts.map(workout => workout.type) || [];



        this.barChartData.labels = this.barChartLabels;


        this.barChartData.datasets[0].data = selectedUser?.workouts.map(workout => workout.minutes) || [];



      }




    }


    )
  }
}


