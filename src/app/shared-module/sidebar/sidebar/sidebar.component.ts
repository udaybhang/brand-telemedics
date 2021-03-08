import { Component, OnInit, AfterViewInit } from "@angular/core";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { NavigationItemModel } from "src/app/applicationModules/Models/sidebar-model";
import { ClinicThemeModel } from "src/app/applicationModules/Models/ClinicModel";
import { CommonService } from "src/app/Services/common/common.service";
import { toogleSidebar } from "src/app/Services/toogle/toogle-service";
import { globalConstanst } from "../../global-constants/global-constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  navigationItems: NavigationItemModel[] = [];
  logoBgColor!: string;
  constructor(
    private commonService: CommonService,
    public toogleservice: toogleSidebar
  ) {
    this.initilizeNavigationItems();
  } // private adminService: AdminService //private getSet: GetSetService,
  loggedInUserData: any;
  show: boolean = false;
  showFiller: boolean = false;
  UltimatePackListing!: number;
  FullfillmentListing!: number;
  Isphoto: boolean = false;
  photopath!: string;
  userData: any;
  loggedInUserDetails: any;
  adminData: any;
  superAdminLogo!: string;
  ngOnInit() {
    this.loggedInUserData = this.commonService.getCurrentUser();
    const admindetails = this.commonService.getMultitenantDetails();
    if(admindetails != null)
    this.superAdminLogo  = admindetails.superAdminLogo;
    console.log('admindetails.multitenanttext==', admindetails?.multitenanttext)
    if(admindetails != undefined) {
      this.logoBgColor =  this.commonService.getLogoBgColor(admindetails.multitenanttext);
    }
    
    if (this.loggedInUserData) {
      this.Isphoto = true;
      this.photopath = this.loggedInUserData.clinicLogoPathUrl;
    }

    $(document).ready(function () {
      $("#collapseDrp").addClass("collapsed");
    });

    $(document).ready(function () {
      $("#collapseDrp1").addClass("collapsed");
    });
  }

  initilizeNavigationItems() {
    this.navigationItems = [
      {
        name: "CLINIC_LIST",
        icon: "hospital-o",
        routerLink: "clinic",
        canAccessUserType: 1,
        sortOrder: 1,
        accessRoles:[]
      },
      {
        name: "PRACTITIONER_LIST",
        icon: "user-md",
        routerLink: "practitioner",
        canAccessUserType: 1,
        sortOrder: 1,
        accessRoles:[]
      },
      {
          name: "CLINIC_USERS",
          icon: "user-md",
          routerLink: "clinicAdmin",
          canAccessUserType:1,
          sortOrder:4,
          accessRoles:[]
      },
      {
        name: "PRACTITIONER_LIST",
        icon: "user-md",
        routerLink: "practitioner",
        canAccessUserType: 3,
        sortOrder: 1,
        accessRoles:[]
      },
      {
        name: "TELEVISIT_LIST",
        icon: "list-alt",
        routerLink: "meeting/list",
        canAccessUserType: 2,
        sortOrder: 1,
        accessRoles:[]
      },
     
      {
        name: "TELEVISIT_LIST",
        icon: "list-alt",
        routerLink: "meeting/list",
        canAccessUserType: 3,
        sortOrder: 2,
        accessRoles:[globalConstanst.roles.clinicAdmin, globalConstanst.roles.MedicalBiller]
      },
      {
        name: "COVID_TEST",
        icon: "list-alt",
        routerLink: "covid/list",
        canAccessUserType: 3,
        sortOrder: 3,
        accessRoles:[]
      },
      {
        name: "REPORTS",
        icon: "file-text-o",
        routerLink: "practitioner/visits-report",
        canAccessUserType: 2,
        sortOrder: 2,
        accessRoles:[]
      },
      {
        name: "REPORTS",
        icon: "file-text-o",
        routerLink: "practitioner/visits-report",
        canAccessUserType: 3,
        sortOrder: 4,
        accessRoles: [globalConstanst.roles.clinicAdmin, globalConstanst.roles.MedicalBiller]
      },
    
      {
        name: "CUSTOMIZATIONS",
        icon: "tasks",
        routerLink: "practitioner/customizations",
        canAccessUserType: 2,
        sortOrder: 3,
        accessRoles:[]
      },
      {
        name: "CUSTOMIZATIONS",
        icon: "tasks",
        routerLink: "practitioner/customizations",
        canAccessUserType: 3,
        sortOrder: 5,
        accessRoles:[]
      },
      {
        name: "SCHEDULER",
        icon: "tasks",
        routerLink: "practitioner/schedule",
        canAccessUserType: 2,
        sortOrder: 4,
        accessRoles:[]
      },
      {
        name: "SCHEDULER",
        icon: "tasks",
        routerLink: "practitioner/schedule",
        canAccessUserType: 3,
        sortOrder: 6,
        accessRoles:[]
      },
      {
        name: "CONSENT_LIST",
        icon: "list-alt",
        routerLink: "consent/list",
        canAccessUserType: 3,
        sortOrder: 7,
        accessRoles:[]
      },    
      {
        name: "SETTINGS",
        icon: "list-alt",
        routerLink: "clinic/editclinic",
        canAccessUserType: 3,
        sortOrder: 8,
        accessRoles:[]
      },      
      {
        name: "AVAILABILITY",
        icon: "hospital-o",
        routerLink: "clinicAdmin/availability",
        canAccessUserType: 3,
        sortOrder: 9,
        accessRoles:[]
      }
      
    ];



    this.filterNavigationItems();
  }

  filterNavigationItems() {
    var user = this.commonService.getCurrentUser();
    if (user) {
      this.navigationItems = this.navigationItems.filter(
        (x) => x.canAccessUserType == user.userType
      );
    }

    const isSuperAdmin = this.commonService.isUserInAdminRole(globalConstanst.roles.superAdmin);
    if(isSuperAdmin) {
      const tenant = this.commonService.getTenantName();
      
      const adminLInk = this.navigationItems.filter(x => x.name.startsWith("superadmin")).length

      if(adminLInk == 0){
      this.navigationItems.push({
        name: tenant+" Users",
        icon: "user-md",
        routerLink: "superadmin/list",
        canAccessUserType: 1,
        sortOrder: 5,
        accessRoles:[]
      });
      this.navigationItems.push({
        name: "SETTINGS",
        icon: "cogs",
        routerLink: "settings/clinicsettings",
        canAccessUserType: 1,
        sortOrder: 6,
        accessRoles:[]
      });       
    }
    } else {
      this.navigationItems = this.navigationItems.filter(x => !x.name.startsWith("superadmin"))
    }
    const isClinicAdmin = this.commonService.isUserLoggedIn(3);
    if(isClinicAdmin){
    const isClinicAdminRole = this.commonService.isUserInRole(globalConstanst.roles.clinicAdmin);
    const isMedicalBillerRole = this.commonService.isUserInRole(globalConstanst.roles.MedicalBiller);
    if(isClinicAdminRole) {
        this.navigationItems.push(
          {
            name: "CLINIC_USERS",
            icon: "user-md",
            routerLink: "clinicAdmin/users",
            canAccessUserType: 3,
            sortOrder: 10,
            accessRoles:[]
          }
        );
    }
    if(isMedicalBillerRole && !isClinicAdminRole) {
      this.navigationItems = this.navigationItems.filter(x => x.accessRoles.includes(globalConstanst.roles.MedicalBiller));
    }
  }
  }

  //UserType = UserType;
  ngAfterViewInit() {
    this.toogleservice.toggleSidebar.subscribe(() => {
      $("body").toggleClass("collapsedSidebar");
    });

    $(".navbar-nav").click(function () {
      $("#dropdown-lvl2").addClass("collapse");
      $("#dropdown-lvl1").addClass("show");
    });

    $(".navbar-nav2").click(function () {
      $("#dropdown-lvl2").addClass("show");
    });

    // if ($(window).width() < 992) {
    //   $("body").addClass("collapsedSidebar");
    // }
    // $(window).on("resize", function () {
    //   if ($(window).width() < 992) {
    //     $("body").addClass("collapsedSidebar");
    //   } else {
    //     $("body").removeClass("collapsedSidebar");
    //   }
    // });

    this.initilizeNavigationItems();
  }

  getLoggedInUserDetails() {
    this.loggedInUserDetails = this.userData.userInfo;
  }
  logoutUser() {
    this.commonService.logoutUser();
  }
}
