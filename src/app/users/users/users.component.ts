import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
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
  selected_User: User | undefined;

  eventData : any

  constructor(private utils: UtilsService, private router: Router) {}

  search(value: string) {
    this.filteredUsers = this.Users.filter(
      (x) =>
        x.Name.toLowerCase().includes(value.toLowerCase()) ||
        x.Email.toLowerCase().includes(value.toLowerCase())
    );
  }

  addPerson() {
    this.router.navigate(['add']);
  }

  ngOnInit(): void {
    this.router.navigate(['']);

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
