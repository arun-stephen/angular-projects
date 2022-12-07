import { Component, Input, OnInit } from '@angular/core';
import { ComponentConfig } from 'src/app/_models/component.config';
import { Dropdown } from 'src/app/_models/dropdown';
import { DropdownService } from 'src/app/_service/dropdown.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  private _config!:Dropdown;
  private _name:string = '';
  private _id:string = '';
  private _label:string = '';
  private _labelFor:string = '';
  private _dataField:string = '';
  private _data:any[] = [];

  constructor(
    private dropdownService:DropdownService
  ) { }

  ngOnInit(): void {
  }

  @Input()
  set config(config:ComponentConfig) {
    if(config != undefined) {
      this._config = config as Dropdown;
      this.setupConfiguration();
    } else {
      console.log('unable to load the configuration of datagrid component');
    }
  }

  get label():string {
    return this._label;
  }

  get title():string {
    return 'Choose '+this._labelFor;
  }

  get dataField():string {
    return this._dataField;
  }

  get data():any[] {
    return this._data;
  }

  setupConfiguration():void {
    if(this.validateConfiguration()) {
      this._id = this._config.id;
      this._name = this._config.name;
      this._label = this._config.config.label;
      this._labelFor = this._config.config.labelFor;
      this._dataField = this._config.config.dataField;
      this.onLoadDropdownData();
    }
  }

  validateConfiguration():boolean {
    if(this._config.config != undefined) {
      let dropdownConfig = this._config.config;

      if(dropdownConfig.dataFetchType === "local" &&
        (dropdownConfig.data === undefined || dropdownConfig.data.length === 0)) {
        console.log('The required dropdown values was missing for local fetchtype');
        return false;
      }

      if(dropdownConfig.dataFetchType === "remote" &&
        (dropdownConfig.dataRestUrl === undefined || dropdownConfig.dataRestUrl.length === 0)) {
        console.log('The required dataRestUrl was missing for remote fetchtype');
        return false;
      }

    } else {
      console.log('The required dropodown configuration was missing');
      return false;
    }

    return true;
  }

  onLoadDropdownData() {
    if(this._config.config.dataFetchType === "local") {
      this._data = this._config.config.data;
    } else if(this._config.config.dataFetchType === "remote") {
      this.dropdownService.onLoadDropdownData(this._config.config.dataRestUrl).subscribe(
        (response) => {
          this._data = response.data;
        },
        (error) => {
          console.log('Datagrid data loading error::', error);
        }
      )
    }
  }

  changeDropDown(event:any) {
    console.log(event.target.value, " was selected from", this._name, "dropdown");
  }

}
