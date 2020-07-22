import { Model, createKey } from "@blink-mind/core";
import firebase from'firebase';

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

export function exportToFirebase (title,data){   
  db.ref('/mindmap/'+title).update(data);
  //db.ref('/mindmap/AI').push(data);
};
export function loadFileNameFromFirebase(){
  var filename_object=[];
  var x;
  db.ref('/').on('value',e => {    
    for(x in e.val()){
      filename_object=Object.keys(e.val()[x]);
    }
    
  });
  return(filename_object);
}
export function generateSimpleModel() {
  const rootKey = createKey();

  return Model.create({
    rootTopicKey: rootKey,
    topics: [
      {
        key: rootKey,
        blocks: [{ type: "CONTENT", data: "Mindustry" }]
      }
    ]
  });
}
