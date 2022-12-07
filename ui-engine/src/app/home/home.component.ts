import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  users:User[] = [];
  pageUri:string[] = ['page1', 'page2', 'page3', 'page4'];
  baseRestApiUrl:string = 'http://localhost:3000/';
  restApiUrl:string = '';
  currentPageIndex:number = -1;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    })
    this.onCreateRestApiUrl();
  }

  onChangeUIPage():void {
    this.onCreateRestApiUrl();
  }

  onCreateRestApiUrl():void {
    var randomPageIndex = this.getNewPageIndex();
    this.currentPageIndex = randomPageIndex;
    this.restApiUrl = this.baseRestApiUrl + this.pageUri[randomPageIndex];
  }

  getNewPageIndex():number {
    let newIndex = 0;
    while(this.currentPageIndex == newIndex) {
      newIndex = Math.floor(Math.random() * this.pageUri.length);
    }
    return newIndex;
  }

}
