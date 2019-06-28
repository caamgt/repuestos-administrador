import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export class ListadoTipos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tipoList: [],
            noRepuestoMessage: '',
            marcaId: '',
            tipoId: ''
        }
    }

    handleClose = () => {
        return this.setState({ show: false });
      }
    
    handleShow = (id) => {
    return this.setState({ show: true, tipoId: id});
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

    onDeleteSubmit = (id) => {
        const index = this.state.tipoList.findIndex(tipo => {
            return tipo._id === id;
        });
        const tipos = Object.assign([], this.state.tipoList);
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3001/deletetipo/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                tipos.splice(index, 1)
                this.setState({ show: false, tipoList: tipos});
                return resp;
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3001/tipos', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.tipos.length === 0) {
                return this.setState({noRepuestoMessage: 'No hay repuestos'});
            } else {
                return this.setState({
                    tipoList: data.tipos
                });
            }
        })
    }
    render() {
        const {tipoList} = this.state;
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'descripcion',
                resizable: true,
                minWidth: 50
            },
            {
                Header: 'Descripción',
                accessor: 'nota',
                resizable: true,
                minWidth: 50
            },
            {
                Header: 'Acciones',
                style: {
                    textAlign: 'center'
                },
                resizable: true,
                minWidth: 50,
                Cell: props => {
                    return (
                        <div>
                            <span className="d-inline-block">
                            <Link to={`/tipo/editar/${props.original._id}`} className='actionBtn'>
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
            <Col xs={12} sm={12} md={9} lg={9} xl={10}>
            <Card>
                <Card.Header className='cardHeader'>
                    <Card.Title className="lstRepuestosTitulo">Listado de tipos</Card.Title>
                </Card.Header>
                <Card.Body>
                    {
                        tipoList.length === 0 ? <Alert variant="danger" style={{textAlign: 'center'}}>{this.state.noRepuestoMessage}</Alert>
                 : <ReactTable
                    columns={columns}
                    data={tipoList}
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
                        <Button onClick={() => this.onDeleteSubmit(this.state.tipoId)} variant="primary">
                            Si
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </Col>
        );
    }
}