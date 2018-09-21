import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Post} from './post';


@Injectable()
export class TestExecutionServiceComponent {


constructor(public http:Http){

}
getProjectSelectionDetails():Observable<Post[]>{
//alert("ll00")
return this.http.get("/selectionProject")
.map((response:Response)=><Post[]>response.json());

}
allDetails:Object={};

testScriptDetails(ss):Observable<Post[]>{
// alert("ll00")
return this.http.get("/getTestScriptDetails"+ss)

.map((response:Response)=><Post[]>response.json());


} 

projectDetails(p): Observable<Post[]>{
//alert("00"+p)
return this.http.get("/getModuleNames"+p)
.map((response: Response) => <Post[]>response.json());

}
// projectIDS (p): Observable<Post[]>{
// alert("00"+p)
// return this.http.get("/projectIds"+p)
// .map((response: Response) => <Post[]>response.json());

// }






rahulDetails(rah):Observable<Post[]>{
//alert("ll00")
return this.http.get("/rahuldetails"+rah)

.map((response:Response)=><Post[]>response.json());


}

showDetails(vv): Observable<Post[]>{
alert("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"+vv)
return this.http.get("/testScript")
.map((response: Response) => <Post[]>response.json());
}



childModuleDetails(index): Observable<Post[]> {

// alert(typeof(index)+index)
// let params = new URLSearchParams();
// params.set('selectedModule', 'selectedModule');

return this.http.get('/getFeatureName' + index)
.map((response: Response) => <Post[]>response.json());
// console.log(response.json())

}

totadeytails(vj){
var allDetails=[]
allDetails=vj;
console.log(allDetails);
}

allrahul(){
return this.allDetails;
}

childModuleDetails1(): Observable<Post[]> {

// alert(typeof(index)+index)
// let params = new URLSearchParams();
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
