import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import './marca.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

export class EditarMarca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marca: '',
            tipos: [],
            tipoId: '',
            tipo: ''
        }
    }

    onSubmitForm = () => {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/marca/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.marca,
                tipo: this.state.tipo
            })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');
        Promise.all([
            fetch(`http://localhost:3001/marca/${id}`, {
                method: 'get',
                headers: {'Content-Type': 'application/json', 'Authorization': token}
            }),
            fetch('http://localhost:3001/tipos', {
                method: 'get',
                headers: {'Content-Type': 'application/json', 'Authorization': token}
            })
        ])
        .then(([resp1, resp2]) => Promise.all([resp1.json(), resp2.json()]))
        .then(([marca, tipo]) => {
            return this.setState({
                marca: marca.marca.nombre,
                tipoId: marca.marca.tipo.descripcion,
                tipo: marca.marca.tipo._id,
                tipos: tipo.tipos
            });
        })
        .catch(err => console.log(err))

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {tipoId, tipo, marca} = this.state;
        return(
            <Col md={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Editar marca</Card.Title>
                        <Form>
                            <Form.Group controlId="marca">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" value={marca} required/>
                            </Form.Group>
                            <Form.Group controlId="tipo">
                                <Form.Label>Selecione el tipo</Form.Label>
                                <Form.Control as="select" onChange={this.onInputChange} required>
                                <option value={tipo}>{tipoId}</option>
                                {
                                    this.state.tipos.map((tipo) => {
                                        return (
                                            <option key={tipo._id} value={tipo._id}>{tipo.descripcion}</option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <div className='edit-marcar-btn'>
                                <Link to={'/listadomarcas'}>
                                    <Button variant="secondary" className='py-2 m-2'>
                                        <FontAwesomeIcon icon={faArrowCircleLeft}/>&nbsp;Regrear
                                    </Button>
                                </Link>
                                <Link to={'/listadomarcas'}>
                                    <Button onClick={() => this.onSubmitForm()} variant="primary" type='submit' className='py-2 m-2'>
                                        <FontAwesomeIcon icon={faSave}/>&nbsp;Guardar
                                    </Button>
                                </Link>                               
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}