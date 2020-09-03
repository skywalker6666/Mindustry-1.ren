import React from "react";
import { Diagram } from "@blink-mind/renderer-react";
import RichTextEditorPlugin from "@blink-mind/plugin-rich-text-editor";
import { JsonSerializerPlugin } from "@blink-mind/plugin-json-serializer";
import { ThemeSelectorPlugin } from "@blink-mind/plugin-theme-selector";
import TopologyDiagramPlugin from "@blink-mind/plugin-topology-diagram";
import { TopicReferencePlugin, SearchPlugin } from "@blink-mind/plugins";
import { Toolbar } from "./toolbar/toolbar";
import { generateSimpleModel } from "../utils";
import { ModalExample,CollapseExample } from "./metadata/AddSubconcept";
import {TabExample} from "./buffer/BufferTab";
import {FileUploadExample} from "./buffer/FileUpload";
import "@blink-mind/renderer-react";
import debug from "debug";
import Cookies from 'js-cookie';
import { Collapse,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,Container } from 'reactstrap';

import { Grid, Image } from 'semantic-ui-react';
const log = debug("app");

const plugins = [
  RichTextEditorPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  TopologyDiagramPlugin(),
  JsonSerializerPlugin()
];

export class Mindmap extends React.Component {
  constructor(props) {
    super(props);
    this.initModel();
  }

  diagram;
  diagramRef = ref => {
    this.diagram = ref;
    this.setState({});
  };

  initModel() {
    const model = generateSimpleModel();
    this.state = { model };
  }

  onClickUndo = e => {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    controller.run("undo", props);
  };

  onClickRedo = e => {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    controller.run("redo", props);
  };

  renderDiagram() {
    
    return (
      <>
      <Grid>
      
        <Grid.Column width={5}>
          
        </Grid.Column>
        <Grid.Column width={10}>
        <Diagram
        ref={this.diagramRef}
        model={this.state.model}
        onChange={this.onChange}
        plugins={plugins}
        />
        </Grid.Column>
        
      </Grid>
       
      
      
      
     
      
      </>
    );
  }

  renderToolbar() {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    const canUndo = controller.run("canUndo", props);
    const canRedo = controller.run("canRedo", props);
    const toolbarProps = {
      diagram: this.diagram,
      onClickUndo: this.onClickUndo,
      onClickRedo: this.onClickRedo,
      canUndo,
      canRedo
    };
    return <Toolbar {...toolbarProps} />;
  }
  renderMetadata(){
    return <CollapseExample></CollapseExample>;
  }
  renderBuffer(){
    return <TabExample></TabExample>;
    
  }

  onChange = (model, callback) => {
    this.setState(
      {
        model
      },
      callback
    );
  };

  render() {
    return (
     
      <div className="mindmap">
        
        {this.diagram && this.renderToolbar()}
        
        
        {this.renderDiagram()}
            
          
      </div> 
      

    );
  }
}

export default Mindmap;
