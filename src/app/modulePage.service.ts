import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';
import {Post} from './post'


@Injectable()
export class ModuleServiceComponent {

 
 constructor(public http:Http){

 }
//    moduleServiceDetails(moduleName){

//   let urlSearchParams = new URLSearchParams();
// urlSearchParams.append('moduleName', moduleName);


//     return this.http.post('/postModuleName', urlSearchParams)
//       .subscribe(data => {
//       console.log(data);
//     });
 

//   }

 idDetails():Observable<Post[]>{
 	//alert("ll00")
   return this.http.get("/idModule")
  .map((response:Response)=><Post[]>response.json());

  }


}