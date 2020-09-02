import { Model, createKey } from "@blink-mind/core";
import firebase from'firebase';
import { browserOpenFile ,browserUploadFile} from "@blink-mind/renderer-react/lib/main";
import axios from "axios";
import React,{Component} from 'react'; 
export const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};

var firebaseConfig = {
  apiKey: "AIzaSyBaQ9Bm_oUOLThHeK3S2ZQebpRjHYTW_X0",
  authDomain: "test-dd34d.firebaseapp.com",
  databaseURL: "https://test-dd34d.firebaseio.com",
  projectId: "test-dd34d",
  storageBucket: "test-dd34d.appspot.com",
  messagingSenderId: "1006914451665",
  appId: "1:1006914451665:web:7b2437a3219fd59652adf0",
  measurementId: "G-BDWX6YGSC5"
};
firebase.initializeApp(firebaseConfig);  
var db=firebase.database();
// var db2=firebase.store();
// export function exportToFirestore (data){   
//   db2.collection('mindustry').doc('Alan的Mindustry').update(data);
// };
//輸出整張map的json到資料庫

export function exportToFirebase (title,data){   
  db.ref('/mindmap/'+title).update(data);
  //db.ref('/mindmap/AI').push(data);
};

export function exportSubconceptTitleToFirebase (title,data,nodeNum){  
  db.ref('/mindmap/'+title+'/topics/'+nodeNum+'/subConcepts/').update({subconceptTitle:data});
};
export function exportSubconceptContentToFirebase (title,data,nodeNum){  
  db.ref('/mindmap/'+title+'/topics/'+nodeNum+'/subConcepts/').update({subconceptContent:data});
};
export function exportSubconceptQuestionToFirebase (title,data,nodeNum){   
  db.ref('/mindmap/'+title+'/topics/'+nodeNum+'/subConcepts/').update({subconceptQuestion:data}); 
};

export function exportSubconceptAnswerToFirebase (title,data,nodeNum){ 
  db.ref('/mindmap/'+title+'/topics/'+nodeNum+'/subConcepts/').update({subconceptAnswer:data});  
};

export function loadSubconceptTitleFromFirebase (map_title,key){ 
  var subconceptTitle=null;
  db.ref('/mindmap/'+map_title+'/topics/').on('value',function(topics){
    
    for(var x in topics.val()){      
        if(topics.val()[x].key===key){
          subconceptTitle=topics.val()[x].subConcepts.subconceptTitle;
        }      
      }    
  });
  return subconceptTitle;
};
export function loadSubconceptQuestionFromFirebase (map_title,key){ 
  var subconceptQuestion=null;
  db.ref('/mindmap/'+map_title+'/topics/').on('value',function(topics){
    
    for(var x in topics.val()){      
        if(topics.val()[x].key===key){
          subconceptQuestion=topics.val()[x].subConcepts.subconceptQuestion;
        }      
      }    
  });
  return subconceptQuestion;
};
export function loadSubconceptAnswerFromFirebase (map_title,key){ 
  var subconceptAnswer=null;
  db.ref('/mindmap/'+map_title+'/topics/').on('value',function(topics){
    
    for(var x in topics.val()){      
        if(topics.val()[x].key===key){
          subconceptAnswer=topics.val()[x].subConcepts.subconceptAnswer;
        }      
      }    
  });
  return subconceptAnswer;
};
export function loadSubconceptContentFromFirebase (map_title,key){ 
  var subconceptContent=null;
  db.ref('/mindmap/'+map_title+'/topics/').on('value',function(topics){
    
    for(var x in topics.val()){      
        if(topics.val()[x].key===key){
          subconceptContent=topics.val()[x].subConcepts.subconceptContent;
        }      
      }    
  });
  return subconceptContent;
};




///
export function loadFileNameFromFirebase(){
  var filename_object=[];
  var x;
  var i=0;
  db.ref('/mindmap/').on('value',function(snapshot){    
    for(x in snapshot.val()){
      filename_object[i]=snapshot.val()[x].topics[0].blocks[0].data;
      i++;
      console.log("第一時間:"+filename_object);
    }
  });
  
  return filename_object;
}

export function returnNodeNumber(map_name,node_name){
  var i;  
  db.ref('/mindmap/'+map_name+'/topics/').on('value',function(snapshot){
    for(var x in snapshot.val()){
    //   console.log(snapshot.val());
    // console.log(snapshot.val()[x].blocks[0].data);
      if(snapshot.val()[x].blocks[0].data===node_name){
        i=x;
        console.log(i);
      }      
    }    
  });
  return(i);
}

export function returnDiagramAsJSON(map_name){
  var x;
  db.ref('/mindmap/'+map_name).on('value',function(mapJSON){
    x=mapJSON.val();    
  });
  return x;
}
//export function deleteMap(map_name){
//   var x;
//   db.ref('/mindmap/'+map_name).delete('value',function(mapJSON){
//     x=mapJSON.val();    
//   });
//   return x;
// }


export function generateSimpleModel() {
  const rootKey = createKey();

  return Model.create({
    rootTopicKey: rootKey,
    topics: [
      {
        key: rootKey,
        blocks: [{ type: "CONTENT", data: "New Topic" }]
      }
    ]
  });
}
// Points to the root reference



var filename ;
var storageRef = firebase.storage().ref('/files/');
export  function UploadFiles() {   
    const state = { 
    
      // Initially, no file is selected 
      selectedFile: null
    }; 
    var file;
    browserUploadFile(".pdf,.txt").then(event => {
      
      // const file = event.target.files[0];
          
      const task =storageRef.put(event);
      HTMLFormControlsCollection.log(event);
  });
  // const onFileUpload = () => { 
  //   // Create an object of formData 
  //   const formData = new FormData(); 
   
  //   // Update the formData object 
  //   formData.append( 
  //     "myFile", 
  //     this.state.selectedFile, 
  //     this.state.selectedFile.name 
  //   ); 
  //   file=formData;
  //  filename=this.state.selectedFile.name;
  //   // Details of the uploaded file 
  //   console.log(this.state.selectedFile); 
   
  //   // Request made to the backend api 
  //   // Send formData object 
  //   axios.post("api/uploadfile", formData); 
  // }; 
 
  // // File content to be displayed after 
  // // file upload is complete 
 
}
