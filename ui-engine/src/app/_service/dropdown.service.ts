import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestResponse } from "../_models/rest.response";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  onLoadDropdownData(url:string): Observable<RestResponse> {
    return this.http.get<RestResponse>(url);
  }
}
