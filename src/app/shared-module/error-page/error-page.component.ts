import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"],
})
export class ErrorPageComponent implements OnInit {
  message: string;
  title: string; 
  constructor() {}

  ngOnInit(): void {
    this.title = "Page not found"
    this.message = "We Couldn’t Find This Page";
  }
}
