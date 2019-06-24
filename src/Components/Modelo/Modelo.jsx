import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import '../../Pages/NewPart.css';

export class Modelo extends Component {
    constructor () {
        super();
        this.state = {
            modelo: '',
            linea: '',
            lineas: []
        }
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/lineas', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => resp.json())
        .then(data => {
            return this.setState({lineas: data.lineas});
        })
    }

    onSubmitModelo = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/modelo', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                descripcion: this.state.modelo,
                linea: this.state.linea
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
            <Col md={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nuevo Modelo</Card.Title>
                        <Form>
                            <Form.Group controlId="modelo">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="2018" required/>
                            </Form.Group>
                            <Form.Group controlId="linea">
                                <Form.Label>Selecione la línea</Form.Label>
                                <Form.Control as="select" onChange={this.onInputChange} required>
                                <option value=''>Seleccionar...</option>
                                {
                                    this.state.lineas.map((linea) => {
                                        return (
                                            <option key={linea._id} value={linea._id}>{linea.nombre}</option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={() => this.onSubmitModelo()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}