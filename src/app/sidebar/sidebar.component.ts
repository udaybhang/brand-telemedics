import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private common: CommonService) { }

  logout() {
    this.common.logoutUser();
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $(".sideMenuToggler").on("click", function() {
          $(".wrapper").toggleClass("active");
        });
      
      });

  }

}
