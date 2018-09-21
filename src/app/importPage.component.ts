import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';


import{ImportServiceComponent} from './importPage.service';
import {ProjectDetailServiceComponent} from './pDetail.service';

import {Post} from './post';

@Component({
   selector: 'app-import',
 
  templateUrl:'./html/importPage.component.html',

providers: [ProjectDetailServiceComponent]
   //styleUrls: ['./pDetail.component.css'],

       

})//componrnt  closing

export class ImportComponent implements OnInit   {
 
 
 
   // typeDataCollection:Post[];
   // priorityDataCollection:Post[]; 
   // typeDropdown:string; 
   // priorities=[];
   types:Post[];
   priorities:Post[];
  features:Post[];
  modules=[];
  allData:any;
  moduleSelected:string;
featureSelected:string;
typeSelected:string;
prioritySelected:string;
timeGiven:string;
   constructor(private importService:ImportServiceComponent,private router: Router,
     private data:ProjectDetailServiceComponent,private http:Http){
  //alert("jjjjjjjjjjjj")

   }


      ngOnInit(){
    
this.data.projectDetails()
          .subscribe(Data => this.modules=Data, error => console.log(error));
          this.importService.getTypeDetails()
          .subscribe(data => this.types=data);
           this.importService.featureDetails()
          .subscribe(llData => this.features=llData);

         // console.log(this.typeDataCollection)

         //   this.types=this.typeDataCollection;

console.log(this.types)

       this.importService.getPriorityDetails()
          .subscribe(llData => this.priorities=llData);

       //   // console.log(this.projectSelectionData)

       //     this.priorities=this.priorityDataCollection;




      }






      
      getfolder(e) {
   console.log(typeof(e))
}

saveImportData(){
  
  this.allData=this.moduleSelected+","+this.featureSelected+","+this.typeSelected+","
  +this.prioritySelected+","+this.timeGiven;
   //console.log( this.allData)
   //this.importService.importSaveDetails(this.allData)

let urlSearchParams = new URLSearchParams();
urlSearchParams.append('moduleName',this.moduleSelected);
urlSearchParams.append('featureName',this.featureSelected);
urlSearchParams.append('typeName',this.typeSelected);
urlSearchParams.append('priority',this.prioritySelected);
urlSearchParams.append('time',this.timeGiven);

    return this.http.post('/savingImportData', urlSearchParams)
      .subscribe(data => {
      console.log(data);
    });

}
      
 

  


}
