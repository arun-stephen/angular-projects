import { ComponentConfig } from "./component.config";
import { GridConfig } from "./grid.config";

export class Grid extends ComponentConfig {
  config: GridConfig;

  constructor(id:string, name:string, type:string, config:GridConfig) {
    super(id, name, type);
    this.config = config;
  }
}
