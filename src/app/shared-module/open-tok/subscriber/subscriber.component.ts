import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv', { static: true }) subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;

  constructor() { }

  ngAfterViewInit() {

    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {
      insertMode: 'append', width: '700px', height: '500px', showControls: true,
    }, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }
}
