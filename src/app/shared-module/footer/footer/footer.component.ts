import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { DataExchangeService } from 'src/app/Services/data-exchange/data-exchange-service';
import { CommonService } from 'src/app/Services/common/common.service';
import { GeneralDataService } from 'src/app/Services/general-data/general-data-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
MultitenantText: string;
subscriptions = new SubSink();
constructor(private dataexchangeservice : DataExchangeService,
  private generalservice : GeneralDataService,
  private commonservice : CommonService) { }
  ngOnInit(){
    const admindetails = this.commonservice.getMultitenantDetails();
    if(admindetails != null)
    this.MultitenantText  = admindetails.multitenanttext;
    // this.subscriptions.add(this.dataexchangeservice.getAdminDetails().subscribe((res) => {

    //   if (res != null)
    //     this.MultitenantText = res.multitenanttext;
    // }));
  }


ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}



}
