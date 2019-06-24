import React, { Component } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import {Logo} from '../Logo/Logo';
import './SignIn.css';

export class SignIn extends Component {
    constructor () {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMessage: ''
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
                return this.setState({errorMessage: text});
            }).catch(err => console.log(err))
          } else {
            return response.json();
          }
        })
      .then(data => {
        if (data === undefined) {
            return console.log('Error')
        } 
        if (data.userId && data.success === 'true') {
            this.saveAuthTokenInSession(data.token);
            fetch(`http://localhost:3001/profile/${data.userId}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                    }
                })
                .then(resp => {
                    if (!resp.ok) {
                        return resp.text().then(text => {
                            return this.setState(text);
                        })
                    } else {
                        return resp.json();
                    }
                })
                .then(user => {
                    if (user && user.email) {
                        this.props.loadUser(user)
                        this.props.onRouteChange('home');
                    } else {
                        return console.log('Error con el usuario')
                    }
                })
                .catch(err => {
                    return  this.setState({errorMessage: err});
                })
        } else {
            return this.setState({errorMessage: 'Imposible obtener el usuario'});
        }
      })
      .catch(err => {
          return this.setState({errorMessage: 'El servidor esta fuera de linea'});
      })
    }

    render() {
        return(
            <div className='signin-page-wrapper animated fadeIn'>
            <div className='color-overlay'></div>
                <div className='container-fluid animated fadeIn'>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }} className='text-center animated fadeIn'>
                            <Card style={{ width: '22rem' }}>
                            <div className='signin-logo'>
                            <Logo />
                            </div>
                                <Card.Body>
                                <Form>
                                    <Form.Group controlId="signInEmail">
                                        <Form.Label>Correo</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            autoComplete='username'
                                            onChange={this.onInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="signInPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            autoComplete='current-password'
                                            onChange={this.onInputChange}
                                        />
                                    </Form.Group>
                                    <div className='errorContainer'>
                                        {this.state.errorMessage}
                                    </div>
                                    <Button 
                                        onClick={this.onSubmitSignIn}
                                        variant="primary" 
                                        value="Sign in"
                                    >
                                        Ingresar
                                    </Button>                                    
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
