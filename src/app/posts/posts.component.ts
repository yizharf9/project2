import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();

  @Input() Posts: any[] = [];
  @Input() ID: String = '';

  Adding: boolean = false;
  addedPost: any = {
    Title: '',
    Status: false,
    user_id: '',
  };

  constructor(private router: Router, private utils: UtilsService) {}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  AddPost(text: String) {
    this.addedPost.user_id = this.ID;
    this.sub = this.utils.addPost(this.addedPost).subscribe((status) => {
      alert(status);
      this.router.navigate(['Post-post/' + this.ID]);
    });
    this.addedPost = {};
    this.reloadCurrentRoute()
  }

  deletePost(id: String) {
    this.sub3 = this.utils.delPost(id).subscribe((status) => {
      alert(status);
    });
    this.reloadCurrentRoute()
  }

  ngOnInit(): void {}
}
