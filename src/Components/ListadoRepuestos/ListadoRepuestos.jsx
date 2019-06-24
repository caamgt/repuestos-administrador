import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './ListadoRepuestos.css';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export class ListadoRepuestos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            repuestosList: [],
            show: false,
            repuestoId: '',
            noRepuestoMessage: '',
            desde: 0,
            hasta: '',
            porPagina: '',
            totalRepuestos: '',
            value: true
        }
    }

    handleClose = () => {
        return this.setState({ show: false });
      }
    
      handleShow = (id) => {
        return this.setState({ show: true, repuestoId: id});
      }
    
    onDeleteSubmit = (id) => {
        const index = this.state.repuestosList.findIndex(repuesto => {
            return repuesto._id === id;
        });
        const repuestos = Object.assign([], this.state.repuestosList);
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                repuestos.splice(index, 1)
                this.setState({ show: false, repuestosList: repuestos});
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/products?desde=${this.state.desde}&limite=100`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.products.length === 0) {
                return this.setState({noRepuestoMessage: 'No hay repuestos'});
            } else {
                return this.setState({
                    repuestosList: data.products,
                    totalRepuestos: data.totalProducts,
                    porPagina: data.products.length
                });
            }
        })
        .catch(err => this.setState({noRepuestoMessage: 'Problemas con el servidor'}))
        
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        const content = row[id];
        if (typeof content !== 'undefined') {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }
    
        return true;
    };

    render() {
        const {repuestosList} = this.state;
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'nombre'
            },
            {
                id: 'marca',
                Header: 'Marca',
                accessor: d => d.marca.nombre
            },
            {
                id: 'categoria',
                Header: 'Categoria',
                accessor: d => d.categoria.nombre 
            },
            {
                Header: 'Cantidad',
                accessor: 'cantidad',
                style: {
                    textAlign: 'center'
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            },
            {
                Header: 'Precio',
                accessor: 'precio',
                style: {
                    textAlign: 'center'
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            },
            {
                Header: 'Acciones',
                Cell: props => {
                    return (
                        <div>
                            <span className="d-inline-block actionBtn">
                                <Link to={`/ver/repuesto/${props.original._id}`}>
                                    <Button className='actionBtn'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </Link>
                            </span>
                            <span className="d-inline-block">
                            <Link to={`/repuesto/editar/${props.original._id}`} className='actionBtn'>
                                <Button className='actionBtn' variant="secondary">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Link>
                            </span>
                            <span className="d-inline-block actionBtn">
                                <Button onClick={() => this.handleShow(props.original._id)} className='actionBtn' variant="danger" type='submit'>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </span>
                        </div>
                    )
                },
                sortable: false,
                filterable: false
            }
        ]
        return(
            
            <Col lg={10}>
                <Card>
                    <Card.Header className='cardHeader'>
                        <Card.Title className="lstRepuestosTitulo">Listado de repuestos</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {
                            repuestosList.length === 0 ? <Alert variant="danger" style={{textAlign: 'center'}}>{this.state.noRepuestoMessage}</Alert>
                    : <ReactTable
                        columns={columns}
                        data={repuestosList}
                        resolveData={data => data.map(row => row)}
                        filterable
                        defaultPageSize={10}
                        defaultFilterMethod={ this.filterCaseInsensitive }
                        defaultSortMethod={ (a, b, desc) => {
                            // force null and undefined to the bottom
                            a = a === null || a === undefined ? '' : a
                            b = b === null || b === undefined ? '' : b
                            // force any string values to lowercase
                            a = typeof a === 'string' ? a.toLowerCase() : a
                            b = typeof b === 'string' ? b.toLowerCase() : b
                            // Return either 1 or -1 to indicate a sort priority
                            if (a > b) {
                              return 1
                            }
                            if (a < b) {
                              return -1
                            }
                            // returning 0, undefined or any falsey value will use subsequent sorts or
                            // the index as a tiebreaker
                            return 0
                          }
                        }
                        previousText={'Anterior'}
                        nextText={'Siguiente'}
                        loadingText={'Cargando...'}
                        noDataText={'No se encontro información'}
                        pageText={'Página'}
                        ofText={'de'}
                        rowsText={'Columnas'}
                        pageJumpText={'saltar a la página'}
                        rowsSelectorText={'filas por página'}
                    />
                    
                    
                }
                    </Card.Body>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>¿Seguro que quieres eliminar el producto?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancelar
                            </Button>
                            <Button onClick={() => this.onDeleteSubmit(this.state.repuestoId)} variant="primary">
                                Si
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </Col>
        );
    }
}