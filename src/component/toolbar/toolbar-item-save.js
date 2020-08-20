import cx from "classnames";
import { iconClassName, IconName } from "@blink-mind/renderer-react";
import React from "react";
import { exportToFirebase, exportSubconceptTitleToFirebase ,returnDiagramAsJSON,returnNodeNumber} from "../../utils";
import { loadFileNameFromFirebase } from "../../utils";
import {ReturnSubcontentTitle,ReturnNodeName} from "../../../node_modules/@blink-mind/renderer-react/lib/main.es"
var global_mapTitle,jsonExport;
var global_subconceptTitle;
var global_nodeNum;
export function ToolbarItemSave(props) {
  const onClickSaveJson = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;
    const title = controller.run("getTopicTitle", {
          ...diagramProps,
          topicKey: model.rootTopicKey
        });
    
    //metadata存取用
    global_mapTitle=`${title}`;
    global_subconceptTitle=ReturnSubcontentTitle();
    var nodeName=ReturnNodeName();
    global_nodeNum=returnNodeNumber(global_mapTitle,nodeName);
    
    console.log("global_subconceptTitle:"+global_subconceptTitle)

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    jsonExport = JSON.parse(jsonStr); 
    if(global_subconceptTitle==null){   
      console.log("上面");
      exportToFirebase(`${title}`,jsonExport);//匯出整張map的json，註解掉可以幫助subconcept分次增加多個成功
    }
    else{
      console.log("下面");
      exportSubconceptTitleToFirebase(global_mapTitle,global_subconceptTitle,global_nodeNum);
      const jsonExport_newset=returnDiagramAsJSON(global_mapTitle);
      exportToFirebase(`${title}`,jsonExport_newset);//匯出整張更新過metadatamap的json
    }




    

  };

  return (
    <div className={cx("bm-toolbar-item", iconClassName("save"))} onClick={onClickSaveJson}>      
    </div>
  );
}


export function getTitle(){
  return global_mapTitle;
}
export function getUpdatedSubconceptTitleCondition(){
  var title_and_nodenum=[global_mapTitle,global_nodeNum];
  return title_and_nodenum;
}
