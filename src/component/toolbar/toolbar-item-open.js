import React from "react";
import { iconClassName, browserOpenFile } from "@blink-mind/renderer-react";
import { loadFileNameFromFirebase } from "../../utils";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";

export function ToolbarItemOpen(props) {
  const onClickOpenFileFromDesktop = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;
    
    browserOpenFile(".mindustry,.json,.blinkmind,").then(txt => {
      let obj = JSON.parse(txt);
      let model = controller.run("deserializeModel", { controller, obj });
      diagram.openNewModel(model);
    });
  };
  const OpenFileListOnline = e => {    
    var map_name=[];
    map_name= loadFileNameFromFirebase();
    
    for(var x in map_name){
      console.log(map_name[x]);
    }
    
  };
  
  return (
    <div className={`bm-toolbar-item ${iconClassName("openfile")}`} >
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="Open file online" onClick={OpenFileListOnline}/>          
          <MenuDivider/>
          <MenuItem text="Open file from desktop" onClick={onClickOpenFileFromDesktop} />
          <MenuDivider/>
        </Menu>
      </Popover>
    </div>
  );
}
