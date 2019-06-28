import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';

export class Tipo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            nota: ''
        }
    }

    handleOnSubmit = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/tipo', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                descripcion: this.state.descripcion,
                nota: this.state.nota
            })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err));
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return(
            <Col xs={12} sm={12} md={{ span: 6, offset: 1 }} lg={{ span: 5, offset: 2 }} xl={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nuevo tipo</Card.Title>
                        <Form>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="Vehículo" required/>
                            </Form.Group>
                            <Form.Group controlId="nota">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} as="textarea" rows="3" placeholder='Estes es el tipo de Vehículo...'/>
                            </Form.Group>
                            <Button onClick={() => this.handleOnSubmit()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}