import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

export class ChangeName extends Component {
    constructor (props) {
        super(props);
        this.state = {
            nombre: this.props.user.nombre,
            apellido: this.props.user.apellido
        }
    }

onProfileUpdate = (data) => {
        const userId = this.props.user.id;
        fetch(`http://localhost:3001/profile/${userId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('token')},
            body: JSON.stringify({formInput: data})
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    handleInput = (event) => {
        switch(event.target.name) {
            case 'user-name':
                this.setState({nombre: event.target.value})
                break;
            case 'user-apellido':
                this.setState({apellido: event.target.value})
                break;
            default:
                return;
        }
    }

    render() {
        const {nombre, apellido} = this.state;
        return(
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Cambiar el nombre</Form.Label>
                    <Form.Control 
                        name="user-name"
                        type="text" 
                        placeholder={nombre}
                        value={nombre} 
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Cambiar el apellido</Form.Label>
                    <Form.Control 
                        name="user-apellido"
                        type="text" 
                        placeholder={apellido} 
                        onChange={this.handleInput}
                        value={apellido}
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type='submit'
                    onClick={() => this.onProfileUpdate({nombre, apellido})}
                >
                    Guardar
                </Button>
            </Form>
        );
    }
}