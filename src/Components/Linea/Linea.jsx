import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import '../../Pages/NewPart.css';
export class Linea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linea: '',
            marcaLinea: '',
            marcas: []
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/marcas', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({marcas: data.marcas});
        })
    }

    onSubmitLinea = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/linea', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.linea,
                marca: this.state.marcaLinea
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
                        <Card.Title className='text-center'>Nueva Linea</Card.Title>
                        <Form>
                            <Form.Group controlId="linea">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="XC90" required/>
                            </Form.Group>
                            <Form.Group controlId="marcaLinea">
                                <Form.Label>Selecione la marca</Form.Label>
                                <Form.Control as="select" onChange={this.onInputChange} required>
                                <option value=''>Seleccionar...</option>
                                {
                                    this.state.marcas.map((marca) => {
                                        return (
                                            <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={() => this.onSubmitLinea()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}