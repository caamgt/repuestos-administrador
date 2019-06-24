import React, { Component } from 'react';
import '../Components/Sidebar/Sidebar.css';
import './NewPart.css';
import { Col, Card } from 'react-bootstrap';
import { Repuesto } from '../Components/Repuesto/Repuesto';

export class NewPart extends Component {
    render() {
        return(
            <Col md={{ span: 6, offset: 2 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nuevo Producto</Card.Title>
                        <Repuesto />
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}
