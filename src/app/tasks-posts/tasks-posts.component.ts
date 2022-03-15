import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-tasks-posts',
  templateUrl: './tasks-posts.component.html',
  styleUrls: ['./tasks-posts.component.css'],
})
export class TasksPostsComponent implements OnInit {
  sub: Subscription = new Subscription();

  ID: String = '';

  @Input()
  Tasks: Task[] = [];
  @Input()
  Posts: Post[] = [];

  constructor(private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((UserID) => {
      this.ID = UserID['id'];
      console.log(this.ID);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
