import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.css'],
})
export class AddpersonComponent implements OnInit {
  sub: Subscription = new Subscription();

  User_submit: any = {
    Name: '',
    Email: '',
  };

  constructor(private router: Router, private utils: UtilsService) {}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  form_submit(valid: boolean | null) {
    this.sub = this.utils.addUser(this.User_submit).subscribe((status) => {
      console.log(status);
    });
    this.User_submit = {};
    window.location.reload()
    // this.reloadCurrentRoute();
  }

  ngOnInit(): void {}
}
