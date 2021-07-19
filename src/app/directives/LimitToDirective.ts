import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
 selector: '[limit-to]'
})
export class LimitToDirective {
 @Input('limit-to') limitTo;

 @HostListener('input', ['$event'])
 onKeyDown(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    if(input.value.length>this.limitTo){
       input.value=input.value.substr(0,this.limitTo);
    }
 }
}
