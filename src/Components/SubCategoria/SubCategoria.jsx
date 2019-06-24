import React, { Component } from 'react';
import { Form, Col, Card, Button} from 'react-bootstrap';
import '../../Pages/NewPart.css';

export class SubCategoria extends Component {
    constructor () {
        super();
        this.state = {
            nombre: '',
            categoria: '',
            categorias: []
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/categorias', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
            return this.setState({categorias: data.categorys});
        })
    }

    onSubmitCategoria = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/subcategoria', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify({
                descripcion: this.state.nombre,
                categoria: this.state.categoria
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
                        <Card.Title className='text-center'>Nueva Sub-Categoria</Card.Title>
                        <Form>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={this.onInputChange} type="text" placeholder="Discos, pastillas y pinzas de freno" required/>
                            </Form.Group>
                            <Form.Group controlId="categoria">
                                <Form.Label>Selecione la categoria</Form.Label>
                                <Form.Control as="select" onChange={this.onInputChange} required>
                                <option value=''>Seleccionar...</option>
                                {
                                    this.state.categorias.map((categoria) => {
                                        return (
                                            <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                                        )
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={() => this.onSubmitCategoria()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Col>
        );
    }
}