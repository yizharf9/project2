import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  sub: Subscription = new Subscription();

  Users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private utils: UtilsService) {}

  search(value: string) {
    this.filteredUsers = this.Users.filter(
      (x) =>
        x.Name.toLowerCase().includes(value.toLowerCase()) ||
        x.Email.toLowerCase().includes(value.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.sub = this.utils.getUsers().subscribe((data: any) => {
      console.log(data);
      this.Users = data;
      this.filteredUsers = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
