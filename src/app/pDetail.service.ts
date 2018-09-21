import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';


import { URLSearchParams } from '@angular/http';

import {Post} from './post';
@Injectable()
export class ProjectDetailServiceComponent {


 constructor(private http: Http) {

 }
// response:any
   projectDetails(): Observable<Post[]>{
// alert("ll00")
   return this.http.get("/getModuleName")
  .map((response: Response) => <Post[]>response.json());

  }

  
     moId(clickModule):Observable<Post[]>{
   //alert("ll00")
   return this.http.get("/getMoId"+clickModule)
  .map((response:Response)=><Post[]>response.json());

  }
getProjectDir(searchDir):Observable<Post[]>{
   //alert(searchDir)
   return this.http.get("/searchDir"+searchDir)
  .map((response:Response)=><Post[]>response.json());

  }

    childModuleDetails(index): Observable<Post[]> {

// alert(typeof(index)+index)
//     let params = new URLSearchParams();
// params.set('selectedModule', 'selectedModule');

   return this.http.get('/getFeatureName' + index)
   .map((response: Response) => <Post[]>response.json());
   //console.log(response.json())

  }


     createFolder(folderName): Observable<Post[]>{
 //alert(folderName)
   return this.http.get("/createFolder"+folderName)
  .map((response: Response) => <Post[]>response.json());

  }

 


  childModuleDetails1(): Observable<Post[]> {

    // alert(typeof(index)+index)
    //     let params = new URLSearchParams();
    // params.set('selectedModule', 'selectedModule');

       return this.http.get('/featureName')
       .map((response: Response) => <Post[]>response.json());
     // console.log(response.json())
      }


  // response:any
   typeDetails(): Observable<Post[]> {
    // alert("ll00")
       return this.http.get("/importType")
      .map((response: Response) => <Post[]>response.json());

      }

      priorityDetails(): Observable<Post[]> {
        // alert("ll00")
           return this.http.get("/importPriority")
          .map((response: Response) => <Post[]>response.json());

          }


          
}
