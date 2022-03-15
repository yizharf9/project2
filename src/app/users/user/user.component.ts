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

  _detailed: boolean = false;

  ID: String = '';

  @Output()
  User_emit: EventEmitter<User> = new EventEmitter();

  @Input()
  User: User = {
    _id: '',
    Name: '',
    Email: '',
    Street: '',
    City: '',
    Zipcode: 0,
    Tasks: [],
    Posts: [],
    completed: false,
  };

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  emitUser(){
    this.User_emit.emit(this.User);
  }

  //#region - router outlet
  detailed() {
    this._detailed = !this._detailed;
  }

  tasks_posts(id: String) {
    this.emitUser();

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
    this.router.navigate(['add']);
  }

  Delete() {
    if (confirm(`are you sure you want to delete \n ${this.User.Name} ?`)) {
      this.sub2 = this.utils.delUser(this.User._id).subscribe((data: any) => {
        alert(data);
        window.location.reload();
      });
    }
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
}
// #endregion
