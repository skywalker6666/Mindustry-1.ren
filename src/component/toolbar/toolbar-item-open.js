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
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps; 
    var map_name=[];
    map_name= loadFileNameFromFirebase();    
    var x = document.getElementById('MenuItem1');
    x.innerHTML = "<select data-size='5' id='MenuItem1' text='Open file online' onClick={OpenFileListOnline} ><option value='Taipei'>Open file online</option></select>";
 
  
    for(var t in map_name){
      x.innerHTML += "<option value='"+map_name[t]+"'>"+map_name[t]+"</option>";
    }
    
  };
  
  return (
    <div className={`bm-toolbar-item ${iconClassName("openfile")}`}  >

      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          
          <form>
            <select data-size="5" id="MenuItem1" text="Open file online" onClick={OpenFileListOnline} >
            　<option value="Taipei">Open file online</option>
            　
            </select>
          </form>
          <MenuDivider/>
          <MenuItem text="Open file from desktop" onClick={onClickOpenFileFromDesktop} />
          <MenuDivider/>
        </Menu>
      </Popover>
    </div>
  );
}
