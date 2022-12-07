import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models';
import { AuthenticationService } from './_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:User | undefined;

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ){
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
  }

}
