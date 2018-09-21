import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';


import { URLSearchParams } from '@angular/http';

import {Post} from './post';

@Injectable()
export class CaptureLabServiceComponent {


 constructor(private http: Http) {

 }

 mobileAppDetails(): Observable<Post[]>{
     return this.http.get("/mobileAppsDetails")
    .map((response: Response) => <Post[]>response.json());
  
    }
    // saveApkLocally(fileName){
    //   console.log(fileName+"service")
    //   this.http.post('/saveApkLocally',fileName,{})

    // }

 captureLabServiceDetails() {
  let urlSearchParams = new URLSearchParams();
  urlSearchParams.append('devicesName',"Manish" );
  urlSearchParams.append('devicesId',"7345y713833434");
   
  
       this.http.post('/postDevicesName',urlSearchParams)
      .subscribe(data => {console.log(data);
    });
  }

  }