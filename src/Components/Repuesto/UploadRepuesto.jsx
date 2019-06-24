import React, { Component } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import Axios from 'axios';

export class UploadRepuesto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        }
    }

    handleUploasSubmit = () => {
        const token = window.sessionStorage.getItem('token');
        const fd = new FormData();
        fd.append('file', this.state.file);
        Axios('http://localhost:3001/import', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            data: fd
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                this.setState({show: false});
                return resp;
            }
        })
        .catch(err => console.log(err));
    }

    fileSelectedHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    }

    render() {
        console.log(this.state.file);
        return(
            <Col md={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Carga masiva de datos</Card.Title>
                        <Form>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input onChange={this.fileSelectedHandler} type="file" className="custom-file-input" id="file" lang="es"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile03">Buscar archivo</label>
                                </div>
                            </div>
                            <Button onClick={() => this.handleUploasSubmit()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card> 
            </Col>
        );
    }
}