import { Injectable } from "@angular/core";

export class DataGridConfig {
  private _showTitle:boolean;
  private _titleString:string;
  private _showPagination:boolean;
  private _headers:string[];
  private _data:any[];

  constructor(showTitle:boolean, titleString:string, showPagination:boolean,
    headers:string[], data:any[]) {
      this._showTitle = showTitle;
      this._titleString = titleString;
      this._showPagination = showPagination;
      this._headers = headers;
      this._data = data;
  }

  public get showTitle():boolean {
    return this._showTitle;
  }

  public get titleString():string {
    return this._titleString;
  }

  public get showPagination():boolean {
    return this._showPagination;
  }

  public get headers():string[] {
    return this._headers;
  }

  public get data():any[] {
    return this._data;
  }
}
