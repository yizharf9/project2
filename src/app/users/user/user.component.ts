import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();

  mouseOverDiv: boolean = false;

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
    completed: true,
  };

  constructor(private utils: UtilsService) {}

  form_submit(valid: boolean | null) {
    if (valid) {
      this.sub2 = this.utils
        .uptUser(this.User._id, this.User)
        .subscribe((data) => {
          alert(data);
        });
    }
  }

  Delete() {
    if (confirm(`are you sure you want to delete \n ${this.User.Name} ?`)) {
      this.sub = this.utils.delUser(this.User._id).subscribe((data: any) => {
        alert(data);
        alert(`${this.User.Name} has been deleted...`);
      });
    }
  }

  detailed() {
    this.mouseOverDiv = !this.mouseOverDiv;
  }
  ngOnInit(): void {
    this.User.Tasks.forEach((task: any) => {
      if (!task.Status) {
        this.User.completed = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
