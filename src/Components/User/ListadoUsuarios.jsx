import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export class ListadoUsuarios extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userId: '',
            usuariosList: [],
            show: false,
            repuestoId: '',
            noRepuestoMessage: '',
            desde: 0,
            hasta: '',
            porPagina: '',
            totalRepuestos: '',
            value: true,
            mostrar: ''
        }
    }

    handleClose = () => {
        return this.setState({ show: false });
      }
    
      handleShow = (id) => {
        return this.setState({ show: true, userId: id});
      }
    
    onDeleteSubmit = (id) => {
        const index = this.state.usuariosList.findIndex(user => {
            return user._id === id;
        });
        const users = Object.assign([], this.state.usuariosList);
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/user/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                users.splice(index, 1)
                this.setState({ show: false, usuariosList: users});
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const ancho = window.innerWidth
        if (ancho <= 414) {
            this.setState({mostrar: false});
        } else {
            this.setState({mostrar: true});
        }
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/users?desde=0&limite=100`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.users.length === 0) {
                return this.setState({noRepuestoMessage: 'No hay repuestos'});
            } else {
                return this.setState({
                    usuariosList: data.users
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
        const {usuariosList} = this.state;
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'nombre',
                resizable: true,
                minWidth: 50
            },
            {
                Header: 'Apellido',
                accessor: 'apellido',
                resizable: true,
                minWidth: 50,
                show: this.state.mostrar
            },
            {
                Header: 'Email',
                accessor: 'email',
                resizable: true,
                minWidth: 50,
                show: this.state.mostrar
            },
            {
                Header: 'Acciones',
                Cell: props => {
                    return (
                        <div>
                            <span className="d-inline-block actionBtn">
                                <Link to={`/miperfil/${props.original._id}`}>
                                    <Button className='actionBtn'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </Link>
                            </span>
                            <span className="d-inline-block">
                            <Link to={`/usuario/editar/${props.original._id}`} className='actionBtn'>
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
                filterable: false,
                resizable: true,
                minWidth: 50
            }
        ]
        return(
            <Col xs={12} sm={12} md={9} lg={9} xl={10}>
                <Card>
                    <Card.Header className='cardHeader'>
                        <Card.Title className="lstRepuestosTitulo">Listado de usuarios</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {
                            usuariosList.length === 0 ? <Alert variant="danger" style={{textAlign: 'center'}}>{this.state.noRepuestoMessage}</Alert>
                    : <ReactTable
                        columns={columns}
                        data={usuariosList}
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
                            <Button onClick={() => this.onDeleteSubmit(this.state.userId)} variant="primary">
                                Si
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </Col>
        );
    }
}