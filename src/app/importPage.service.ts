import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import {Post} from './post'
@Injectable()
export class ImportServiceComponent {

 
 constructor(public http:Http){

 }
   getTypeDetails():Observable<Post[]>{
 	//alert("ll00")
   return this.http.get("/importType")
  .map((response:Response)=><Post[]>response.json());

  }
     getPriorityDetails():Observable<Post[]>{
 	//alert("ll00")
   return this.http.get("/importPriority")
  .map((response:Response)=><Post[]>response.json());

  }
     featureDetails():Observable<Post[]>{

  
    return this.http.get('/featureName')
    .map((response:Response)=><Post[]>response.json());
 

  }

}