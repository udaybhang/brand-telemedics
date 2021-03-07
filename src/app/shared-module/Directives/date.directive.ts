import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[dateonly]"
})
export class DateOnlyDirective {

  private regex: RegExp = new RegExp(/^[0-9\/]+$/g);

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

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {

    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1 || event.ctrlKey) {
      return;
    }
  if (!event.key.match(this.regex)) {
      event.preventDefault();
    }
  }


}
