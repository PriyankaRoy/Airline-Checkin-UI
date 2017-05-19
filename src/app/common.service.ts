import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import {baseURL} from './app.constants';

@Injectable()
export class CommonService {
 response :any;
     constructor(private http: Http) { }

// serviceRequest(apiURL , type , data){
//     return this.response = this.http[type](baseURL+apiURL,data)
//       .map(response => response.json());
// }
getCheckInServiceData(lang) {
   let headers = new Headers();
   headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append("Accept-Language", lang);
   headers.append("Access-Control-Allow-Origin", "*");
  
    return this.http.get('http://localhost:3000/newapp/checkin',{
      headers: headers
    })
      .map(response => response.json());
  }

postCheckInDetails(checkin,lang) {
   let headers = new Headers();
   headers.append('Content-Type', 'application/json; charset=utf-8');
   headers.append('Accept', 'application/json; charset=utf-8');
    headers.append("Accept-Language", lang);
 // headers.append("Accept-Language", checkin);
   headers.append("Access-Control-Allow-Origin", "*");
  
    return this.http.post('http://localhost:3000/newapp/checkin',checkin,{
      headers: headers
    })
      .map((response:any) => response.json());
  }






}
