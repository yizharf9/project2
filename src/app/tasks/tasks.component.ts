import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../task';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  sub4: Subscription = new Subscription();

  @Input() Tasks: any[] = [];
  @Input() ID: String = '';

  Adding: boolean = false;
  addedTask: any = {
    Title: '',
    Status: false,
    user_id: '',
  };

  constructor(private router: Router, private utils: UtilsService) {}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl, 'users']);
      console.log(currentUrl);
    });
  }

  AddTask() {
    this.addedTask.user_id = this.ID;
    this.sub = this.utils.addTask(this.addedTask).subscribe((status) => {
      alert(status);
      this.router.navigate(['task-post/' + this.ID]);
    });
    this.addedTask = {};
    this.reloadCurrentRoute();
  }

  deleteTask(id: String) {
    this.sub3 = this.utils.delTask(id).subscribe((status) => {
      alert(status);
    });
    this.reloadCurrentRoute();
  }

  async markCompleted(id: String, uptTask: Task) {
    uptTask.Status = true;
    this.utils.uptTask(id, uptTask).subscribe((status) => {
      console.log(status);
    });
    
    this.reloadCurrentRoute();
  }

  ngOnInit(): void {}

  ngOnDetroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
