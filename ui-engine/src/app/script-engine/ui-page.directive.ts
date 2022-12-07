import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[uiPage]'
})
export class UIPageDirective {
  constructor (
    public viewContainerRef:ViewContainerRef
  ){}
}
