import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[myNumberOnly]"
})
export class NumberOnlyDirective {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9-,]+(\.[0-9-,]*){0,1}$/g);
  //private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "Delete",
    "ArrowRight",
    "ArrowLeft"
  ];

  constructor(private el: ElementRef) { }


  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
  
    
    let pastedInput: string = event.clipboardData
      .getData('text/plain');
      if (pastedInput.match(this.regex) && pastedInput.charAt(0) != '-'){
        return;
      } else {
        event.preventDefault();
      }
      pastedInput = pastedInput.replace(/[^0-9]/g, '');
    if (pastedInput.match(this.regex) && pastedInput.charAt(0) != '-')
      document.execCommand('insertText', false, pastedInput);
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {

    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1 || event.ctrlKey) {
      return;
    }
    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = this.el.nativeElement.value;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    let next: string = current.concat(event.key);

    var firstDigit = next.split('.');
    if (event.key == "." && !(parseInt(firstDigit[0]) > 0)) {
      return this.el.nativeElement.value = '0';
    } else if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }


}
