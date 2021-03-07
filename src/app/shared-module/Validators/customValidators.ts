import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()
export class CustomValidators {
  constructor() {}

  public static removeInputSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
        control.setValue('');
      }
      return null;
  }

  
}
