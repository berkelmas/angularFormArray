import { Directive, ElementRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appForms]',
})
export class FormsDirective {
  
  constructor(private el: ElementRef) {
    this.el.nativeElement.value = 'berk';
  }

}
