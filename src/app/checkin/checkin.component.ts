import { Component, OnInit } from '@angular/core';
import { PageDetailsModel } from './models/page-details.model';
import { CheckinDetailsModel } from './models/checkin-details.model';
import { CommonService } from '../common.service';
import { NgForm } from "@angular/forms";

import { TranslateService } from "ng2-translate";

const defaultLanguage = "en";
const additionalLanguages = ["nl"];
const languages: string[] = [defaultLanguage].concat(additionalLanguages);
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  providers: [CommonService]
})

export class CheckinComponent implements OnInit {

  checkinDetailsModels: CheckinDetailsModel = new CheckinDetailsModel();
  pageData;
  lang:string='en';
  pageError;
  pageSuccess;
  langs: string[];
  constructor(private checkinService: CommonService, private translate: TranslateService) { this.pageError = ""; this.pageSuccess = "" };

  onChange() {
    this.pageError = ""; this.pageSuccess = ""
    this.translate.use(this.lang);


  }

  ngOnInit() {
    this.langs = languages;
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.addLangs(additionalLanguages);
    this.translate.use(defaultLanguage);
  }



  onSubmit(form: NgForm) {
    this.pageError = ""; this.pageSuccess = ""
    let self = this;
    this.checkinService.postCheckInDetails(JSON.stringify(this.checkinDetailsModels), this.lang)
      .subscribe(
      pageData => { console.log('Completed pageDataLoad!' + pageData); self.pageSuccess = "Success!!!" },
      error => { console.log(error.text()); var data = JSON.parse(error.text()); self.pageError = data.Code+" : "+data.Description; },
      () => console.log('Completed pageDataLoad!')
      );
  }

 

}
