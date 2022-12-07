import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestResponse } from '../_models/rest.response';

@Injectable({
  providedIn: 'root'
})
export class GriddataService {

  constructor(private http:HttpClient) { }

  onLoadGridData(url:string): Observable<RestResponse> {
    return this.http.get<RestResponse>(url);
  }
}
