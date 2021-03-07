import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { OpentokService } from 'src/app/Services/open-tok-service/open-tok.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/common/common.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild("publisherDiv", { static: true }) publisherDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() meetingId: string;
  @Input() isAudio: boolean;
  @Input() isVideo: boolean;
  publisher: OT.Publisher;
  publishing: Boolean = false;
  isScreenShare: boolean;
  // isVideo: boolean = true;
  isVideoBtn: boolean = false;
  isLoggedin = false;
  userName: string;
  // isAudio:boolean = true;

  constructor(
    private opentokService: OpentokService,
    private router: Router,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isAudio)
      this.toggleAudio();
    if (changes.isVideo)
      this.toggleVideo();
  }

  ngAfterViewInit() {
    this.isLoggedin = this.commonService.isUserLoggedIn();
    this.startVideoCall();
  }

  cycleVideo() {
    this.publisher && this.publisher.cycleVideo();
  }

  toggleAudio() {
    // this.isAudio = !this.isAudio;
    if (this.publishing == true) {
      this.publisher.publishAudio(this.isAudio);
    }

  }

  toggleVideo() {
    if (this.publishing == true) {

      // this.isVideoBtn = false;
      // if (video == true) {
      //   this.publisher.publishVideo(false);
      //   // this.publisher.publishAudio(true);
      //   // this.isVideo = false;
      // } else {
      //   this.publisher.publishVideo(true);
      //   // this.publisher.publishAudio(true);
      //   // this.isVideo = true;
      // }
      this.publisher.publishVideo(this.isVideo);
    }
  }
  toggleScreen() {
    if (this.isScreenShare) this.startVideoCall();
    else this.screenshare();
    this.isScreenShare = !this.isScreenShare;
  }
  screenshare() {
    const OT = this.opentokService.getOT();
    OT.checkScreenSharingCapability(response => {
      if (!response.supported || response.extensionRegistered === false) {
        alert("This browser does not support screen sharing.");
      } else if (response.extensionInstalled === false) {
        alert(
          "Please install the screen sharing extension and load your app over https."
        );
      } else {
        // Screen sharing is available. Publish the screen.
        this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
          width: "70px",
          height: "50px",
          showControls: true,
          videoSource: "window"
        });
        if (this.session) {
          if (this.session["isConnected"]()) {
            this.publish();
          }
          this.session.on("sessionConnected", () => this.publish());
        }
      }
    });
  }
  endCall() {
    const url = this.isLoggedin
      ? "/meeting/notes/" + this.meetingId + "/endcall"
      : "/meeting/patient-endcall/" + this.meetingId;
    this.router.navigate([url]);
    // this.activatedRoute.queryParams.subscribe(param => {
    //   apptId = param["apptId"];
    // });


    //   if (!isPatient) {
    //     this.session.on("streamDestroyed", e => e.preventDefault());
    //     this.session.disconnect();
    //    // this.commonService.changeAppointmentId(0);
    //     // this.router.navigate(["/web/encounter/thank-you"], {
    //     //   queryParams: {
    //     //     apptId: apptId
    //     //   }
    //     // });
    //     this.router.navigate(["/web/encounter/soap"], {
    //       queryParams: {
    //         apptId: localStorage.getItem('aptId'),
    //         encId: localStorage.getItem('encId')
    //       }
    //     });

    //   } else {
    //     this.session.on("streamDestroyed", e => e.preventDefault());
    //     this.session.disconnect();
    //     this.router.navigate(["/web/client/dashboard"]);
    //   }

  }

  startVideoCall() {

    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(
      this.publisherDiv.nativeElement,
      {
        name: "OpenTok",
        style: {},
        insertMode: "append",
        width: "70px",
        height: "50px",
        showControls: true
      },
      err => {
        // alert("If Mac or IOS - Due to device limitations please open this link in Safari");
        err && alert(err.message);
      }
    );

    if (this.session) {
      if (this.session["isConnected"]()) {
        this.publish();
      }
      this.session.on("sessionConnected", () => this.publish());
      this.session.on("sessionDisconnected", function (event) { });
    }
  }

  publish() {

    this.session.publish(this.publisher, err => {
      if (err) {
        alert(err.message);
      } else {
        this.toggleAudio();
        this.toggleVideo();
        this.publishing = true;
        let usersInfo = JSON.parse(this.session.connection.data);
        if (this.commonService.isUserLoggedIn(2))
          this.userName = usersInfo.patientName;
        else
          this.userName = usersInfo.practitionerName;
      }
    });
  }

  ngOnDestroy() {
    this.session.disconnect();
  }
}
