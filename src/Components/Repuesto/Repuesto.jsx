import React, { Component } from 'react';
import axios from 'axios';
import { Form, Col, Button, Card, InputGroup } from 'react-bootstrap';
import './Repuesto.css';
export class Repuesto extends Component {
    constructor (props) {
        super(props);
        this.state = {
            nombre: '',
            dimensiones: '',
            marca: '',
            linea: '',
            modelo: '',
            transmision: '',
            motor: '',
            chasis: '',
            nota: '',
            cantidad: '',
            categoria: '',
            precio: '',
            categorias: [],
            marcas: [],
            img1: '',
            img2: '',
            img3: ''
        }
    }

    onInputChange = (e) => {
        return this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount () {
        const token = window.sessionStorage.getItem('token');
        Promise.all([
            fetch('http://localhost:3001/categorias', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        }),
        fetch('http://localhost:3001/marcas', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        ])
        .then(([resp1, resp2]) => Promise.all([resp1.json(), resp2.json()]))
        .then(([categorias, marcas]) => {
            return this.setState({
                categorias: categorias.categorias,
                marcas: marcas.marcas
            });
        })
        .catch(err => console.log(err));
    }

    onSubmitProduct = () => {
        const fd = new FormData();
        fd.append('nombre', this.state.nombre);
        fd.append('dimensiones', this.state.dimensiones);
        fd.append('nota', this.state.nota);
        fd.append('marca', this.state.marca);
        fd.append('categoria', this.state.categoria);
        fd.append('cantidad', this.state.cantidad);
        fd.append('precio', this.state.precio);
        fd.append('img', this.state.img1);
        fd.append('img', this.state.img2);
        fd.append('img', this.state.img3);
        const token = window.sessionStorage.getItem('token');
        axios('http://localhost:3001/product', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            data: fd
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    fileSelectedHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    }

    render() {
        return(
            <Col xs={{ span: 10, offset: 1 }}  sm={{ span: 10, offset: 1 }}  md={{ span: 8, offset: 0 }} lg={{ span: 8, offset: 0 }}  xl={{ span: 7, offset: 1 }} className='pt-5 animated fadeIn'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'>Nuevo Producto</Card.Title>
                        <hr />
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control onChange={this.onInputChange} type="text" placeholder="Nombre del producto" required/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="dimensiones">
                                        <Form.Label>Dimensiones</Form.Label>
                                        <Form.Control onChange={this.onInputChange} type="text" placeholder="81 x 42 x 9.3mm" />
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Group controlId="nota">
                                    <Form.Label>Notas adicionales</Form.Label>
                                    <Form.Control onChange={this.onInputChange} as="textarea" rows="3" placeholder='Notas adicionales del...'/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="marca">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control onChange={this.onInputChange} as="select" required>
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

                                    <Form.Group as={Col} controlId="categoria">
                                        <Form.Label>Categoría</Form.Label>
                                        <Form.Control onChange={this.onInputChange} as="select" required>
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
                                </Form.Row>
                                        <Form.Group>
                                        <div className="custom-file">
                                            <input type="file" onChange={this.fileSelectedHandler} className="custom-file-input" id="img1" lang="es" />
                                            <label className="custom-file-label" htmlFor="customFileLang">Seleccionar Archivo</label>
                                        </div>
                                        </Form.Group>
                                        <Form.Group>
                                        <div className="custom-file">
                                            <input type="file" onChange={this.fileSelectedHandler} className="custom-file-input" id="img2" lang="es" />
                                            <label className="custom-file-label" htmlFor="customFileLang">Seleccionar Archivo</label>
                                        </div>
                                        </Form.Group>
                                        <Form.Group>
                                           <div className="custom-file">
                                            <input type="file" onChange={this.fileSelectedHandler} className="custom-file-input" id="img3" lang="es" />
                                            <label className="custom-file-label" htmlFor="customFileLang">Seleccionar Archivo</label>
                                        </div>
                                        </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="cantidad">
                                        <Form.Label>Cantidad</Form.Label>
                                        <InputGroup>
                                        <Form.Control aria-describedby="inputGroupPrepend"  onChange={this.onInputChange} type="number" min="1" placeholder="10" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="precio">
                                        <Form.Label>Precio</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">Q</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control onChange={this.onInputChange} type="number" min="1" placeholder="150" />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            <Button onClick={() => this.onSubmitProduct()} variant="primary" type='submit'>
                                Guardar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
