import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  //? template:``  optional
})
export class UserComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  sub4: Subscription = new Subscription();

  _detailed: boolean = false;

  ID: String = '';

  @Output()
  dataRequest: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  User: User = {
    _id: '',
    Name: '',
    Email: '',
    Street: '',
    City: '',
    Zipcode: 0,
    completed: false,
  };

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  requestData() {
    this.dataRequest.emit(this.User._id);
    console.log('data is emitted!');
  }

  //#region - router outlet
  detailed() {
    this._detailed = !this._detailed;
  }

  tasks_posts(id: String) {
    this.router.navigate(['task-post', id]);
  }
  //#endregion

  //#region - requests from server
  form_submit(valid: boolean | null) {
    this.sub = this.utils
      .uptUser(this.User._id, this.User)
      .subscribe((data) => {
        alert(data);
      });
    this.reloadCurrentRoute();
  }

  Delete() {
    if (confirm(`are you sure you want to delete \n ${this.User.Name} ?`)) {
      this.sub2 = this.utils.delUser(this.User._id).subscribe((status: any) => {

        alert(status);                //deleting user - status

        this.sub3 = this.utils        //deleting posts
          .delUserPosts(this.User._id)
          .subscribe((status) => {
            alert(status);
          });

        this.sub3 = this.utils        //deleting tasks
          .delUserTasks(this.User._id)
          .subscribe((status) => {
            alert(status);
          });
      });
      this.reloadCurrentRoute();
    }
  }

  completedTasks(){

  }
  //#endregion

  // #region - Init,Destroy
  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((UserID) => {
      this.ID = UserID['id'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  // #endregion
}
