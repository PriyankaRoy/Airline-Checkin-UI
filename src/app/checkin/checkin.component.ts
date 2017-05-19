import { Component, OnInit } from '@angular/core';
import { PageDetailsModel } from './models/page-details.model';
import { CheckinDetailsModel } from './models/checkin-details.model';
import { CommonService } from '../common.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  providers: [CommonService]
})
export class CheckinComponent implements OnInit {


  pageDetailsModels: PageDetailsModel = new PageDetailsModel();
  checkinDetailsModels: CheckinDetailsModel = new CheckinDetailsModel();
  pageData;
  lang = 'en';
  pageError;
  pageSuccess;
  constructor(private checkinService: CommonService) { this.pageError = ""; this.pageSuccess = "" };

  onChange() {
    this.pageError = ""; this.pageSuccess = ""
    this.serviCall();
  }

  ngOnInit() {
    this.serviCall();
  }

  serviCall() {
    this.checkinService.getCheckInServiceData(this.lang)
      .subscribe(
      pageData => { console.log('Completed pageDataLoad!'); this.pageData = pageData, this.createModelData() },
      error => console.error('Error: '),
      () => console.log('Completed pageDataLoad!', this.pageData)
      );
  }


  createModelData() {
    let PageDetailsDataModel;
    PageDetailsDataModel = new PageDetailsModel();
    PageDetailsDataModel.language = this.pageData.language;
    PageDetailsDataModel.header = this.pageData.header;
    PageDetailsDataModel.details = this.pageData.details;
    PageDetailsDataModel.pnr = this.pageData.pnr;
    PageDetailsDataModel.pnrError = this.pageData.pnrError;
    PageDetailsDataModel.pnrLabel = this.pageData.pnrLabel;
    PageDetailsDataModel.firstname = this.pageData.firstname;
    PageDetailsDataModel.lastname = this.pageData.lastname;

    PageDetailsDataModel.firstnameError = this.pageData.firstnameError;
    PageDetailsDataModel.lastnameError = this.pageData.lastnameError;
    PageDetailsDataModel.firstnameLabel = this.pageData.firstnameLabel;
    PageDetailsDataModel.lastnameLabel = this.pageData.lastnameLabel;
    PageDetailsDataModel.submit = this.pageData.submit;
    this.pageDetailsModels = PageDetailsDataModel;
    // this.pageDetailsModels.push(PageDetailsDataModel);
  }
  onSubmit(form: NgForm) {
    this.pageError = ""; this.pageSuccess = ""
    let self = this;
    console.log(this.checkinDetailsModels);
    console.log(JSON.stringify(this.checkinDetailsModels));
    this.checkinService.postCheckInDetails(JSON.stringify(this.checkinDetailsModels), this.lang)
      .subscribe(
      pageData => { console.log('Completed pageDataLoad!' + pageData); self.pageSuccess = "Success!!!" },
      error => { console.log(error.text()); var data = JSON.parse(error.text()); self.pageError = data.Description; },
      () => console.log('Completed pageDataLoad!')
      );
  }

  // alert("submited");
  //alert(JSON.stringify(this.checkinDetailsModels));

  //arey now do css thing in your system and anyother fix i need to sedn

}
