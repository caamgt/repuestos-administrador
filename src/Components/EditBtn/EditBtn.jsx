import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { ChangeName } from '../ChangeName/ChangeName';
import './EditBtn.css';

export class EditBtn extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      render() {
        return (
          <>
            <Button className='test' variant="primary" onClick={this.handleShow}>
              <div className='test1'>
              <FontAwesomeIcon icon={faEdit}/>
              </div>
            
            </Button>    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                
              </Modal.Header>
                <Modal.Body><ChangeName user={this.props.user}/></Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
}