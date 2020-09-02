
import React,{ useState } from 'react';
import { Collapse,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {UploadFilesToStorage} from '../../utils/index'
import {PreProcessPanel} from '../../../node_modules/@blink-mind/renderer-react/lib/main.es'


export function TabExample (props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const [isOpen, setIsOpen] = useState(false);

  const buttonToggle = () => setIsOpen(!isOpen);

  const uploadFile = () => {UploadFilesToStorage('AI');
  }
  const createNewNote=()=>{PreProcessPanel(props);
}

  return (
    <div>
    <Button color="primary" onClick={buttonToggle} style={{ marginBottom: '1rem' }}>FileBuffer</Button>
      <Collapse isOpen={isOpen}>       
        <Nav tabs horizontal size='5'>
            <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
            >
                FileBuffer
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
            >
                NoteBuffer
            </NavLink>
            </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <Col>
                
                <Button color='secondary' onClick={uploadFile}>+ File</Button>
                
                <Col sm="2">
                <Card body>
                    <CardTitle>File</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>edit file</Button>
                </Card>
                </Col>
            </Col>
            </TabPane>

            <TabPane tabId="2">
            <Col>
                <Button color='secondary' onClick={createNewNote}>+ Note</Button>

                <Col sm="2">
                <Card body>
                    <CardTitle>Notes</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>edit note</Button>
                </Card>
                </Col>
                <Col sm="2">
                <Card body>
                    <CardTitle>Notes</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>edit note</Button>
                </Card>
                </Col>
            </Col>
            </TabPane>
        </TabContent>
      </Collapse>
    </div>
  );
}