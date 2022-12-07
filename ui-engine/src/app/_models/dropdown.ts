import { ComponentConfig } from "./component.config";
import { DropdownConfig } from "./dropdown.config";

export class Dropdown extends ComponentConfig {
  config: DropdownConfig;

  constructor(id:string, name:string, type:string, config:DropdownConfig) {
    super(id, name, type);
    this.config = config;
  }
}
