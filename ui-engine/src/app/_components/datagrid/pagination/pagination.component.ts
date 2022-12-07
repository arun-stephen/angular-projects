import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  currentPage:number = 1;
  isFirst:boolean = true;
  isLast:boolean = false;
  totalPages:number = 1;
  currentPageString:string = '';
  @Input() recordsPerPage:number = 10;
  @Input() totalRecords:number = 1;
  @Output() pageChanged:EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    if(this.totalRecords <= this.recordsPerPage) {
      this.isLast = true;
    } else {
      this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
    }
    this.recalculatePageString();
  }

  OnPrevious():void {
    this.currentPage -= 1;
    if(this.currentPage <= 1) {
      this.currentPage = 1;
      this.setLastEnable();
    } else {
      this.setEnable();
    }
    this.pageChanged.emit(this.currentPage);
    this.recalculatePageString();
  }

  onNext():void {
    this.currentPage += 1;
    if(this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages;
      this.setFirstEnable();
    } else {
      this.setEnable();
    }
    this.pageChanged.emit(this.currentPage);
    this.recalculatePageString();
  }

  setFirstEnable() {
    this.isFirst = false;
    this.isLast = true;
  }

  setLastEnable() {
    this.isFirst = true;
    this.isLast = false;
  }

  setEnable():void {
    this.isFirst = false;
    this.isLast = false;
  }

  recalculatePageString():void {
    var startCount = ((this.currentPage-1) * this.recordsPerPage) + 1;
    var endCount = startCount + this.recordsPerPage -1;
    if(endCount > this.totalRecords) {
      endCount = this.totalRecords;
    }
    this.currentPageString = startCount + " - " + endCount + " of "+ this.totalRecords;
  }

}
