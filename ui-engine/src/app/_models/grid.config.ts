export class GridConfig {
  showTitle:boolean;
  titleString:string;
  showPagination:boolean;
  totalRecordsPerPage:number;
  headers:string[];
  indexes:string[];
  dataFetchType:string;
  dataRestUrl:string;
  data:any[];

  constructor(showTitle:boolean, titleString:string, showPagination:boolean, totalRecordsPerPage:number,
    headers:string[], indexes:string[], dataFetchType:string, dataRestUrl:string, data:any[]) {
      this.showTitle = showTitle;
      this.titleString = (this.showTitle)? '' : titleString;
      this.showPagination = showPagination;
      this.totalRecordsPerPage = (totalRecordsPerPage == undefined)? 20 : totalRecordsPerPage;
      this.headers = headers;
      this.indexes = indexes;
      this.dataFetchType = (dataFetchType == undefined) ? "local" : dataFetchType;
      this.dataRestUrl = (dataFetchType === "remote") ? dataRestUrl : '';
      this.data = (dataFetchType === "local") ? data : [];
    }
}
