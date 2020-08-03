import React from "react";
import { iconClassName, browserOpenFile } from "../../../renderer-react/lib/main.es.js";
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
  const createNewFile=e=>{
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;
    var obj={"rootTopicKey":"ded670e2-5635-4438-80f8-981d40e6451b","editorRootTopicKey":"ded670e2-5635-4438-80f8-981d40e6451b","focusKey":"ded670e2-5635-4438-80f8-981d40e6451b","extData":{},"topics":[{"key":"ded670e2-5635-4438-80f8-981d40e6451b","parentKey":null,"subKeys":[],"collapse":false,"style":null,"blocks":[{"type":"CONTENT","data":"New Topic"}]}],"config":{"readOnly":false,"allowUndo":true,"layoutDir":2,"theme":{"name":"default","randomColor":true,"background":"rgb(57,60,65)","highlightColor":"#50C9CE","marginH":60,"marginV":20,"contentStyle":{"lineHeight":"1.5"},"linkStyle":{"lineRadius":5,"lineType":"curve","lineWidth":"3px"},"rootTopic":{"contentStyle":{"fontSize":"34px","borderRadius":"35px","padding":"16px 18px 16px 18px"},"subLinkStyle":{"lineType":"curve","lineWidth":"3px","lineColor":"rgb(113, 203, 45)"}},"primaryTopic":{"contentStyle":{"borderWidth":"1px","borderStyle":"solid","borderRadius":"20px","fontSize":"17px","padding":"10px 15px 10px 15px"},"subLinkStyle":{"lineType":"curve","lineWidth":"3px","lineColor":"rgb(113, 203, 45)"}},"normalTopic":{"contentStyle":{"border":"1px solid #e8eaec","borderRadius":"20px","fontSize":"17px","padding":"4px 10px"},"subLinkStyle":{"lineType":"curve","lineWidth":"3px","lineColor":"white"}}}},"formatVersion":null}
    //暫時的辦法
    let model = controller.run("deserializeModel", { controller, obj});
     diagram.openNewModel(model);
  };
  return (
    <div className={`bm-toolbar-item ${iconClassName("openfile")}`}  >

      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="Create new file" onClick={createNewFile} />
          <MenuDivider/>
          <MenuItem text="Open file from desktop" onClick={onClickOpenFileFromDesktop} />
          <MenuDivider/>
          <form>
            <select  id="MenuItem1"  text="Choose file" onChange={getValue} onClick={OpenFileListOnline} >
            　<option value="Open file online" >Open file online</option>
            </select>
            <input id="map_title"></input>
          </form>
        </Menu>
      </Popover>
    </div>
  );
}
