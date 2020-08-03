import React from "react";
import { iconClassName, browserOpenFile } from "../../renderer-react/lib/main";
import { loadFileNameFromFirebase } from "../../utils";
import { returnDiagramAsJSON } from "../../utils";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import {generateSimpleModel} from "../../utils";
import {Mindmap} from "../mindmap";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman

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
    x.innerHTML = "<select id='MenuItem1'  text='Choose file' onChange={getValue} onClick={OpenFileListOnline} >　<option value='Open file online' >Open file online</option>";
 
  
    for(var t in map_name){
      
      x.innerHTML += "<option value='"+map_name[t]+"'id='"+map_name[t]+"'>"+map_name[t]+"</option>";
      
    }
    
  };
  const getValue= e => {
    var map_name=[],t;
    map_name= loadFileNameFromFirebase();
    for( t in map_name){
      var title=document.getElementById("MenuItem1").value;
      document.getElementById("map_title").value=title;//將檔名顯示在input box
      diagramRenderWithOnlineOpen(title);//call diagram render function to open file
    }
  };

  const diagramRenderWithOnlineOpen=map_name=>{
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;
    var obj=returnDiagramAsJSON(map_name);
    obj.NewField='formatVersion';
    obj.formatVersion="0.0";
    let model = controller.run("deserializeModel", { controller, obj});
    diagram.openNewModel(model);
  };
  return (
    <div className={`bm-toolbar-item ${iconClassName("openfile")}`}  >

      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          
          <form>
            <select  id="MenuItem1"  text="Choose file" onChange={getValue} onClick={OpenFileListOnline} >
            　<option value="Open file online" >Open file online</option>
            </select>
            <input id="map_title"></input>
          </form>
          <MenuDivider/>
          <MenuItem text="Open file from desktop" onClick={onClickOpenFileFromDesktop} />
          <MenuDivider/>
        </Menu>
      </Popover>
    </div>
  );
}
