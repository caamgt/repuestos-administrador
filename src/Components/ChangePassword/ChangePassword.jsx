import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
export class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            password: ''
        }
    }

    onChangePassword = () => {
        const token = window.sessionStorage.getItem('token');
        const {id} = this.props.user.user.user.id;
        fetch(`http://localhost:3001/user/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                password: this.state.password
            })
        })
    }

    onInputChange = (e) => {
        return this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return(
            <Form>
                <Form.Group controlId="password">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <Form.Control onChange={this.onInputChange} type="password" placeholder="Password" autoComplete='new-password' ng-hide="true"/>
                </Form.Group>
                <Button onClick={() => this.onChangePassword()} variant="primary">
                    Guardar
                </Button>
            </Form>
        );
    }
}
