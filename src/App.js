import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  {Sidebar} from './Components/Sidebar/Sidebar';
import {Home} from './Components/Home/Home';
import {SignIn} from './Components/SignIn/SignIn';
import {NotFound} from './Components/NotFound/NotFound';
import './App.css';
import './Components/Sidebar/Sidebar.css';
import { Row, Col } from 'react-bootstrap';
import { MiPerfil } from './Pages/MiPerfil';
import {NewUser} from './Components/NewUser/NewUser';
import { Marca } from './Components/Marca/Marca';
import { Linea } from './Components/Linea/Linea';
import { Modelo } from './Components/Modelo/Modelo';
import { Categoria } from './Components/Categoria/Categoria';
import { Repuesto } from './Components/Repuesto/Repuesto';
import { ListadoRepuestos } from './Components/ListadoRepuestos/ListadoRepuestos';
import { EditRepuesto } from './Components/EditRepuesto/EditRepuesto';
import { VerRepuesto } from './Components/VerRepuesto/VerRepuesto';
import { ListadoMarcas } from './Components/ListadoMarcas/ListadoMarcas';
import { EditarMarca } from './Components/Marca/EditarMarca';
import { Tipo } from './Components/Tipo/Tipo';
import { ListadoTipos } from './Components/Tipo/ListadoTipos';
import { EditarTipo } from './Components/Tipo/EditarTipo';
import { ListadoUsuarios } from './Components/User/ListadoUsuarios';
import { EditarUsuario } from './Components/User/EditarUsuario';
import { UploadRepuesto } from './Components/Repuesto/UploadRepuesto';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    img: '',
    role: ''
  }
}

class App extends Component {

  constructor () {
    super()
    this.state = initialState
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
      if (token) {
          fetch('http://localhost:3001/login', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              }
          })
          .then(resp => resp.json())
          .then(data => {
              if (data && data.id) {
                  fetch(`http://localhost:3001/profile/${data.id}`, {
                          method: 'get',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': token
                          }
                      })
                      .then(resp => resp.json())
                      .then(user => {
                          if (user && user.email) {
                              this.loadUser(user)
                              this.onRouteChange('home');
                          }
                      })
              }
          })
          .catch(err => err);
      }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data._id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        img: data.img,
        role: data.role
      }
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      window.sessionStorage.removeItem('token');
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  handleProfile = () => {
    return <MiPerfil user={this.state.user}/>
  }

  render() {
    const {route, user} = this.state;
      return (
        <Row>
          { route === 'signin' 
          ? <SignIn 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}/>
          : <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row>
          <Sidebar onRouteChange={this.onRouteChange} user={user}/>
            <Switch>
                <Route path='/' exact strict component={Home} />
                <Route path='/repuesto' component={Repuesto} exact strict/>
                <Route path='/uploadrepuesto' component={UploadRepuesto} exact strict/>
                <Route path='/repuesto/editar/:id' component={EditRepuesto} exact strict/>
                <Route path='/listadorepuestos' component={ListadoRepuestos} exact strict/>
                <Route path='/ver/repuesto/:id' component={VerRepuesto} exact strict/>
                <Route path='/marca' component={Marca} exact strict/>
                <Route path='/marca/editar/:id' component={EditarMarca} exact strict/>
                <Route path='/listadomarcas' component={ListadoMarcas} exact strict/>
                <Route path='/linea' component={Linea} exact strict/>
                <Route path='/listadotipos' component={ListadoTipos} exact strict/>
                <Route path='/tipo/editar/:id' component={EditarTipo} exact strict/>
                <Route path='/tipo' component={Tipo} exact strict/>
                <Route path='/modelo' component={Modelo} exact strict/>
                <Route path='/categoria' component={Categoria} exact strict/>
                <Route path='/listadousuarios' component={ListadoUsuarios} exact strict/>
                <Route path='/usuario/editar/:id' component={EditarUsuario} exact strict/>
                <Route path='/miperfil/:id' exact strict><MiPerfil user={user}/></Route>
                <Route path='/newuser' component={NewUser} exact strict/>
                <Route component={NotFound}/>
            </Switch>
          </Row>

            </Col>
          }
        </Row>
      );
  }
}

export default App;
