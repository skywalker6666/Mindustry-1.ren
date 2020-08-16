import cx from "classnames";
import { iconClassName, IconName } from "@blink-mind/renderer-react";
import React from "react";
import { exportToFirebase, exportSubconceptTitleToFirebase ,returnDiagramAsJSON,returnNodeNumber} from "../../utils";
import { loadFileNameFromFirebase } from "../../utils";
import {ReturnSubcontentTitle,ReturnNodeName} from "../../../node_modules/@blink-mind/renderer-react/lib/main.es"
var global_title,jsonExport;
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
    var mapTitle=`${title}`;
    var subconceptTitle=ReturnSubcontentTitle();
    var nodeName=ReturnNodeName();
    var nodeNum=returnNodeNumber(mapTitle,nodeName);
    
    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    jsonExport = JSON.parse(jsonStr);    
    // exportToFirebase(`${title}`,jsonExport);//匯出整張map的json
    exportSubconceptTitleToFirebase(mapTitle,subconceptTitle,nodeNum);
    const jsonExport_newset=returnDiagramAsJSON(mapTitle);
    exportToFirebase(`${title}`,jsonExport_newset);//匯出整張更新過metadatamap的json





    global_title=`${title}`;
  };

  return (
    <div className={cx("bm-toolbar-item", iconClassName("save"))} onClick={onClickSaveJson}>      
    </div>
  );
}


export function getTitle(){
  exportToFirebase(global_title,jsonExport);
  return global_title;
}

