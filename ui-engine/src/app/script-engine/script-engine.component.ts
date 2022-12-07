import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { DatagridComponent } from '../_components/datagrid/datagrid.component';
import { DropdownComponent } from '../_components/dropdown/dropdown.component';
import { ComponentConfig } from '../_models/component.config';
import { Dropdown } from '../_models/dropdown';
import { Grid } from '../_models/grid';
import { PageConfig } from '../_models/page.config';
import { UipageconfigService } from '../_service/uipageconfig.service';
import { UIPageDirective } from './ui-page.directive';

@Component({
  selector: 'script-engine',
  templateUrl: './script-engine.component.html',
  styleUrls: ['./script-engine.component.css']
})
export class ScriptEngineComponent implements OnInit {
  private _config!:PageConfig;
  @ViewChild(UIPageDirective)
  uiPageHost!: UIPageDirective;

  constructor(
    private uiPageConfigService:UipageconfigService,
    private compFactoryResolver:ComponentFactoryResolver
    ) {
  }

  ngOnInit(): void {
  }

  @Input()
  set pageConfigUrl(configUrl:string) {
    this.onLoadPageConfig(configUrl);
  }

  onLoadPageConfig(configUrl:string) {
    if(configUrl != undefined) {
      this.uiPageConfigService.getPageConfig(configUrl).subscribe(
        (response) => {
          this._config = response;
          this.onCreateUIPage();
        },
        (error) => {
          console.log("Error Occurred::", error);
        }
      )
    }
  }

  onCreateUIPage():void {
    let components:ComponentConfig[] = this._config.components;
    this.uiPageHost.viewContainerRef.clear();

    for(let componentConfig of components) {
      if(componentConfig.type === 'grid') {
        let gridConfig = componentConfig as Grid;
        let datagridFactory = this.compFactoryResolver.resolveComponentFactory(DatagridComponent);
        let compRef = this.uiPageHost.viewContainerRef.createComponent(datagridFactory);
        compRef.instance.config = gridConfig;
      } if(componentConfig.type === 'dropdown') {
        let dropdownConfig = componentConfig as Dropdown;
        let dropdownFactory = this.compFactoryResolver.resolveComponentFactory(DropdownComponent);
        let compRef = this.uiPageHost.viewContainerRef.createComponent(dropdownFactory);
        compRef.instance.config = dropdownConfig;
      }
    }

  }

}
