import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import React from "react";
import { exportToFirebase } from "../../utils";
import { loadFileNameFromFirebase } from "../../utils";

export function ToolbarItemSave(props) {
  const onClickSaveJson = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    const jsonExport = JSON.parse(jsonStr);
    // const url = `data:text/plain,${encodeURIComponent(jsonStr)}`;
    const title = controller.run("getTopicTitle", {
       ...diagramProps,
      topicKey: model.rootTopicKey
     });
    exportToFirebase(`${title}`,jsonExport);
    
  };

  return (
    <div className={cx("bm-toolbar-item", iconClassName("save"))} onClick={onClickSaveJson}>      
    </div>
  );
}

