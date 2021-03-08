import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { PractitionerService } from "src/app/Services/Practitioner/practitioner.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { PractitionerModel } from "src/app/applicationModules/Models/practitionerViewModel";
import { ClinicService } from "src/app/Services/Clinic/clinicService";
// import { DatePipe } from "@angular/common";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { SubSink } from "subsink";
import { MatSelect } from "@angular/material/select";
import { CommonService } from "src/app/Services/common/common.service";
import { globalConstanst } from "src/app/shared-module/global-constants/global-constants";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-practitioner-list",
  templateUrl: "./practitioner-list.component.html",
  styleUrls: ["./practitioner-list.component.css"],
})
export class PractitionerListComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  PractitionerList:any = [];
  isClinicAdmin=false;
  isFiltered: boolean = false;
  clinicsList = [];
  isFirstLoad = true;
  clinicsListSearch = [];
  clinicId!: number;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  dataSource: any;
  orderStatus: any;
  displayedColumns: string[] = [
    "fullName",
    "clinicName",
    "email",
    "Specialty",
    "Status",
    "Id",
  ];

  constructor(
    private practitionerService: PractitionerService,
    private spinner: NgxSpinnerService,
    private clinicservice: ClinicService,
    private toastrService: ToastrService,
    private router: Router,
    // public datepipe: DatePipe,
    public commonService: CommonService,
    private activatedRoute:ActivatedRoute,
    private translate:TranslateService
  ) {}
  ngOnInit(): void {
    const clinicId = this.activatedRoute.snapshot.paramMap.get("clinicId");
    if(clinicId) {
      this.clinicId = Number(clinicId);
    }
    this.isClinicAdmin = this.commonService.isUserLoggedIn(3);
    this.getPractitionerList();
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     this.setLabelText();
  });
  }
  translateText(text: any): string {
    return this.translate.instant(text);
  }

  @ViewChild("singleSelect")
  singleSelect!: MatSelect;
  
  applyFilter(filterValue: any) {
    console.log('filterValue===', filterValue )
    if(filterValue){
   filterValue = filterValue.toLowerCase();
    if (this.PractitionerList.length > 0 && this.selectedClinic == 0) {
      this.PractitionerList = this.PractitionerList.filter((x:any) =>
        x.user.fullName.toLowerCase().includes(filterValue) ||
        x.user.clinic.name.toLowerCase().includes(filterValue) ||
        x.user.email.toLowerCase().includes(filterValue) 
       || x.primarySpeciality.toLowerCase().includes(filterValue)
      );
      this.dataSource = new MatTableDataSource(this.PractitionerList);
      this.dataSource.paginator = this.paginator;
    }
    else if (this.filterPractitionerList.length > 0) {
      this.filterPractitionerList = this.filterPractitionerList.filter((x:any) =>
      x.user.fullName.toLowerCase().includes(filterValue) ||
      x.user.clinic.name.toLowerCase().includes(filterValue) ||
      x.user.email.toLowerCase().includes(filterValue) 
     || x.primarySpeciality.toLowerCase().includes(filterValue)
      );
      this.dataSource = new MatTableDataSource(this.filterPractitionerList);
      this.dataSource.paginator = this.paginator;
    }
  }
    else {
      this.getPractitionerList();
    }
  }

  clinicSearch(filterValue: any) {
    if (this.clinicsList.length > 0 && filterValue != "") {
     this.clinicsListSearch = [...this.clinicsList.filter((x:any) =>
        x.name.toLowerCase().includes(filterValue)
      )];
      console.log('this.clinicsListSearch====', this.clinicsListSearch)
      // if(this.clinicsListSearch.length > 0){
      //   this.clinicsList = [];
      //   this.clinicsList = this.clinicsListSearch;
      // }
    } else if (filterValue == "" || filterValue == undefined) {
        this.clinicsListSearch = [...this.clinicsList];
     // this.getClinics();
    }
    if(!this.clinicsListSearch || this.clinicsListSearch.length ==0){
      setTimeout(() => { // this is to show the message 'no entries found for 1 second'
      this.clinicsListSearch = this.clinicsList;
      }, 1000);
    }
  }

  getPractitionerList() {
    this.spinner.show();
    this.subscriptions.add(
      this.practitionerService
        .getAllPractitionerList()
        .subscribe((response: any) => {
          if (response != null && response.isSuccess) {
            this.PractitionerList = response.data;
            this.PractitionerList = this.PractitionerList.map((x:any) => {
              if(x.specialities && x.specialities.length > 0){
                const primaryS = x.specialities.find((x: { isPrimary: any; }) => x.isPrimary);
                if(primaryS){
                  x.primarySpeciality = primaryS.name
                }else {
                  x.primarySpeciality = "";
                }

              }  else {
                x.primarySpeciality = "";
              }
              return x;
            });
            this.dataSource = new MatTableDataSource(this.PractitionerList);
            this.dataSource.sortingDataAccessor = (item: any, property: any) => {
              switch (property) {
                case "fullName":
                  return item.user.fullName;
                case "clinicName":
                  return item.user.clinic.name;
                  case "Specialty":
                    return item.primarySpeciality;
                case "email":
                  return item.user.email;
                case "Status":
                  return !item.isActive;
                default:
                  return item[property];
              }
            };
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
            this.setLabelText();
            if(!this.isFirstLoad){
              this.ClinicChange(this.selectedClinic);
            }

            if(!this.isClinicAdmin && this.isFirstLoad)
            {
              this.isFirstLoad = false;
              this.getClinics();
            }
            
          } else {
            this.spinner.hide();
            this.toastrService.error(this.translateText('SOMETHING_WENT_WRONG'));
          }
        })
    );
  }

  getPageType(practitionerId: any, id:any, type:any) {
    if (practitionerId != null && id > 0) {
      this.router.navigate([
        "/practitioner/view/1/" + practitionerId + "/" + id,
      ]);

      if (type == "edit") {
        this.router.navigate([
          "/practitioner/edit/2/" + practitionerId + "/" + id,
        ]);
      }
    }
  }

  setLabelText(){
    if(this.paginator) {
      this.paginator._intl.itemsPerPageLabel = this.translate.instant("ITEMS_PER_PAGE");
    }
   
    this.dataSource.paginator =this.paginator;

      this.clinicsListSearch.map((x:any)=> { 
      if(x.id == 0) {x.name = this.translate.instant("ALL")}
     return x;          
     });

     this.clinicsList.map((x:any) => { 
       if(x.id ==0) {x.name = this.translate.instant("ALL")}
      return x;          
      });

 }

  addPractitionerPage() {
    this.router.navigate(["/practitioner/add/0/" + this.selectedClinic]);
  }

  getClinics() {
    this.spinner.show();
    this.subscriptions.add(
      this.clinicservice.getAllClinicsList().subscribe((response: any) => {
        if (response != null && response.isSuccess) {
          //this.clinicsList = response.data;
          this.clinicsList = response.data.filter((x: { isActive: any; }) => x.isActive);
          // this.clinicsList.splice(0, 0, { id: 0, name: "All" });
          this.clinicsList.splice(0, 0);
          this.clinicsListSearch = this.clinicsList;
          this.spinner.hide();
          if(this.clinicId && this.clinicId != 0) {
            this.selectedClinic = this.clinicId;
            this.ClinicChange(this.clinicId);
          }
        } else {
          this.spinner.hide();
          this.toastrService.error(this.translateText('SOMETHING_WENT_WRONG'));
        }
      })
    );
  }

  selectedClinic = 0;
  filterPractitionerList = [];
  ClinicChange(selectedClinic: any) {
    this.clinicsListSearch = [...this.clinicsList];
    this.spinner.show();
    if (this.PractitionerList) {
      if (this.selectedClinic == 0) {
        this.dataSource = new MatTableDataSource();
        this.dataSource = new MatTableDataSource(this.PractitionerList);
      } else {
        this.filterPractitionerList = this.PractitionerList.filter(
          (x:any) => x.user.clinicId == selectedClinic
        );
        this.dataSource = new MatTableDataSource();
        this.dataSource = new MatTableDataSource(this.filterPractitionerList);
      }
      this.dataSource.sortingDataAccessor = (item:any, property:any) => {
        switch (property) {
          case "fullName":
            return item.user.fullName;
          case "clinicName":
            return item.user.clinic.name;
            case "Specialty":
              return item.primarySpeciality;
          case "email":
            return item.user.email;
          case "Status":
            return item.isActive;
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }
  }
  deletePractitioner(id: any) {
    Swal.fire({
      title: this.translate.instant("ARE_YOU_SURE"),
      text: this.translate.instant("DO_YOU_WANT_TO_DELETE_THIS_RECORD"),
      type: "warning",
      showCancelButton: true,
      confirmButtonText: this.translate.instant("YES_DELETE_IT"),
      cancelButtonText: this.translate.instant("NO_KEEP_IT")
    }).then((result) => {
      if (result.value) {
        this.subscriptions.add(
          this.practitionerService
            .deletePractitionerById(id)
            .subscribe((response: any) => {
              if (response.isSuccess) {
                Swal.fire(
                  this.translate.instant("DELETED"), this.translate.instant("RECORD_HAS_BEEN_DELETED"),
                  "success"
                );
                this.getPractitionerList();
              } else if (response.statusCode==1001) {
                this.toastrService.error(this.translateText("CAN_NOT_DELETE_PRACTITIONER_TEXT"));
              }
              else  {
                console.log(response);
                this.toastrService.error(this.translateText('SOMETHING_WENT_WRONG'));
              }
            })
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       // Swal.fire("Cancelled", "Your record is safe :)");
      }
    });
  }

  getPractitionerRandomColorStatus(isActive: any) {
    if (isActive) {
      return isActive != "" ? "green" : "green";
    } else {
      return isActive != "" ? "red" : "red";
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  
  get isDoctorAdder(): boolean{
    return this.commonService.isUserInAdminRole(globalConstanst.roles.doctorAdder);
   }
   
   get isDoctorUpdater(): boolean{
     return this.commonService.isUserInAdminRole(globalConstanst.roles.doctorUpdater);
    }
   
    get isDoctorDeleter(): boolean{
     return this.commonService.isUserInAdminRole(globalConstanst.roles.doctorDeleter);
    }
}
