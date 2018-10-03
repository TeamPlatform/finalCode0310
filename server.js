const express=require('express');
const app=express();
const path=require('path');
var mongo = require('mongodb');
const bodyParser=require('body-parser');
var rimraf = require('rimraf');
//const crypto=require('crypto')//give file name
const multer=require('multer')
const GridFsStorage=require('multer-gridfs-storage')
const gridfs=require('gridfs-stream')
var mongojs=require('mongojs');
var mongoose  = require('mongoose');
var fs = require('fs');
const exec = require('child_process')
const JSON = require('circular-json');


//var mongoStore = require('connect-mongo')(session);

var methodOverride = require('method-override');
var bson = require('bson');
var Promise = require('es6-promise').Promise;
//var Decimal128 = require('mongodb').Decimal128;
app.use(bodyParser.json({limit: '50mb'})); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));// parse application/x-www-form-urlencoded

app.use(bodyParser.json());
//const api=require('./server/routes/api')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var db=mongojs('collections',['asd'])
console.log(db)

//for folders
mongoose.connect('mongodb://localhost:27017/collections')
mongoose.Promise = global.Promise;

gridfs.mongo = mongoose.mongo;
/*
  Check MongoDB connection
*/
var connection = mongoose.connection;
// const upload = multer({
//   dest: './uploads/' // this saves your file into a directory called "uploads"
// }); 
  //var gfs = gridfs(connection.db);
var shell = require("shelljs");



// Mongo URI
const mongoURI = 'mongodb://localhost:27017/collections';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
var gfs;






conn.once('open', () => {
  // Init stream
  gfs = gridfs(conn.db, mongoose.mongo);
 
   gfs.collection('folder');
//   gfs.files.find().toArray(function (err, files) {
 
//     console.log(files.length)
//     console.log(files)
// })  

});

// gfs = gridfs(conn.db, mongoose.mongo);
// gfs.collection('folder');
 
//Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      //crypto.randomBytes(16, (err, buf) => {
 
        var path = req.params.a;
        var latestPath =   path.replace(/[-]/gi, '/');
       
        let data_Array = latestPath.split("/");
     
        var latestPath123 = data_Array.splice(data_Array.length-1);
 var myJSON = JSON.stringify(latestPath123);
           
             latestPath = latestPath.substring(0, latestPath.length - myJSON.length+3); // "12345.0"
     
      
       // var newDestination = 'uploads/' + latestPath;




        // if (err) {
        //   return reject(err);
        // }
        
        const filename = file.originalname;
       

        const fileInfo = {
            metadata:'uploads/'+latestPath,
          filename:filename,
          contentType :data_Array[0],
          bucketName: 'folder'
        };
        resolve(fileInfo);
    //  });
    });
  }
});
const upload = multer({ storage });

// <<<<<<< HEAD

// var incOnce=1;
// if(incOnce===1){
//   db.countInc.insert({ "projectID" : "pID",
//     "moduleID" : "mID",
//     "featureID" : "fID",
//     "scriptID" : "sID",
//     "fCount" : 1,
//     "pCount" : 1,
//     "mCount" : 1,
//     "sCount" : 1})

//   incOnce++
// }




// var dir = __dirname+/uploads/;

// fs.readdir(dir, function(err, files){
//   //console.log(files)
//   files = files.map(function (fileName) {
//      //console.log("111"+fileName)
//     return {

//       name: fileName,
//        time: fs.statSync(dir + '/' + fileName).mtime
        

//     };
//   })
//    .sort(function (a, b) {
  

//     return a.time - b.time; })
//   .map(function (v) {
  
//     var minCheck=(((new Date()-v.time)/1000)/60)
//     var finalDir=dir+v.name
//     console.log(minCheck)
//     console.log(finalDir)
//     if (minCheck<10){
//      console.log("dddddddddd") 
// rimraf(finalDir, function () { console.log('done'); }); 
//     }


//   });
// }); 







var aCount = null;
  var smId=null;
   var sfID=null;
   var ssID=null;
   //var pIDSyn=null;
    var proID=null;
    var  pCount=null;
     var  mCount=null;
      var  fCount=null;
       var  sCount=null;
    var pID=null;
var moduleCount = 1;

 
app.post("/projectSelection/:a",upload.any(),function(req, res,next) {
//console.log(req.body.dataFromFrameworkDropdown)
//console.log(req.body.dataFromFrameworkDropdown+"ppp")
    db.countInc.find({},function(err,doc){
    proID=doc[0].projectID
   pCount=doc[0].pCount
     mCount=doc[0].mCount
       fCount=doc[0].fCount
         sCount=doc[0].sCount
   smId=doc[0].moduleID
      sfID=doc[0].featureID
        ssID=doc[0].scriptID

//console.log(pID+"uiiiii")
   
   })



   let projectName = req.files[0].fieldname.split("/");
 
  var path=__dirname+"/uploads/"+projectName[0]
                          //  console.log(path)
let lengthCount = Number(req.body.totalLength-1);

                                  // if()
 if( Number(req.body.currentLength) === Number(req.body.totalLength-1) && !fs.existsSync(path)){
 //console.log("1111111111111uuuuuuu")
    var trialCall = function() {
        //  setTimeout(function() {
      //console.log("Task 311111111111113333333333333333333333333333  ");
         // conn.once('open', () => {
            // Init stream
            // gfs = gridfs(conn.db, mongoose.mongo);
           
            //  gfs.collection('folder');
           //var  lengthCount =1910;
            // setTimeout(function() {
          gfs.files.find({contentType:projectName[0]}).toArray(function (err, files) {

            console.log("files length  "+files.length)
             let lengthCheck = files.length ; 
             var totalfiles=files.length
           //  console.log(files)
             let i = 0;
            // for(m =1;m<=lengthCount;m++){
               //console.log(" heelo 3 "+i)
    
           //return new Promise((resolve, reject) => {
      
               
             //files.forEach(function(files) {
                //trialcall1(0)
                let m =0;
              var  trialcall1 =  function(m){
                    if(m=== lengthCheck){
                      console.log("eeeeeeeeee")
                      //   setTimeout(function(){

                      
                      //   createDbs(files[m].contentType)
                    
                      // },30000);
                       // createDbs(files[m].contentType)
                        //console.log(m+" no loop "+"   "+files[m].filename) 
                    }else{
                  //console.log("333333333uuuuuuu")
                        shell.mkdir('-p',"./"+files[m].metadata)
      
             const stream = gfs.createReadStream(files[m].filename);
      
          var eam = fs.createWriteStream(__dirname+"/"+files[m].metadata+"/"+files[m].filename);
      
      
              stream.pipe(eam);

              m++;
                              if(m==totalfiles-1 ){
  eam.on('finish', function(){


// console.log(ssID+"aa"+sfID+"aa"+ smId+"aa"+sCount+"aa"+fCount+"aa"+mCount+"aa"+pCount+"aa"+proID)            
if(req.body.dataFromFrameworkDropdown==="Cuccumber"){
  console.log("cucucmmber")
createDbs(files[m].contentType,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID)
       var wait=parseInt(m*20);
// setTimeout(function() {
        res.json("Imported Succesffully")


 // },wait)

}
else if(req.body.dataFromFrameworkDropdown==="TestNg"){

  console.log("testng")
  testNgDbCreation(files[m].contentType,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID)
}
else if(req.body.dataFromFrameworkDropdown==="Cypress"){

  console.log("cypress")
 cypressDbCreation(files[m].contentType,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID)
}

              });

}

   
              //console.log(m+" exectutr loop "+"   "+files[m].filename) 
                        trialcall1(m)
                    }
                }  
                trialcall1(0)
             
      
      
            })
        // },10000)
    
            // resolve(fileInfo);
            
       // });
          // }//)
        // })//gfs
       // }) 
      
          }
    //  console.log("iam project"+ projectName[0]);
    trialCall();

}   
else{
res.json([]);
}
    
});





// const searchFilehound = require('filehound');
//     searchFilehound.create()
//   //.match('integration')
//   .paths("./uploads"+"/"+"wwpressTests"+"/endToEndTests/cypress/integration")
//    .find((err, htmlFiles) => {
// //console.log("cyyyyyyyyyyyyyyy")
// //console.log(htmlFiles)
//   htmlFiles.forEach(function(file) {
//  var cypressFilesLength=file.length

//  //console.log(cypressFilesLength+"elllllllleeengthhhhh")
// //           let data_Array = file.split("\\");

// //       let mName = file.split("\\",(data_Array.length-1)).pop()
// // console.log(mName)
   
//   var LineReader = require('line-by-line');
//  lR = new LineReader(file)
 
//     lR.on('error', function (err) {
//     console.log("eeeeeeee")  
//     });
    
//     lR.on('line', function (line) {
      
         
//         if(line.includes(" it('") === true){
//         var scriptLinePath=line.split(",")
// var onlyScriptPath=scriptLinePath[0].split("it(")
// var finalCypressScript=onlyScriptPath[1].replace("'","").replace("'","")
    



// }
// })

// })
// })



var cypressArrayFilesCheck=[]

var  cypressDbCreation= function(cypressProjectName,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID){
//console.log("1111111")
 pCount++
 pID=proID+pCount

db.projectSelection.insert({"projectSelection":cypressProjectName,"projectId":pID,"framework":"Cypress"})
//console.log("call ssssssss")

var cypressModuleName=[]
//var cypressArrayFilesCheck=[]
const searchFilehound = require('filehound');
    searchFilehound.create()
  //.match('integration')
  .paths("./uploads"+"/"+cypressProjectName+"/endToEndTests/cypress/integration")
   .find((err, htmlFiles) => {
//console.log("cyyyyyyyyyyyyyyy")
//console.log(htmlFiles)
  htmlFiles.forEach(function(file) {
 //var cypressFilesLength=file.length

 //console.log(cypressFilesLength+"elllllllleeengthhhhh")
//           let data_Array = file.split("\\");

//       let mName = file.split("\\",(data_Array.length-1)).pop()
// console.log(mName)
   
  var LineReader = require('line-by-line');
 lR = new LineReader(file)
 
    lR.on('error', function (err) {
    console.log("eeeeeeee")  
    });
    
    lR.on('line', function (line) {
      
         
        if(line.includes(" it('") === true){
    
       
      if(cypressArrayFilesCheck.includes(file)===false){

     
        cypressArrayFilesCheck.push(file)
   path.basename(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1])
   // console.log(path.basename(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1])) 
      var cypressModule=path.dirname(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1]).split('\\').pop()
   

       if(cypressModuleName.includes(cypressModule)===false){
        //console.log("33333333")
         mCount++
  mId=smId+mCount
  db.moduleName.insert({"moduleName":cypressModule,"moduleId":mId,"projectId":pID})
cypressModuleName.push(path.dirname(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1]).split('\\').pop())
  //console.log(testNgModuleName) 
       }
       else{

mId=smId+mCount
}
        //console.log( path.basename(arrayFilesCheck[arrayFilesCheck.length-1],'.java'))
       fCount++
    fID=sfID+fCount
db.featureName.insert({"featureName":path.basename(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1],'.js'),"featureId":fID,"moduleId":mId,"projectId":pID})

cypressScriptsCreation(cypressArrayFilesCheck[cypressArrayFilesCheck.length-1],fID,mId,pID,ssID,sCount)
         

         }

      }
   


   })

  })

})


}//end of testng functio

var cypressLength=1;
var cypressScriptsCreation=function(scriptPath,fID,mId,pID,ssID,sCount){

 var scriptPath=__dirname+"/"+scriptPath
 console.log(scriptPath)
//console.log("000000000000000000000000")
   var scriptLineInc=0
  var Line = require('line-by-line');
 lScript = new Line(scriptPath)
 
   lScript .on('error', function (err) {
    console.log("eeeeeeee")  
    });
    
    lScript.on('line', function (line) {
      //console.log(sCount+"rrrrrrr")
       
         
        if(line.includes(" it('") == true){
         // console.log("wswwwwwwwww")
          
          scriptCount++ 
           //console.log(sCount+"wswwwwwwwww")

  sID=ssID+scriptCount


    var scriptLinePath=line.split(",")
var onlyScriptPath=scriptLinePath[0].split("it(")
var finalCypressScript=onlyScriptPath[1].replace("'","").replace("'","")
    db.testScript.insert({"scriptName":finalCypressScript,"featureId":fID,"moduleId":mId,"scriptId":sID,"lineNum":scriptLineInc,"projectId":pID})
//.log(res[2])


}
else{
   scriptLineInc++
}
})

   lScript.on('end', function () {
      
    //console.log(cypressLength+"jjjjjjj")
    //console.log(cypressArrayFilesCheck.length+"hhhhuuu")
        if(cypressLength===cypressArrayFilesCheck.length){
          console.log("eendddddd2222222222222222222222")
          cypressLength=0;
          // filesLength=0;
          cypressArrayFilesCheck=[]
    
            var fFCount=fID.split("fID")
            var finalfCount=parseInt(fFCount[1])
          
           //console.log("uuuuuu"+fCount) 
            var fMCount=mId.split("mID")
             var finalmCount=parseInt(fMCount[1])
            var fPCount=pID.split("pID")
             var finalpCount=parseInt(fPCount[1])
             //console.log(sID)
            var fSCount=sID.split("sID")
             var finalsCount=parseInt(fSCount[1])
 
// setTimeout(function() {
      db.countInc.update({"projectID":"pID"},{$set:{ "fCount":finalfCount,"sCount":finalsCount,
    "pCount":finalpCount,"mCount":finalmCount}})
    // },10000)
    //console.log("  end end  Scenario  true "+finalfCount+"L"+finalsCount+"L"+finalpCount+"L"+finalmCount)      
   }
cypressLength++

  
    });




 }








var arrayFilesCheck=[]
var  testNgDbCreation= function(testNgProjectName,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID){
//console.log("1111111")
 pCount++
 pID=proID+pCount

db.projectSelection.insert({"projectSelection":testNgProjectName,"projectId":pID,"framework":"TestNg"})
//console.log("call ssssssss")

var testNgModuleName=[]
const searchFilehound = require('filehound');
    

searchFilehound.create()
  .paths("./uploads"+"/"+testNgProjectName)
  .find((err, htmlFiles) => {

   htmlFiles.forEach(function(file) {
 var testFilesLength=file.length
//           let data_Array = file.split("\\");
//           //console.log(data_Array)
//       let mName = file.split("\\",(data_Array.length-1)).pop()
// console.log(mName)
   
  var LineReader = require('line-by-line');
 lR = new LineReader(file)
 
    lR.on('error', function (err) {
    console.log("eeeeeeee")  
    });
    
    lR.on('line', function (line) {
      //console.log(line.length+"Opqqqqq")
        //console.log(" line line rr rr rr ")
        //console.log(count +" "+line)
       
         
        if(line.includes("@Test") == true){
        
       
      if(arrayFilesCheck.includes(file)===false){
console.log("ttttttttttt222222")
     
        arrayFilesCheck.push(file)
//console.log(arrayFilesCheck)
// console.log(path.dirname(arrayFilesCheck[arrayFilesCheck.length-1]))
//testNgScriptsCreation(arrayFilesCheck[arrayFilesCheck.length-1],fID,mId,pID,ssID,sCount)
        path.basename(arrayFilesCheck[arrayFilesCheck.length-1])
    console.log(path.basename(arrayFilesCheck[arrayFilesCheck.length-1])) 
      var testModule=path.dirname(arrayFilesCheck[arrayFilesCheck.length-1]).split('\\').pop()
   

       if(testNgModuleName.includes(testModule)===false){
        //console.log("33333333")
         mCount++
  mId=smId+mCount
  db.moduleName.insert({"moduleName":testModule,"moduleId":mId,"projectId":pID})
testNgModuleName.push(path.dirname(arrayFilesCheck[arrayFilesCheck.length-1]).split('\\').pop())
  //console.log(testNgModuleName) 
       }
       else{

mId=smId+mCount
}
        //console.log( path.basename(arrayFilesCheck[arrayFilesCheck.length-1],'.java'))
       fCount++
    fID=sfID+fCount
       db.featureName.insert({"featureName":path.basename(arrayFilesCheck[arrayFilesCheck.length-1],'.java'),"featureId":fID,"moduleId":mId,"projectId":pID})
       
// setTimeout(function() {
     
//console.log("ee11111")

testNgScriptsCreation(arrayFilesCheck[arrayFilesCheck.length-1],fID,mId,pID,ssID,sCount,testFilesLength)
 // },3000)
         

         }
      // console.log("ee22222")  
//console.log(path.basename(arrayFilesCheck[arrayFilesCheck.length-1]),testNgModuleName)
  
      //console.log(line+"yyyyyyyyyyyyyyuuuuuuuuuuuu")
      }
   


   })

  })
 })

}//end of testng function
 

///////////////
// const searchFilehound = require('filehound');
    

// searchFilehound.create()
//   .paths("./uploads"+"/"+"Tests")
//   .find((err, htmlFiles) => {

//    htmlFiles.forEach(function(file) {
 

//   var LineReader = require('line-by-line');
//  lR = new LineReader(file)
 
//     lR.on('error', function (err) {
//     console.log("eeeeeeee")  
//     });
    
//     lR.on('line', function (line) {

// //console.log("eeeeee")


// if(line.includes("public void") == true){

// console.log(line)

//   }

 

// })
// })
//  })
//////////////////////
//var cypressLength=1;
var everyTestNgLength=1;
var scriptCount=null
 db.countInc.find({},function(err,doc){
  
        scriptCount =doc[0].sCount
       })







 var testNgScriptsCreation=function(scriptPath,fID,mId,pID,ssID,sCount,testFilesLength){

 var scriptPath=__dirname+"/"+scriptPath
 console.log(scriptPath)
//console.log("000000000000000000000000")
   var scriptLineInc=0
  var Line = require('line-by-line');
 lScript = new Line(scriptPath)
 
   lScript .on('error', function (err) {
    console.log("eeeeeeee")  
    });
    
    lScript.on('line', function (line) {
      //console.log(sCount+"rrrrrrr")
       
         
        if(line.includes("public void") == true){
         // console.log("wswwwwwwwww")
          
          scriptCount++ 
           //console.log(sCount+"wswwwwwwwww")

  sID=ssID+scriptCount


     // tett++

console.log(scriptCount+"tessseettttttttttttttttttttt")





        var res = line.split(" ",3);

var fRes=res[2].split("()")

    console.log(fRes[0]) 
         scriptLineInc++
    db.testScript.insert({"scriptName":fRes[0],"featureId":fID,"moduleId":mId,"scriptId":sID,"lineNum":scriptLineInc,"projectId":pID})
//.log(res[2])


}
else{
   scriptLineInc++
}
})

   lScript.on('end', function () {
      //console.log("eendddddd2222222222222222222222")
      console.log("lastScript"+arrayFilesCheck.length)
      // console.log(everyTestNgLength)
      // console.log(testFilesLength)
      //console.log("33333333333333333"+forUpdate)
        if(everyTestNgLength===arrayFilesCheck.length){
          everyTestNgLength=0;
          // filesLength=0;
          arrayFilesCheck=[]
       // console.log("uuuuuuuuuuuuuuuu"+fID) 
      //fID,mId,pID
// db.testScript.find({}).sort({_id:-1},function(err,doc){
//     //console.log(doc[0])
//   var uSCount=doc[0].scriptId
            var fFCount=fID.split("fID")
            var finalfCount=parseInt(fFCount[1])
          
           //console.log("uuuuuu"+fCount) 
            var fMCount=mId.split("mID")
             var finalmCount=parseInt(fMCount[1])
            var fPCount=pID.split("pID")
             var finalpCount=parseInt(fPCount[1])
             //console.log(sID)
            var fSCount=sID.split("sID")
             var finalsCount=parseInt(fSCount[1])
 
// setTimeout(function() {
      db.countInc.update({"projectID":"pID"},{$set:{ "fCount":finalfCount,"sCount":finalsCount,
    "pCount":finalpCount,"mCount":finalmCount}})
    // },10000)
    console.log("  end end  Scenario  true "+finalfCount+"L"+finalsCount+"L"+finalpCount+"L"+finalmCount)      
   }
everyTestNgLength++

      //console.log("  end end  Scenario  true ") 
        // All lines are read, file is closed now.
    });




 }
   
 

app.get('/searchDir:sD',function(req,res){
  //console.log("sdddddddDir")
var sDir=req.params.sD;
//console.log(sDir)
var searchPath=__dirname+"/uploads/"+sDir
if(!fs.existsSync(searchPath)){
  res.json("Please Wait Files Are Synchronizing")

}


})
app.get('/createFolder:data',function(req,res){
   //console.log("uiiiiiiiiiiiiiii"+req.params.data)
var projectName=req.params.data;
  var projectPath=__dirname+"/uploads/"+projectName
var onlyOnce=1
if(  onlyOnce===1 && !fs.existsSync(projectPath) ){
    onlyOnce++
    var trialCall = function() {
        //console.log("aaaaaaaaaaaaaaauiiiiiiiiiiiiiii")
          // var  lengthCount =2910;
          gfs.files.find({contentType:projectName}).toArray(function (err, files) {
      
        
             let lengthCheck = files.length -1 ; 
             var totalfiles=files.length
       
             let i = 0;
          
                let m =0;
              var  trialcall1 =  function(m){
                    if(m=== lengthCheck){
                  
                    }else{
                 
                    
                        //console.log("juuuuuuuuueee")
                        shell.mkdir('-p',"./"+files[m].metadata)
                      
      
             const stream = gfs.createReadStream(files[m].filename);
      
          var seam = fs.createWriteStream(__dirname+"/"+files[m].metadata+"/"+files[m].filename);
      
      
              stream.pipe(seam);
             m++;
if(m==lengthCheck){
             seam.on('finish', function(){
                //console.log("ffffffffffffffff")
                 res.json("Synchronized Done");
              });
        }
            
              console.log(m+" no loop "+"   "+totalfiles) 
        
              //console.log(m+" exectutr loop "+"   "+files[m].filename) 
                        trialcall1(m)

                    }
                }  
                trialcall1(0)
             
      
      
            })
    
            // resolve(fileInfo);
            
       // });
          // }//)
        // })//gfs
       // }) 
      
          }
    //  console.log("iam project"+ projectName[0]);
    trialCall();

}    
// else{

//  res.json("Already Folder Exits");
//  }
 //res.json("Please Wait File Is Synchronizing");

 })
  
 
// creating file names and module and projects
var check=[]
var mId=null;
 var fID=null;
 
var createDbs = function(folderName,proID,pCount,mCount,fCount,sCount, smId, sfID, ssID) {
// 
//console.log("1111111111111111")
//  setTimeout(function() {
//   db.countInc.find({},function(err,doc){
//     proID=doc[0].projectID
//    pCount=doc[0].pCount
//      mCount=doc[0].mCount
//        fCount=doc[0].fCount
//          sCount=doc[0].sCount
//    smId=doc[0].moduleID
//       sfID=doc[0].featureID
//         ssID=doc[0].scriptID

// //console.log(pID+"uiiiii")
   
//    })

// },6000)

 //console.log(ssID+"aa"+sfID+"aa"+ smId+"aa"+sCount+"aa"+fCount+"aa"+mCount+"aa"+pCount+"aa"+proID)
    moduleCount = 1;
    const Filehound = require('filehound');
    

Filehound.create()
  .ext('feature')
 // .match('*a*')
  .paths("./uploads"+"/"+folderName)
  .find((err, htmlFiles) => {
    //console.log("htmlFilessssssssssssssss")
     var filesLength=htmlFiles.length
    // console.log(htmlFiles.length)
    // console.log(htmlFiles[0].length)
      let start = 1;
    if (err) return console.error("handle err", err);
 //var cc=0;
 var incFileID=0;


  // setTimeout(function() {
 pCount++
 pID=proID+pCount

     
  
  //console.log(pID+"qwweerrrrrrrrrrrr")
//console.log(pID)

    db.projectSelection.insert({"projectSelection":folderName,"projectId":pID,"framework":"Cuccumber"})
// },3000)
     //passingID(pID)
 // });


        
// setTimeout(function() {
    htmlFiles.forEach(function(file) {
      let data_Array = file.split("\\");
     let mName = file.split("\\",(data_Array.length-1)).pop()
      fCount++
    fID=sfID+fCount
if(check.includes(mName)===false){
 

  mCount++
  mId=smId+mCount
  db.moduleName.insert({"moduleName":mName,"moduleId":mId,"projectId":pID})
check.push(mName)

}
else{

mId=smId+mCount
}



 

       createModuleAndFeature(file,data_Array,pID,filesLength,sCount,ssID,mId,fID);
   


   });

 // },6000)

 
  });
}//createDbs ()



let createModuleAndFeature = function(data,data_Array,pID,filesLength,sCount,ssID,mId,fID){

    let featureNames = data.split("\\",(data_Array.length)).pop() ;
    let featureNameWitoutExt = featureNames.replace(".feature", "");
    db.featureName.insert({"featureName":featureNameWitoutExt,"featureId":fID,"moduleId":mId,"projectId":pID})
 

    createTestScript( data,featureNameWitoutExt,fID,mId,pID,filesLength,ssID,sCount)


}


  var forUpdate=1;
  var sID=null;
let createTestScript = function(file,featureName,fID,mId,pID,filesLength,ssID,sCount){

    let count =1;
  
  
    var LineByLineReader = require('line-by-line');
 lr = new LineByLineReader(file)
 
    lr.on('error', function (err) {
      
    });
    
    lr.on('line', function (line) {
      //console.log(line.length+"Opqqqqq")
        //console.log(" line line rr rr rr ")
        //console.log(count +" "+line)
        if(line.includes("Scenario") == true){
          //console.log(sCount+"uuu"+ssID)
sCount++
 sID=ssID+sCount
          //console.log("oooooooooooooooooooooooooooooooooooooo")
            var res = line.substr(line.indexOf(":")+1);
            //var scId=res+count
            db.testScript.insert({"scriptName":res,"featureId":fID,"moduleId":mId,"scriptId":sID,"lineNum":count,"projectId":pID})
  
         // console.log(count+"   Scenario  true ")
          count++;
    
        }else{
            count++;
          //  console.log(" false  ")    
        }
        
        // 'line' contains the current line without the trailing newline character.
    });
    
    lr.on('end', function () {
      //console.log("2222222222222222222222"+filesLength)
      //console.log("33333333333333333"+forUpdate)
        if(forUpdate===filesLength){
          forUpdate=0;
          // filesLength=0;
          check=[]
       // console.log("uuuuuuuuuuuuuuuu"+fID) 
      //fID,mId,pID
// db.testScript.find({}).sort({_id:-1},function(err,doc){
//     //console.log(doc[0])
//   var uSCount=doc[0].scriptId
            var fFCount=fID.split("fID")
            var finalfCount=parseInt(fFCount[1])
          
           //console.log("uuuuuu"+fCount) 
            var fMCount=mId.split("mID")
             var finalmCount=parseInt(fMCount[1])
            var fPCount=pID.split("pID")
             var finalpCount=parseInt(fPCount[1])
             //console.log(sID)
            var fSCount=sID.split("sID")
             var finalsCount=parseInt(fSCount[1])
 
// setTimeout(function() {
      db.countInc.update({"projectID":"pID"},{$set:{ "fCount":finalfCount,"sCount":finalsCount,
    "pCount":finalpCount,"mCount":finalmCount}})
    // },10000)
    console.log("  end end  Scenario  true "+finalfCount+"L"+finalsCount+"L"+finalpCount+"L"+finalmCount)      
   }
forUpdate++

      //console.log("  end end  Scenario  true ") 
        // All lines are read, file is closed now.
    });
}


app.get('/selectionProject',function(req,res){
  db.projectSelection.find({},function(err,doc){
  res.json(doc);
  console.log(doc) ;
  })
  })
  
  app.post('/postDevicesName',function(req,res)
  {
  db.mobileApps.insert(req.body,function(err,doc)
  {
  res.json(doc);
  console.log(doc)
  });
  
  
  })
  
  app.get('/getModuleName',function(req,res){ 
  console.log("moduleeeeeee")
  db.moduleName.find({},function(err,doc){ 
  res.json(doc);
  console.log(doc)
  })
  // db.moduleName.find({}).sort({_id:-1}).limit(1,function(err,doc)
  // {
  // res.json(doc);
  // //console.log(doc);
  // })
  })
  
  
  app.get('/getModuleNames:p',function(req,res){
  console.log("getttttttttttttttttt");
  var data = req.params.p;
  
  console.log(data);
  
  db.projectSelection.find({"projectSelection":data},function(err,doc){
  console.log(doc)
  //console.log(doc[0].projectId)
  db.moduleName.find({"projectId":doc[0].projectId},function(err,doc){ 
  res.json(doc);
  // console.log(doc)
  })
  
  //res.json(doc);
  
  })
  
  
  
  
  
  // db.moduleName.find({},function(err,doc){ 
  // res.json(doc);
  // console.log(doc)
  // })
  // db.moduleName.find({}).sort({_id:-1}).limit(1,function(err,doc)
  // {
  // res.json(doc);
  // //console.log(doc);
  // })
  })
  
  // app.get('/projectIds:p',function(req,res){
  // console.log("pppppppppppprrrrrrrrrrrrrrooooooooooo");
  // var data = req.params.p;
  // console.log(data+"kkkkk");
  
  // db.projectSelection.find({"projectSelection":data},function(err,doc){
  
  // //console.log(doc[0].projectId)
  // db.moduleName.find({"projectId":doc[0].projectId},function(err,doc){ 
  // res.json(doc);
  // console.log(doc)
  // })
  
  // //res.json(doc);
  
  // })
  
  // })
  
  
  // db.projectSelection.find({"projectSelection":"Projectjava"},function(err,doc){
  
  // //console.log(doc[0].projectId)
  // db.moduleName.find({"projectId":doc[0].projectId},function(err,doc){ 
  // //res.json(doc);
  // console.log(doc)
  // })
  
  // //res.json(doc);
  
  // })
  
  
  
  
  
  app.get('/getTestScriptDetails:ss1',function(req,res)
  {
  console.log("jjjjjjjjjjjjjrrrrrrrrrrrrrrrrrr") 
  var data = req.params.ss1;
  //console.log(data)
  var data_Array = data.split(",");
  //var projectId = data_Array[0];
  //projectId= parseInt(projectId)
  
  var moduleId = data_Array[0];
  //moduleId= parseInt(moduleId)
  
  var featureId = data_Array[1]; 
  //featureId= parseInt(featureId)
  
  var projectSelection = data_Array[2]; 
  
  //console.log(typeof(projectId)+projectId);
  console.log(typeof(moduleId)+moduleId);
  console.log(typeof(featureId)+featureId);
  console.log(typeof(projectSelection)+projectSelection);
  
  
  // db.testScript.find({"projectId":projectId,"moduleId":moduleId,"featureId":featureId},function(err,doc){
  // res.json(doc);
  //console.log(doc);
  
  
  // var searchCall = function(){
  // console.log(" search call")
  // db.projectSelection.find({"projectId":Number(projectId)},function(err,projectDetails){
  // console.log(projectDetails);
  // db.moduleName.find({"projectId":Number(projectId),"moduleId":Number(moduleId)},function(err,moduleDetails){
  // console.log(moduleDetails);
  
  // db.featureName.find({"featureId":Number(featureId),"projectId":Number(projectId),"moduleId":Number(moduleId)},function(err,featureDetails){
  // console.log(featureDetails);
  // console.log(projectDetails[0].projectSelection,moduleDetails[0].moduleName,featureDetails[0].featureName)
  // // checkxml(projectDetails[0].projectSelection,featureDetails[0].featureName,lineNum,moduleDetails[0].moduleName) 
  // })
  // })
  
  // })
  var count = 0;
  db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
  db.moduleName.find({"moduleId":moduleId},function(err,moduleDetails){
  db.featureName.find({"featureId":featureId,"moduleId":moduleId},function(err,featureDetails){
  // 
  
  db.testScript.find({"moduleId":moduleId,"featureId":featureId},function(err,testScriptDetails)
  {
    
    console.log(testScriptDetails)
  // res.json(doc);
  //console.log(moduleDetails);
  var newArray = [];
  // for(j = 0 ;j<moduleDetails.length;j++){
  
  // for(l = 0 ;l<featureDetails.length;l++){
  // console.log(doc[i].moduleId === module[j].moduleId );
  // for(i = 0 ;i<testScriptDetails.length;i++){
  testScriptDetails.forEach(function(testScriptDetail) {
  //console.log(testScriptDetail);
  
  // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
  // console.log(module[j].moduleName);
  obj = {}
  obj['moduleName']= moduleDetails[0].moduleName;
  obj['featureName']= featureDetails[0].featureName;
  obj['lineNum']= testScriptDetail.lineNum;
  obj['scriptName']=testScriptDetail.scriptName;
  obj['projectSelection']=projectDetails[0].projectSelection;
  //obj['scriptId']=testScriptDetail.scriptId;
  //obj['projectSelection']=projectDetails[0].projectSelection;
  newArray.push(obj)
  //console.log(newArray)
  count++;
  if(count === ( testScriptDetails.length - 1)){
  console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
  res.json(newArray);
  }
  // }
  
  }); 
  
  // }
  // } 
  // }
  
  }) 
  })
  })
  })
  // }
  // searchCall()
  
  })
  //})
//<<<<<<< HEAD
  var featureDuplicate=[]
  app.post('/testScript',function(req,res)
  {
  
  console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
  checkxml(req.body)
  
  // dbsNames (moduleName,featureName,lineNum,projectSelection)
  })
  
  
  
 // var checkxml = function(projectFolder,featureName,lineNum,moduleName){
  var checkxml = function(data){ 
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  console.log(data);
  console.log(data[0].projectSelection)
  const Filehound = require('filehound');
  Filehound.create()
  .ext('xml')
  //.match(b)
  .paths( "./uploads/"+data[0].projectSelection)
  .find((err, htmlFiles) => {
  
  htmlFiles.forEach(function(file) {
  
  var LineByLineReader = require('line-by-line');
  lr = new LineByLineReader(file)
  //console.log(lr)
  lr.on('error', function (err) 
  {
  // 'err' contains error object
  //console.log(" error rr rr rr ")
  });
  
  lr.on('line', function (line) 
  {
  //console.log(line)
  
  
  if((line.includes("<exclude>") === true) && (line.includes("</exclude>") === true) && (line.includes(".java") === true))
  { 
  var res = (line.replace("<exclude>",'').replace("</exclude>",'')); 
  
  let pomFilePath = ( file.split("").reverse().join("")).substring(file.indexOf("\\")+1).split("").reverse().join("");
  
  Filehound.create()
  .ext('java')
  .match(res)
  .paths( "./uploads/"+data[0].projectSelection)
  .find((err, htmlFiles1) =>
  {
  // testRunnerCall(htmlFiles1[0].split("\\").pop() ,projectFolder,pomFilePath,featureName,lineNum,moduleName)
  
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
  testRunnerCall(htmlFiles1[0].split("\\").pop() ,data[0].projectSelection,pomFilePath,data)
   //console.log(htmlFiles1[0]);
  // console.log(data)
  
  }) 
  }
  });
  
  lr.on('end', function () {
  // console.log(" end end Scenario true ")
  // All lines are read, file is closed now.
  });
  
  })
  })
 // } // checkxml
  }
  
 // var testRunnerCall = function(runnerName,path,pomFilePath,featureName,lineNum,moduleName){
  
  //var testRunnerCall = function(runnerName,ps,pomFilePath,mn,fn,ln){ 
    var final = [];
    var arr = [];
    var testRunnerCall = function(runnerName,ps,pomFilePath,data){ 
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log(data)
  var lineString = ''; 
  for(var i=0;i<data.length;i++){
    for(var j=0;j<data[i].featureName.length;j++){
      for(var k=0;k<data[i].featureName[j].scriptName.length;k++){
    //    console.log(data[i].featureName[j].scriptName[k].lineNum)
        var ln = data[i].featureName[j].scriptName[k].lineNum;
      console.log(k+"pppppppppppppppppppppppppppppppppp")
      if(k===0){
        var lineString1 = "\""+data[i].moduleName+"/"+data[i].featureName[j].featureName+".feature:"+data[i].featureName[j].scriptName[k].lineNum;
        lineString = lineString.concat(lineString1)
        var addString = lineString;
      }
      else{
        var qq="ww"
        var lineString2 = ":"+data[i].featureName[j].scriptName[1].lineNum;
      //  console.log(lineString2)
      lineString = lineString.concat(lineString2)
      var addString = lineString;
      }


      }
    }
  }
 

  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
   console.log(addString);
  // var abc=data.lineNum;
  // console.log(abc)
  //}
  const Filehound = require('filehound');
  Filehound.create()
  .ext('java')
  .match(runnerName) // .match('*TestRunnerNew.java*')
  .paths("./uploads/"+ps)
  
  .find((err, htmlFiles) => {
  
  if (err) return console.error("handle err", err);
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
  
  var fs = require('fs');
  
  
  var testPath = "./"+htmlFiles; 
  //console.log(testPath+"testpathhhhhh");
  
  var data = fs.readFileSync(testPath).toString().split("\n");
  //console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
 // console.log(data)
  // console.log(htmlFiles)
 
  for(i=0;i<data.length;i++){
  if( data[i].includes("@CucumberOptions")=== true) {
  // for(l = 0 ;l<=data.length;l++){
  // var lineString = "\""+moduleName+"/"+featureName[l]+".feature:4"+"\"";
  // }
console.log(addString)
  // var lineString = "\""+sampleData[0].moduleName+"/"+sampleData[0].featureName+".feature:"+sampleData[0].lineNum+"\"";
   if(qq==undefined){
   data[i] = "@CucumberOptions(features="+"{"+addString+"\""+"},";
  }
 else{
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
  data[i] = "@CucumberOptions(features="+"{"+addString+"\"" +","+"},";
  }
  // console.log(true);
  }
  }


  data = data.join("\n");
  
  fs.writeFile(testPath,data,function(err)
  {
  if (err) return console.log(err);
  // console.log(text);
  console.log("Replaced");
  
 execTestRunner( path,pomFilePath)
  }) 
  
  })
 // }//
  }
  var execTestRunner = function( projectName,pomFilePath){
    console.log("oooooooooooooooooooooooooooooooooooooo")
    console.log(pomFilePath)
  // var pomFilePath = "uploads\\projectjava12\\Sample1";
  const Filehound = require('filehound');
  console.log(" i am ready for executoooooo projectName "+projectName)
  console.log(__dirname)
  
  var fs = require('fs'); 
  var requiredPath = __dirname+"\\trial.bat"; 
  console.log(requiredPath)
  
  // var requiredPath = "/"+projectName;
  // var requiredPath = _dirname+"\\uploads"+"\\"+projectName+"\\trial.bat"; 
  
  var stream = fs.createWriteStream(requiredPath);
  
  stream.write("@echo off\n");
  stream.write("cd .\\"+pomFilePath+" && mvn clean install");  
  console.log(pomFilePath + " fini pomFilePath ")
  
 // finalExecution( requiredPath) 
  
  } 
  
  
//   var finalExecution = function( requiredPath){
//   console.log(__dirname)
//   console.log(" final executryeriuyteriu req "+requiredPath)
//=======
  
//  app.post('/testScript',function(req,res)
// {

// console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
// //console.log(req.body)
// // for(var i=0;i<1;i++){
// // // i is module length
// // //console.log(req.body[i].moduleName)
// // //console.log(req.body[i].projectSelection)
// // for(var j=0;j<=req.body[i].featureName.length-1;j++){
// // // j is feature length
// // //console.log(req.body[i].featureName[j].featureName)
// // for(var k=0;k<=req.body[i].featureName[j].scriptName.length-1;k++){
// // // j is feature length
// // //console.log(req.body)
//  checkxml(req.body) 
// // }
// // }



// // }



// // dbsNames (moduleName,featureName,lineNum,projectSelection)
// })



// // var checkxml = function(projectFolder,featureName,lineNum,moduleName){
// var checkxml = function(wholeData){ 
// console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
// var ps=wholeData[0].projectSelection
// const Filehound = require('filehound');
// Filehound.create()
// .ext('xml')
// //.match(b)
// .paths( "./uploads/"+ps)
// .find((err, htmlFiles) => {

// htmlFiles.forEach(function(file) {

// var LineByLineReader = require('line-by-line');
// lr = new LineByLineReader(file)
// //console.log(lr)
// lr.on('error', function (err) 
// {
// // 'err' contains error object
// //console.log(" error rr rr rr ")
// });

// lr.on('line', function (line) 
// {
// //console.log(line)
// //console.log(line)

// if(line.includes("<suiteXmlFile>") === true)
// { 
//   //console.log(line)
// var res = (line.replace("<suiteXmlFile>",'').replace("</suiteXmlFile>",'')); 
// //console.log(res)
// let pomFilePath = ( file.split("").reverse().join("")).substring(file.indexOf("\\")+1).split("").reverse().join("");
// //console.log(pomFilePath)
// //console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
// Filehound.create()
// .ext('xml')
// .match(res)
// .paths( "./uploads/"+ps)
// .find((err, htmlFiles1) =>
// {
// // testRunnerCall(htmlFiles1[0].split("\\").pop() ,projectFolder,pomFilePath,featureName,lineNum,moduleName)
// // console.log(htmlFiles1)
// // console.log(htmlFiles1[0])
// console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
 
// console.log(wholeData)
// testRunnerCall(htmlFiles1[0].split("\\").pop() ,ps,pomFilePath,wholeData)


// }) 
// }
// });

// lr.on('end', function () {
// // console.log(" end end Scenario true ")
// // All lines are read, file is closed now.
// });

// })
// })
// // } // checkxml
// }

// // var testRunnerCall = function(runnerName,path,pomFilePath,featureName,lineNum,moduleName){

// var testRunnerCall = function(runnerName,ps,pomFilePath,wholeData){ 
// console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
// console.log(wholeData);
// //console.log(sn); 
// //var sampleData = data;
// //var lineString = ''; 

// ///data length
// // for(k=0;k<1;k++){
// // var lineString1 = "\""+mn+"/"+fn+".feature:"+ln+"\""+",";
// // console.log(lineString1)
// // lineString = lineString.concat(lineString1)
// // console.log(lineString1)
// //console.log(runnerName)
// // console.log(lineString);
// // var abc=data[k].lineNum;
// // console.log(abc)
// //}
// const Filehound = require('filehound');
// Filehound.create()
// .ext('xml')
// .match(runnerName) // .match('*TestRunnerNew.java*')
// .paths("./uploads/"+ps)

// .find((err, htmlFiles) => {

// if (err) return console.error("handle err", err);
// console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
// console.log(wholeData);
// //console.log(data)
// // console.log(path)
// // // console.log(featureName+'.'+lineNum);

// // lineStringObj=[];
// // obj={};

// // obj['moduleName']= moduleName;
// // obj['featureName']=featureName;
// // obj['lineNum']= lineNum;
// // lineStringObj.push(obj);
// // console.log(lineStringObj);



// var fs = require('fs');


//  //console.log(htmlFiles); 
// var testPath = "./"+htmlFiles; 
// //console.log(testPath+"testpathhhhhh");

// var data = fs.readFileSync(testPath).toString().split("\n");
// //console.log(data)
//  //console.log(data.length)
// for(i=0;i<data.length;i++){
 
// if( data[i].includes("<test")=== true) {
//    console.log("oooooooooooooooo")
// // for(l = 0 ;l<=data.length;l++){
// // var lineString = "\""+moduleName+"/"+featureName[l]+".feature:4"+"\"";
// // }

// // var lineString = "\""+sampleData[0].moduleName+"/"+sampleData[0].featureName+".feature:"+sampleData[0].lineNum+"\"";
// data[i] = "<test name="+'"'+wholeData[0].featureName[0].featureName+'"'+">";
// // console.log(true);
// }
//  if((data[i].includes("methods>")=== true)){
//    console.log("uuuuuuuuuuuuuuu")
//    for(var s=0;s<2;s++){
//    console.log(wholeData[0].featureName[0].scriptName[s].scriptName)
 
//   }

//   }


// }

// data = data.join("\n");
// //var yy="jjj"
// fs.writeFile(testPath,data,function(err)
// {
// if (err) return console.log(err);
// // console.log(text);
// console.log("Replaced");

// //execTestRunner( ps,pomFilePath)
// }) 

// })
// }//
// // }
// var execTestRunner = function( projectName,pomFilePath){
// // var pomFilePath = "uploads\\projectjava12\\Sample1";
// const Filehound = require('filehound');
// console.log(" i am ready for executoooooo projectName "+projectName)
// console.log(__dirname)

// var fs = require('fs'); 
// var requiredPath = __dirname+"\\trial.bat"; 
// // var requiredPath = "/"+projectName;
// // var requiredPath = _dirname+"\\uploads"+"\\"+projectName+"\\trial.bat"; 

// var stream = fs.createWriteStream(requiredPath);

// stream.write("@echo off\n");
// stream.write("cd .\\"+pomFilePath+" && mvn clean install");
// console.log(pomFilePath + " fini pomFilePath ")
// finalExecution( requiredPath) 

// } 


// var finalExecution = function( requiredPath){
// console.log(__dirname)
// console.log(" final executryeriuyteriu req "+requiredPath)
// // var dir= "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 

// // const nodeCmd = require('node-cmd');
// //nodeCmd.run(dir, (err, data, stderr) => console.log(data));
// //__dirname+"\\uploads\\anyname\\"+"trial.bat"
// // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code02818demo\\uploads\\projectjava12\\trial.bat"
// // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 
// // require('child_process').exec 
// // //__dirname+"/trial.bat"
// require('child_process').exec(requiredPath, (err, stdout, stderr) => {
// if (err) throw err;

// console.log(stdout, stderr); 
// }); 
// }



//>>>>>>> 19cb3ccfda67744054ed9c70eca0c8b0fafcb55c

//   // var dir= "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 
  
//   // const nodeCmd = require('node-cmd');
//   //nodeCmd.run(dir, (err, data, stderr) => console.log(data));
//   //__dirname+"\\uploads\\anyname\\"+"trial.bat"
//   // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code02818demo\\uploads\\projectjava12\\trial.bat"
//   // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 
//   // require('child_process').exec 
//   // //__dirname+"/trial.bat"
//   require('child_process').exec(requiredPath, (err, stdout, stderr) => {
//   if (err) throw err;
  
//   console.log(stdout, stderr); 
//   }); 

//   finalExecution2() ;
// }

// var finalExecution2= function(){
// var fs = require('fs'); 
  
//   console.log("22222222222222222222222222222222222222222222222222222222222222")
// var requiredPath2 = "C:Users\\Getit\\Desktop\\code29918\\finalInt\\trial1.bat";
// console.log(requiredPath2)
// var pomFilePath2="uploads\\anyname\\Sample1";

// var stream = fs.createWriteStream(requiredPath2);
// stream.write("@echo off\n");
// stream.write("cd .\\"+pomFilePath2+" && cypress run");
// console.log(pomFilePath2 + "finish ")

// trailCall(requiredPath2,pomFilePath2)
// }

// var trailCall = function( requiredPath2,pomFilePath2){
//   console.log(requiredPath2)
//   console.log(" final executryeriuyteriu req "+pomFilePath2)

//   // var dir= "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 
  
//   // const nodeCmd = require('node-cmd');
//   //nodeCmd.run(dir, (err, data, stderr) => console.log(data));
//   //__dirname+"\\uploads\\anyname\\"+"trial.bat"
//   // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code02818demo\\uploads\\projectjava12\\trial.bat"
//   // "C:\\Users\\user\\Desktop\\Latest_projects\\sample_projects\\code13Aug\\uploads\\anyname\\trial.bat" ; 
//   // require('child_process').exec 
//   // //__dirname+"/trial.bat"
//   require('child_process').exec(requiredPath2, (err, stdout, stderr) => {
//   if (err) throw err;
  
//   console.log(stdout, stderr); 
//   }); 

// }
  

app.get('/loginDetails',function(req,res){

// console.log("ooooooooooooooooooo")
db.loginDetails.find({"userName":"Admin"},function(err,doc){ 
res.json(doc);
// console.log("kkkkkkkkkkkkkkk"+doc)
})
})
app.get('/selectionProject',function(req,res){


db.projectSelection.find({},function(err,doc){ 
res.json(doc);
// console.log("mm"+doc)
})
})
app.get('/importType',function(req,res){

console.log("kkkkkkkkkkkkkkkkkkkkk")
db.types.find({},function(err,doc){ 
res.json(doc);
//console.log(doc)
})
})
app.get('/importPriority',function(req,res){


db.priority.find({},function(err,doc){ 
res.json(doc);
// console.log("mm"+doc)
})
})
// app.get('/idIncrement',function(req,res){

// console.log("kkkkkkkkkkkkkkkk")
// db.dataIds.find({},function(err,doc){ 
// res.json(doc);
// console.log(doc)
// })
// })
app.get('/getModuleName',function(req,res){



db.moduleName.find({},function(err,doc){ 
res.json(doc);
// console.log(doc)
})
// db.moduleName.find({}).sort({_id:-1}).limit(1,function(err,doc)
// {
// res.json(doc);
// //console.log(doc);
// })
})
app.get('/idModule',function(req,res){




db.moduleName.find({}).sort({_id:-1}).limit(1,function(err,doc)
{
res.json(doc);
//console.log(doc);
})
})
app.get('/idFeature',function(req,res){




db.featureName.find({}).sort({_id:-1}).limit(1,function(err,doc)
{
res.json(doc);
//console.log(doc);
})
})
app.get('/featureName',function(req,res){



db.featureName.find({},function(err,doc){ 
res.json(doc);
//console.log(doc)
})
})
// app.get('/getMoId:mI',function(req,res){
// console.log("llllllllllllllllll")
// var moduleName=req.params.mI
// //moduleName1 = parseInt(moduleName1);
// //console.log(moduleName1+"llllllllllllllllll")
// db.moduleName.find({"moduleName":moduleName},function(err,doc){ 
// res.json(doc);
// console.log(doc)
// })
// })
app.get('/getMoId:mI',function(req,res){
console.log("mmmmmmmmmmmmmmmmmm")
var moduleName=req.params.mI
db.moduleName.aggregate([
{$match:{"moduleName":moduleName}},



{"$lookup":
{"from":"featureName",
"localField":"moduleId",
"foreignField":"moduleId",
"as":"unitedFM"
}
}
],function(err,doc){
res.json(doc);
//console.log(doc)
})

})
app.get('/mId:mN',function(req,res){
console.log("llllllllllllllllll")
var moduleName=req.params.mN
//moduleName1 = parseInt(moduleName1);
console.log(moduleName+"llllllllllllllllll")
db.moduleName.find({"moduleName":moduleName},function(err,doc){ 
res.json(doc);
// console.log(doc)
})
})
app.post('/postModuleName',function(req,res)
{
//var moduleName=req.params.moduleName;

//var moduleName = str_array[1];
console.log(req.body.moduleName)


db.moduleName.insert(req.body ,function(err,doc)
{
res.json(doc);

});


})
app.post('/postFeatureName',function(req,res)
{

//var moduleName=req.params.moduleName;

//var moduleName = str_array[1];
//console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

db.featureName.insert(req.body ,function(err,doc)
{
res.json(doc);
//console.log(doc)
});


})
app.post('/savingImportData',function(req,res) {
console.log("data data data data data data data data");
// var datastr=req.params.datareceipt;

// var datastr_array=datastr.split(",");
// var pname=datastr_array[0];
// // var tran=datastr_array[1];
// // var vNo=datastr_array[2];
// console.log(pname)
//console.log("oooooooooooooooooo")
//console.log(req.body)
db.importScript.insert(req.body,function(err,doc){
//console.log("5gggggggggggggggggggggggg")
res.json(doc);
//console.log(doc);
})

})
//require('./server/serverTestExecution')(app)
app.get('*',(req, res)=> {

res.sendFile(path.join(__dirname,'dist/index.html'));
});
 const port=2111;
app.listen(port,function() {
  console.log("server running on port"+port);
  // body...
});