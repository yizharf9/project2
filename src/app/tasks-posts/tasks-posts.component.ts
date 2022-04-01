import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-tasks-posts',
  templateUrl: './tasks-posts.component.html',
  styleUrls: ['./tasks-posts.component.css'],
})
export class TasksPostsComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();

  ID: String = '';
  AddedTask: any = {
    Title: '',
    Status: false,
    user_id: '',
  };

  @Input() Tasks: Task[] = [];
  @Input() Posts: Post[] = [];

  @Output() dataRequest: EventEmitter<any> = new EventEmitter();

  constructor(
    private ar: ActivatedRoute,
    private utils: UtilsService,
    private router: Router
  ) {}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  reloadUsers() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((UserID) => {
      this.ID = UserID['id'];

      this.sub2 = this.utils.getUserTasks(this.ID).subscribe((tasks: any) => {
        this.Tasks = tasks;
      });

      this.sub3 = this.utils.getUserPosts(this.ID).subscribe((posts: any) => {
        this.Posts = posts; //.filter((task:any) => { task.user_id==this.ID })
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
