import React, { Component } from 'react';
import {Form, Col, Card, Button} from 'react-bootstrap';

export class NewUser extends Component {
    constructor (props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        }
    }

    handleSubmitUser = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/user', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                email: this.state.email,
                password: this.state.password
            })
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    render() {
        return(
            <Col xs={12} sm={12} md={{ span: 6, offset: 1 }} lg={{ span: 5, offset: 2 }} xl={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
            <Card >
                <Card.Body>
                    <Card.Title className='text-center'>Registrar un nuevo usuario</Card.Title>
                    <hr />
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="Nombre" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="apellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control onChange={this.onInputChange}  type="text" placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="email">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control autoComplete='username' onChange={this.onInputChange}  type="email" placeholder="Correo" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control autoComplete='current-password' onChange={this.onInputChange}  type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={() => {this.handleSubmitUser()}} variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        );
    }
}
