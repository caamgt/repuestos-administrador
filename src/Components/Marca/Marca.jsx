import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import '../../Pages/NewPart.css';
export class Marca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marca: '',
            tipoMarca: '',
            tipos: []
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/tipos', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({tipos: data.tipos})
        })
        .catch(err => console.log(err))
    }

    onFormSubmitMarca = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/marca', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.marca,
                tipo: this.state.tipoMarca
            })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return(

            <Col md={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nueva marca</Card.Title>
                        <Form>
                            <Form.Group controlId="marca">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="Volvo" required/>
                            </Form.Group>
                            <Form.Group controlId="tipoMarca">
                                <Form.Label>Selecione el tipo</Form.Label>
                                <Form.Control as="select" onChange={this.onInputChange} required>
                                <option value=''>Seleccionar...</option>
                                {
                                    this.state.tipos.map((tipo) => {
                                        return (
                                            <option key={tipo._id} value={tipo._id}>{tipo.descripcion}</option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={() => this.onFormSubmitMarca()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}