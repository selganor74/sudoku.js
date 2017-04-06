import {Directive, Renderer, ElementRef} from "@angular/core";
@Directive({
  selector : 'input'
})
export class AutoFocusInputDirective {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
      debugger;
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }
}