import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

export class EditarTipo extends Component {
    constructor() {
        super();
        this.state = {
            descripcion: '',
            nota: ''
        }
    }

    onSubmitForm = () => {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/tipo/${id}`, {
            method: 'put',
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
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/tipo/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
            return this.setState({
                descripcion: data.tipo.descripcion,
                nota: data.tipo.nota
            });
        })
        .catch(err => console.log(err));
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {descripcion, nota} = this.state;
        return(
            <Col xs={12} sm={12} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Editar tipo</Card.Title>
                    <Form>
                        <Form.Group controlId="descripcion">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" value={descripcion} required/>
                            </Form.Group>
                            <Form.Group controlId="nota">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={this.onInputChange} as="textarea" rows="3" value={nota}/>
                            </Form.Group>
                        <div className='edit-marcar-btn'>
                            <Link to={'/listadotipos'}>
                                <Button variant="secondary" className='py-2 m-2'>
                                    <FontAwesomeIcon icon={faArrowCircleLeft}/>&nbsp;Regrear
                                </Button>
                            </Link>
                            <Link to={'/listadotipos'}>
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