import { ComponentConfig } from "./component.config";

export class PageConfig {
  pageId:string;
  pageName:string;
  components:ComponentConfig[];

  constructor(pageId:string, pageName:string, components:ComponentConfig[]) {
    this.pageId = pageId;
    this.pageName = pageName;
    this.components = components;
  }

}
