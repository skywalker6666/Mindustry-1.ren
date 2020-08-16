import cx from "classnames";
import { iconClassName,IconName } from "@blink-mind/renderer-react";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
import { downloadFile } from "../../utils";


export function ToolbarItemExport(props) {
  const onClickExportJson = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    const jsonExport = JSON.parse(jsonStr);
    const url = `data:text/plain,${encodeURIComponent(jsonStr)}`;
    const title = controller.run("getTopicTitle", {
      ...diagramProps,
      topicKey: model.rootTopicKey
    });    
    downloadFile(url, `${title}.mindustry`);
    };
    
  return (
    <div className={cx("bm-toolbar-item" ,`${iconClassName("show-menu")}`)}>
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="JSON(.mindustry/.blinkmind/.json)" onClick={onClickExportJson} />
          <MenuDivider/>
        </Menu>
      </Popover>
    </div>
  );
}

