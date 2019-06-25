import React, { Component } from 'react';
import {Logo} from '../Logo/Logo';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faUser, faUserPlus, faSignOutAlt, faDollyFlatbed, faUserShield, faCar, faBoxes, faPlus, faUpload, faList, faTag} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Col, Nav, NavDropdown, Navbar } from 'react-bootstrap';

export class Sidebar extends Component {


    static propTypes = {
        id: PropTypes.string,
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        email: PropTypes.string
    }

    render() {
        const {onRouteChange, user} = this.props;
        return (
                <Col xs={12} sm={12} md={4} lg={3} xl={2} className='aside-menu-container'>

                    <Navbar collapseOnSelect expand="md" defaultactivekey="/home" className="flex-column" bg="light">
                        <div className='menu-mobil'>
                            <div>
                            <Navbar.Brand>
                                <Logo />
                            </Navbar.Brand>
                            </div>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        </div>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="flex-column nav-container justify-content-center">
                        <NavDropdown.Divider />
                            <Link to='/' className="nav-link"><FontAwesomeIcon icon={faTh}/>&nbsp;Dashboard</Link>
                            <NavDropdown.Divider />
                            <div className='nav-item-container'>
                                <div className='nav-item-icon '>
                                    <FontAwesomeIcon icon={faDollyFlatbed}/>
                                </div>
                                <div className='nav-item-icon-text '>
                                <NavDropdown className='nav-link' title="Repuestos" id="collasible-nav-dropdown">
                                    <div className='submenu-items'>
                                    <Link to='/repuesto' className="dropdown-item nav-link"><FontAwesomeIcon icon={faPlus}/>&nbsp;Nuevo repuesto</Link>
                                    <Link to='/uploadrepuesto' className="dropdown-item nav-link"><FontAwesomeIcon icon={faUpload}/>&nbsp;Carga de repuestos</Link>
                                    <Link to='/listadorepuestos' className="dropdown-item nav-link"><FontAwesomeIcon icon={faList}/>&nbsp;Listado de repuestos</Link>
                                    </div>
                                </NavDropdown>
                                </div>
                            </div>
                            <NavDropdown.Divider />
                            <Link to='/categoria' className="nav-link"><FontAwesomeIcon icon={faBoxes}/>&nbsp;Categoria</Link>
                            <div className='nav-item-container'>
                                <div className='nav-item-icon '>
                                    <FontAwesomeIcon icon={faTag}/>
                                </div>
                                <div className='nav-item-icon-text '>
                                <NavDropdown className='nav-link' title="Marcas" id="collasible-nav-dropdown">
                                    <div className='submenu-items'>
                                    <Link to='/marca' className="dropdown-item nav-link"><FontAwesomeIcon icon={faPlus}/>&nbsp;Nueva marca</Link>
                                    <Link to='/listadomarcas' className="dropdown-item nav-link"><FontAwesomeIcon icon={faList}/>&nbsp;Listado de marcas</Link>
                                    </div>
                                </NavDropdown>
                                </div>
                            </div>
                            <div className='nav-item-container'>
                                <div className='nav-item-icon '>
                                    <FontAwesomeIcon icon={faCar}/>
                                </div>
                                <div className='nav-item-icon-text '>
                                    <NavDropdown title="Tipos" className='nav-link' id="basic-nav-dropdown">
                                        <div className='submenu-items'>
                                            <Link to='/tipo' className="dropdown-item nav-link"><FontAwesomeIcon icon={faPlus}/>&nbsp;Nuevo tipo</Link>
                                            <Link to='/listadotipos' className="dropdown-item nav-link"><FontAwesomeIcon icon={faList}/>&nbsp;Listado Tipos</Link>
                                        </div>
                                    </NavDropdown>
                                </div>
                            </div>
                            <NavDropdown.Divider />
                            <div className='nav-item-container'>
                                <div className='nav-item-icon '>
                                    <FontAwesomeIcon icon={faUserShield}/>
                                </div>
                                <div className='nav-item-icon-text '>
                                    <NavDropdown title="Seguridad" className='nav-link' id="basic-nav-dropdown">
                                        <div className='submenu-items'>
                                            <Link to='/newuser' className="dropdown-item nav-link"><FontAwesomeIcon icon={faUserPlus}/>&nbsp;Nuevo Usuario</Link>
                                            <Link to='/listadousuarios' className="dropdown-item nav-link"><FontAwesomeIcon icon={faList}/>&nbsp;Listado Usuarios</Link>
                                        </div>
                                    </NavDropdown>
                                </div>
                            </div>
                            <NavDropdown.Divider />
                            <Link to={`/miperfil/${user.id}`} className="nav-link"><FontAwesomeIcon icon={faUser}/>&nbsp;Mi Perfil</Link>
                            <NavDropdown.Divider />
                            <Link onClick={() => onRouteChange('signout')} to='/' className="nav-link"><FontAwesomeIcon icon={faSignOutAlt}/>&nbsp;Salir</Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
        );
    }
}