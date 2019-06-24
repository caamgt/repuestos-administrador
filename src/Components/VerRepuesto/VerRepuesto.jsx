import React, { Component } from 'react';
import { Col, Card, Image, Modal, Row, ListGroup, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './VerRepuesto.css';
import noImg from '../../assets/no-imagen.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

export class VerRepuesto extends Component {
    constructor (props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            showImg: '',
            repuestoImg: '',
            primeraImg: '',
            segundaImg: '',
            terceraImg: '',
            imagenes: [],
            repuesto: ''
        }
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        const id = this.props.match.params.id;
        fetch(`http://localhost:3001/repuesto/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.repuesto === null) {
                return console.log('No existe');
            }
            if (data.repuesto.img.length === 0 || data.repuesto.img === undefined) {
                return this.setState({
                    showImg: noImg,
                    imagenes: data.repuesto.img,
                    repuesto: data.repuesto
                });
            } else {
                return this.setState({
                    showImg: `http://localhost:3001/${data.repuesto.img[0].path}`, 
                    imagenes: data.repuesto.img,
                    repuesto: data.repuesto
                });
            }
        })
        .catch(err => console.log(err));
    }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow() {
    this.setState({ show: true });
    }

    onInputChange = (e) => {
        this.setState({
            showImg: e.target.src
        });
    }
    

    render() {
        const {id} = this.props.match.params
        const {nombre, cantidad, dimensiones, nota, precio, oferta, } = this.state.repuesto;
        return(
            <Col md={{ span: 7, offset: 1 }} className='pt-5'>
                <Card>
                    <Row>
                        <Col lg={6}>
                            <Card className='galeria-repuesto'>
                                <Image onClick={this.handleShow} className='verRepuestoImg' src={this.state.showImg} rounded />
                                <Card.Footer className='footerImg-container'>
                                    {
                                        this.state.imagenes.map(imagen => {
                                            return (
                                                <div key={imagen._id} className='primera-img' onClick={this.onInputChange} >
                                                    <Image id='primeraImg' className='verRepuestoImg' src={`http://localhost:3001/${imagen.path}`} rounded />
                                                </div>
                                            )
                                        })
                                    }
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            
                            <Row>
                                <Col lg={12}>
                                    <div className='detalles-container'>
                                        <h2>{nombre}</h2>
                                        <div className='attr-line'></div>
                                    </div>
                                    <ListGroup variant="flush">
                                        <span>{oferta}</span>
                                        <ul>
                                            <li><strong>Dimensiones:</strong>&nbsp;{dimensiones}</li>
                                            <li><strong>nota:</strong>&nbsp;{nota}</li>
                                            <li><strong>En inventario:</strong>&nbsp;{cantidad}</li>
                                            <li><strong>Precio:</strong>&nbsp;Q&nbsp;{precio}</li>
                                        </ul>
                                    </ListGroup>
                                </Col>
                                <Col lg={12}>
                                    <div className='btnContainer'>
                                        <Link to={'/listadorepuestos'}>
                                            <Button variant="secondary"><FontAwesomeIcon icon={faArrowCircleLeft} />&nbsp;Regresar</Button>
                                        </Link>
                                        <Link to={`/repuesto/editar/${id}`}>
                                            <Button><FontAwesomeIcon icon={faEdit} />&nbsp;Editar</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
    
                <Modal show={this.state.show} onHide={this.handleClose} size='lg' centered>
                <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className='img-modal-container'>
                        <Image className='fullWidthImg' src={this.state.showImg} rounded />
                    </Modal.Body>
                </Modal>
            </Col>
        );
    }
}