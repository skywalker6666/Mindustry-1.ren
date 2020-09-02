import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup,Collapse, CardBody, Card } from 'reactstrap';


export function ModalExample(props) {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
    
  
    return (
        <div>
            
            <Button color="blue" onClick={toggle} >{buttonLabel}新增</Button>
            
            <Modal isOpen={modal} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Input type="textarea" placeholder="Define your own concept" rows={15} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" >Add</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


export function CollapseExample(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>FileBuffer</Button>
      <Collapse isOpen={isOpen}>
        <Card color="danger">
          <CardBody>
          content
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
