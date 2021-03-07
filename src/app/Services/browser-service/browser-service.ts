import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
  })
export class BrowserService {
  public isEdge: boolean;
  public isOpera: boolean;
  public isChrome: boolean;
  public isIE: boolean;
  public isFirefox: boolean;
  public isSafari: boolean;

  constructor() {
    this.setBrowser();
  }

  public isIOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  private setBrowser() {
    this.isEdge = false;
    this.isOpera = false;
    this.isChrome = false;
    this.isIE = false;
    this.isFirefox = false;
    this.isSafari = false;

    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf("edge") > -1:
        this.isEdge = true;
      case agent.indexOf("opr") > -1 && !!(<any>window).opr:
        this.isEdge = true;
      case agent.indexOf("chrome") > -1 && !!(<any>window).chrome:
        this.isEdge = true;
      case agent.indexOf("trident") > -1:
        this.isIE = true;
      case agent.indexOf("firefox") > -1:
        this.isFirefox = true;
      case agent.indexOf("safari") > -1:
        this.isSafari = true;
      default:
        console.log("other browser");
    }
  }
}
