export class DropdownConfig {
  label:string;
  labelFor:string;
  dataField:string;
  dataFetchType:string;
  dataRestUrl:string;
  data:any[];

  constructor(label:string, labelFor:string, dataField:string, dataFetchType:string, dataRestUrl:string, data:any[]) {
    this.label = label;
    this.labelFor = labelFor;
    this.dataField = dataField;
    this.dataFetchType = (dataFetchType == undefined) ? "local" : dataFetchType;
    this.dataRestUrl = (dataFetchType === "remote") ? dataRestUrl : '';
    this.data = (dataFetchType === "local") ? data : [];
  }
}
