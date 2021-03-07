import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class toogleSidebar {
  public toggleSidebar: EventEmitter<any> = new EventEmitter();
}