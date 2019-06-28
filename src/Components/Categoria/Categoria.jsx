import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import '../../Pages/NewPart.css';

export class Categoria extends Component {
    constructor () {
        super();
        this.state = {
            nombre: '',
            descripcion: ''
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmitCategoria = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/categoria', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.nombre,
                descripcion: this.state.descripcion
            })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <Col xs={12} sm={12} md={8} lg={{ span: 5, offset: 2 }} xl={{ span: 5, offset: 2 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nueva Categoria</Card.Title>
                        <Form>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="Luces de niebla, luces de conducción" required/>
                            </Form.Group>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} as="textarea" rows="3" placeholder='Estes es el grupo de todo lo referente a luces...'/>
                            </Form.Group>
                            <Button onClick={() => this.onSubmitCategoria()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}