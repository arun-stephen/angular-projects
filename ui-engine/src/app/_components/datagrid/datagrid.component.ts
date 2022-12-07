import { Component, Input, OnInit } from '@angular/core';
import { ComponentConfig } from 'src/app/_models/component.config'
import { Grid } from 'src/app/_models/grid';
import { GriddataService } from 'src/app/_service/griddata.service';

@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {
  private _config!:Grid;
  private _name:string = '';
  private _id:string = '';
  private _showTitle:boolean = false;
  private _titleString:string = '';
  private _showPagination:boolean = false;
  private _headers:string[] = [];
  private _indexes:string[] = [];
  private _data:any[] = [];
  private _recordsPerPage:number = -1;
  private _totalRecords:number = -1;
  private _localData:any[] = [];

  constructor(private gridService:GriddataService) {
  }

  ngOnInit(): void {
  }

  @Input()
  set config(config:ComponentConfig) {
    if(config != undefined) {
      this._config = config as Grid;
      this.setupConfiguration();
    } else {
      console.log('unable to load the configuration of datagrid component');
    }
  }

  get showTitle():boolean {
    return this._showTitle;
  }

  get titleString():string {
    return this._titleString;
  }

  get headers():string[] {
    return this._headers;
  }

  get indexes():string[] {
    return this._indexes;
  }

  get data():any[] {
    return this._data;
  }

  get showPagination():boolean {
    return this._showPagination;
  }

  get recordsPerPage():number {
    return this._recordsPerPage;
  }

  get totalRecords():number {
    return this._totalRecords;
  }

  setupConfiguration():void {
    if(this.validateConfiguration()) {
      this._id = this._config.id;
      this._name = this._config.name;
      this._showTitle = this._config.config.showTitle;
      this._titleString = this._config.config.titleString;
      this._headers = this._config.config.headers;
      this._indexes = this._config.config.indexes;
      this.onLoadGridData();
    }
  }

  //validate all required configuration was available
  validateConfiguration():boolean {
    if(this._config.config != undefined) {
      let gridConfig = this._config.config;

      if(gridConfig.showTitle &&
        (gridConfig.titleString === undefined || gridConfig.titleString.length <=0)) {
        console.log('The required grid title configuration was missing');
        return false;
      }

      if(gridConfig.headers === undefined || gridConfig.headers.length === 0) {
        console.log('The required grid headers configuration was missing');
        return false;
      }

      if(gridConfig.indexes === undefined || gridConfig.indexes.length === 0) {
        console.log('The required grid data index configuration was missing');
        return false;
      }

      if(gridConfig.dataFetchType === "local" &&
        (gridConfig.data === undefined || gridConfig.data.length === 0)) {
        console.log('The required grid data values was missing for local fetchtype');
        return false;
      }

      if(gridConfig.dataFetchType === "remote" &&
        (gridConfig.dataRestUrl === undefined || gridConfig.dataRestUrl.length === 0)) {
        console.log('The required dataRestUrl was missing for remote fetchtype');
        return false;
      }

    } else {
      console.log('The required grid configuration was missing');
      return false;
    }

    return true;
  }

  onLoadGridData() {
    if(this._config.config.dataFetchType === "local") {
      this._localData = this._config.config.data;
      this._totalRecords = this._config.config.data.length;
      this.onSetPagiationConfig();
    } else if(this._config.config.dataFetchType === "remote") {
      this.gridService.onLoadGridData(this._config.config.dataRestUrl).subscribe(
        (response) => {
          this._localData = response.data;
          this._totalRecords = this._localData.length;
          this.onSetPagiationConfig();
        },
        (error) => {
          console.log('Datagrid data loading error::', error);
        }
      )
    }
  }

  onSetPagiationConfig() {
    this._showPagination = this._config.config.showPagination;
    this._recordsPerPage = (this._config.config.totalRecordsPerPage === undefined)
                           ? 10: this._config.config.totalRecordsPerPage;
    this.onLoadGridDataWithPagination();
  }

  onLoadGridDataWithPagination(page:number = 1) {
    let start:number = (page - 1) * this._recordsPerPage;
    let end:number = start + this._recordsPerPage;
    if(end >= this._totalRecords) {
      end = this._totalRecords;
    }
    this._data = this._localData.slice(start, end);
  }

  onGridSelected(selection:any) {
    console.log(this._name," grid was selected the row is ", selection);
  }

  onChangePage(page:number) {
    this.onLoadGridDataWithPagination(page);
  }

}
