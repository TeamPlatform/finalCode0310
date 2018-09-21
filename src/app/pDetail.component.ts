import { Component, Input,OnInit} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ProjectDetailServiceComponent } from './pDetail.service';
import {Post} from './post';
import {SelectionComponent} from './projectSelection.component';



@Component({
   selector: 'app-detail',
 
  templateUrl:'./html/projectDetail.html',

   styleUrls: ['./css/pDetail.component.css'],

      providers: [ProjectDetailServiceComponent]   

})//componrnt  

export class ProjectDetailComponent implements OnInit  {
   moduleChild:Post[];
  // moduleId:Post[];
   index:Post[];

moduleName:any;

    projectName:string;
    
 //moduleChild:any[]=[];
 indexvalue:number;

 message:string;
    show: boolean;
    mo:boolean;
    execute:boolean;
    con:boolean;
testExecution:boolean;
displayModule:boolean;
displayFeature:boolean;
displayImport:boolean;
 sMN:string;
 validMn:string;
 ind:number;
importMessage:any;
valid:boolean
everyTime: any;
selectedMod:Post[];
waitMessage:any;
wM:string;
    constructor(private router: Router,private route:ActivatedRoute,private module:ProjectDetailServiceComponent) {
    this.show = false;
    this.mo=false;
    this.execute=false;
 this.testExecution=false;
 this.displayModule=false;
 this.displayFeature=false;
 this.displayImport=false;
    }
 
 

      ngOnInit(){

            let dataFromProjectSelectionDropdown=sessionStorage.getItem('key');
            this.projectName=dataFromProjectSelectionDropdown;
            this.module.projectDetails().subscribe(moduleData =>this.moduleName=moduleData);
            //alert(dataFromProjectSelectionDropdown+"lll")
//             if(dataFromProjectSelectionDropdown!=undefined){
//               //alert("sss")
       
// }
      }
 

 
   showDropDown:boolean;
 

manualtoggle(clickModule,index){
 this.sMN=clickModule;
 this.ind=index;
//alert(index+"000")
 
 this.module.moId(clickModule).subscribe(moduleData =>{this.selectedMod=moduleData;this.verificationModule(this.selectedMod)
;this.index=this.selectedMod[0].unitedFM});


this.module.childModuleDetails(index)
.subscribe(moduleData =>{this.moduleChild=moduleData;
  this.indexvalue=this.moduleChild[0].moduleId;
  console.log(this.moduleChild) });
  console.log(this.moduleChild[0].moduleId);

 


}
verificationModule(vMF){
  //console.log(vMF)
  this.validMn=vMF[0].moduleName;
 


  }
  
ngOnDestroy(){
 console.log("destroy")
  clearInterval(this.everyTime);


}



     
        changeShowStatus(){
          //alert( this.valid)
//this.isValid="isValid";
  if( this.valid!=true){
           this.show = true;
           this.testExecution=false;
           this.mo=false;
           this.execute=false;
            } 
 
        }
    
        showTestExecution(folderName){
          
          
//alert(this.projectName)
 
 this.module.getProjectDir(this.projectName).subscribe(moduleData =>{this.importMessage=moduleData;this.importData(this.importMessage);console.log(this.importMessage)});
//alert(this.waitMessage)
this.module.createFolder(folderName).subscribe(moduleData =>{this.importMessage=moduleData;this.importData(this.importMessage);console.log(this.importMessage)});

//alert(this.importMessage+"oppppu")
// if(this.importMessage==undefined){
//  //this.importMessage="Please Wait While Files Are Synchronizing"
 this.show = false;
   this.testExecution=true;
   this.mo=false;
   this.execute=false;

// } else{
  // this.show = false;
  //  this.testExecution=true;
  //  this.mo=false;
  //  this.execute=false;
//  // this.importMessage="Please Wait While Files Are Synchronizing "
 //}


   
        }
        importData(data){
          this.valid=true;
          //alert(data)
 if(data==="Please Wait Files Are Synchronizing"){
          this.importMessage=data
       
        }
        else if(data==="Synchronized Done"){
       this.importMessage=data
       this.valid=false;

        }

         // else{
         // alert(this.importMessage)
   //         this.show = false;
   // this.testExecution=true;
   // this.mo=false;
   // this.execute=false;
   // this.valid=false;
 // }

}
          goCreateModule(){
      this.everyTime=setInterval(() => {
      this.ngOnInit();
 
 }, 1000);
      //console.log("kk")
          //var displayModule:string
          this.displayModule=true;
          this.displayFeature=false;
          this.displayImport=false;

  }
           goCreateFeature(){
          this.displayFeature=true;
          this.displayModule=false;
          this.displayImport=false;
        }
       goImport(){
         //alert("1st")
          this.displayImport=true;
          this.displayModule=false;
          this.displayFeature=false;
        }

        mobile(){
          this.mo=true;
          this.execute=false;
          this.show=false;

        }

        execution(){

        this.execute=true;
           this.mo=false;
           this.show=false;

        }

        connect(){
          this.con=true;
       } 

}
