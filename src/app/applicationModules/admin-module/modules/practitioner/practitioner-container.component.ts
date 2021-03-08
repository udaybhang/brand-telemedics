import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'practitioner-container-component',
  template: `
  
   <router-outlet></router-outlet>
   
  `,
  styles: []
})
export class PractitionerContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }
 

}