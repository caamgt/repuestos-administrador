import React, { Component } from 'react';
import { Button, Form, InputGroup, Col, Card, Modal, Alert } from 'react-bootstrap';
import { ButtonBackToRepuestos } from '../ButtonBackToRepuestos/ButtonBackToRepuestos';
import './EditRepuesto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

export class EditRepuesto extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show: false,
            nombre: '',
            marca: '',
            dimensiones: '',
            precio: '',
            nota: '',
            categoria: '',
            cantidad: '',
            idMarca: '',
            idCategoria: '',
            categorias: [],
            marcas: [],
            img1: '',
            img2: '',
            img3: '',
            uploadImgError: '',
            isActiveClass: false
        }
    }

    onSubmitEdit = () => {
        const {id} = this.props.match.params;
        fetch(`http://localhost:3001/product/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('token')},
            body: JSON.stringify({
                nombre: this.state.nombre,
                marca: this.state.marca,
                dimensiones: this.state.dimensiones,
                precio: this.state.precio,
                nota: this.state.nota,
                categoria: this.state.categoria,
                cantidad: this.state.cantidad
            })
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        }).catch(err => console.log(err))
    }

    fetchRepuesto = (id) => {
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/repuesto/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => resp.json())
        .then(data => {
            return this.setState({
                idMarca: data.repuesto.marca.nombre,
                idCategoria:data.repuesto.categoria.nombre,
                nombre: data.repuesto.nombre,
                marca: data.repuesto.marca._id,
                dimensiones: data.repuesto.dimensiones,
                precio: data.repuesto.precio,
                nota: data.repuesto.nota,
                categoria: data.repuesto.categoria._id,
                cantidad: data.repuesto.cantidad
            });
        })
        .catch(err => console.log(err))

    }

    handleClose =() => {
        this.setState({ show: false });
    }
    
    handleShow = () =>{
        this.setState({ show: true });
    }
    
    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmitImg = () => {
        const fd = new FormData();

        fd.append('img', this.state.img1);
        fd.append('img', this.state.img2);
        fd.append('img', this.state.img3);

        const {id} = this.props.match.params;
        const token = window.sessionStorage.getItem('token');

        Axios(`http://localhost:3001/product/img/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            data: fd
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                this.setState({show: false});
                return resp;
            }
        })
        .catch(err => this.setState({uploadImgError: err.response.data}))
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.fetchRepuesto(id);

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

    fileSelectedHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    }
    
    render() {
        const {idMarca, idCategoria, nombre, dimensiones, nota, cantidad, precio, marca, categoria, marcas, categorias} = this.state;
        return(
            <Col md={{ span: 6, offset: 2 }} className='pt-5 animated fadeIn'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Editar Repuesto</Card.Title>
                    <hr />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control onChange={this.onInputChange} type="text" value={nombre} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="dimensiones">
                                    <Form.Label>Dimensiones</Form.Label>
                                    <Form.Control onChange={this.onInputChange} type="text" value={dimensiones} />
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Group controlId="nota">
                                <Form.Label>Notas adicionales</Form.Label>
                                <Form.Control onChange={this.onInputChange} as="textarea" rows="3" value={nota}/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="marca">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control onChange={this.onInputChange} as="select">
                                    <option value={marca}>{idMarca}</option>
                                        {
                                            marcas.map((marca) => {
                                                return (
                                                    <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="categoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Control onChange={this.onInputChange} as="select">
                                    <option value={categoria}>{idCategoria}</option>
                                        {
                                            categorias.map((categoria) => {
                                                return (
                                                    <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="cantidad">
                                    <Form.Label>Cantidad</Form.Label>
                                    <InputGroup>
                                    <Form.Control aria-describedby="inputGroupPrepend" onChange={this.onInputChange} type="text" value={cantidad} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} controlId="precio">
                                    <Form.Label>Precio</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">Q</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.onInputChange} type="text" value={precio} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>

                        {/* <Form.Row>
                            <Col md={6}>
                            {['checkbox'].map(type => (
                                <div key={`custom-inline-${type}`} className="mb-3">
                                    <Form.Check
                                        custom
                                        inline
                                        label="Nuevo"
                                        type={type}
                                        id={`custom-inline-${type}-1`}
                                    />
                                    <Form.Check
                                        custom
                                        inline
                                        label="Usado"
                                        type={type}
                                        id={`custom-inline-${type}-2`}
                                    />
                                </div>
                            ))}
                            </Col>
                            <Col md={6}>
                            </Col>
                            
                        </Form.Row> */}
                        <ButtonBackToRepuestos className='editBtnSpacing'/>
                        <Button onClick={() => this.onSubmitEdit()} variant="primary" type='submit' className='editBtnSpacing'>
                            Guardar&nbsp; <FontAwesomeIcon icon={faSave}/>
                        </Button>
                        <Button onClick={this.handleShow} variant="primary" className='editBtnSpacing'>
                            Cargar Imagenes&nbsp; <FontAwesomeIcon icon={faFileUpload}/>
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Carga de imágenes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group as={Col} controlId="img1">
                        <Form.Control type="file" onChange={this.fileSelectedHandler}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="img2">
                        <Form.Control type="file" onChange={this.fileSelectedHandler}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="img3">
                        <Form.Control type="file" onChange={this.fileSelectedHandler}/>
                    </Form.Group>
                    </Form>
                    {
                        this.state.uploadImgError === '' ? <Alert className='hideMessage' variant="danger" style={{textAlign: 'center'}}>{this.state.uploadImgError}</Alert>
                        : <Alert variant="danger" id="imgError1" style={{textAlign: 'center'}}>{this.state.uploadImgError}</Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => this.onSubmitImg()}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
        );
    }
}