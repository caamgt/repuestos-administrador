import React, { Component } from 'react';
import { Card, Button, Form, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';

export class EditarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            img: '',
            userImgUrl: '',
            password: ''
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');

        fetch(`http://localhost:3001/user/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then((resp) => resp.json())
        .then((data) => {
            this.mostrarImg(data.user.img);
            return this.setState({
                nombre: data.user.nombre,
                apellido: data.user.apellido,
                email: data.user.email,
                img: data.user.img,
                password: ''
            });
        })
        .catch(err => console.log(err));
    }

    mostrarImg = (img) => {
        const token = window.sessionStorage.getItem('token');

        fetch(`http://localhost:3001/image/users/${img}?token=${token}`, {
            method: 'get'
        })
        .then(imagen => {
            this.setState({
                userImgUrl: imagen.url
            })
        })
    }

    handleSubmit = () => {
        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/user/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                password: this.state.password
            })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {nombre, apellido, email, userImgUrl} = this.state;
        return(
            <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }} xl={{ span: 4, offset: 3 }} className='pt-2 animated fadeIn'>
                <Card className='perfil-container'>
                    <div className='userImg-container'>
                        <Card.Img variant="top" src={userImgUrl} alt='perfil'/>
                    </div>
                    
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="nombre">
                                <Form.Control onChange={this.onInputChange} type="text" value={nombre} required/>
                            </Form.Group>
                            <Form.Group controlId="apellido">
                                <Form.Control onChange={this.onInputChange} type="text" value={apellido} required/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Control onChange={this.onInputChange} autoComplete='username' type="text" value={email} disabled required/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control onChange={this.onInputChange} placeholder='Contraseña' autoComplete='current-password' type="password"/>
                            </Form.Group>
                            <div className='userEdit-btn'>
                                <Link to={'/listadousuarios'}>
                                    <Button variant="secondary">
                                        <FontAwesomeIcon icon={faArrowCircleLeft}/>&nbsp;Regresar
                                    </Button>
                                </Link>
                                <Button variant="primary" onClick={() => this.handleSubmit()} type='submit'>
                                    <FontAwesomeIcon icon={faSave}/>&nbsp;Guardar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}