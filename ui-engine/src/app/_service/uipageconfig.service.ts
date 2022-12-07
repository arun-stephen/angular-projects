import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageConfig } from '../_models/page.config';

@Injectable({
  providedIn: 'root'
})
export class UipageconfigService {

  constructor(private http:HttpClient) { }

  getPageConfig(url:string) {
    return this.http.get<PageConfig>(url);
  }
}
