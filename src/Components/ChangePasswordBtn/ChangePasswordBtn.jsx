import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { ChangePassword } from '../ChangePassword/ChangePassword';

export class ChangePasswordBtn extends Component {
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
        // console.log(this.props);
        return (
          <>
            <Button variant="primary" onClick={this.handleShow}>
              Cambiar
            </Button>    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                
              </Modal.Header>
              <Modal.Body><ChangePassword user={this.props}/></Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
}
