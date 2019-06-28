import React, { Component } from 'react';
import { Card, Modal, Button, Form} from 'react-bootstrap';
import './Perfil.css';
import { EditBtn } from '../EditBtn/EditBtn';

export class Perfil extends Component {
    constructor (props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            userImgUrl: '',
            show: false,
            newUserImg: '',
            password: ''
        }
    }

    mostrarImg = () => {
        const token = window.sessionStorage.getItem('token');
        const userImg = this.props.user.img;
        fetch(`http://localhost:3001/image/users/${userImg}?token=${token}`, {
            method: 'get'
        })
        .then(imagen => {
            this.setState({
                userImgUrl: imagen.url
            })
        })
    }

    onChangePassword = () => {
        const userId = this.props.user.id;
        fetch(`http://localhost:3001/user/${userId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('token')},
            body: JSON.stringify({
                password: this.state.password
            })
        })
            .then(resp => {
                if (resp.status === 200 || resp.status === 304) {
                    return resp;
                }
            })
            .catch(err => console.log(err))
    }

    onUploadImg = () => {
        const data = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        data.append("archivo", imagedata);
        const userId = this.props.user.id;
        fetch(`http://localhost:3001/upload/users/${userId}`, {
            headers: {'Authorization': window.sessionStorage.getItem('token')},
            method: 'put',
            body: data
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                return resp;
            }
        })
        .catch( err => console.log(err));
    }

    handleInput = (event) => {
        switch(event.target.name) {
            case 'image-upload':
                this.setState({newUserImg: event.target.value})
                break;
            default:
                return;
        }
    }

    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    componentDidMount() {
        this.mostrarImg()
    }

    onInputChange = (e) => {
        return this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {userImgUrl} = this.state;
        const {nombre, email, apellido} = this.props.user;
        return(
            <div xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }} xl={{ span: 4, offset: 3 }} className='pt-2 animated fadeIn'>
                <Card className='perfil-container'>
                    <div className='perfil-image-main-container'>
                        <div className='perfilImgContainer'>
                            <Card.Img src={userImgUrl} alt='perfil'/>
                        </div>
                        <div onClick={this.handleShow} className='EditPerfilImg-btn-img pointer'>
                            <img src="https://autosparepartsindia.com/uploads/uploads/images/icon/edit-512.png" alt=""/>
                        </div>
                    </div>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center', fontSize: '1.6rem'}}>{nombre}&nbsp;{apellido}&nbsp;<EditBtn user={this.props.user}/></Card.Title>
                        <p><strong>Usuario:</strong>&nbsp;{email}</p>
                        <Form>
                        <Form.Group controlId="password">
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control onChange={this.onInputChange} type="password" placeholder="Contraseña" autoComplete='new-password' ng-hide="true"/>
                        </Form.Group>
                        <Button onClick={() => this.onChangePassword()} variant="primary" type='submit'>
                            Guardar
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Buscar nuevo imagen</Form.Label>
                            <Form.Control 
                                name="image-upload"
                                type="file" 
                                placeholder={nombre} 
                                onChange={this.handleInput}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            onClick={() => this.onUploadImg()}
                        >
                            Guardar
                        </Button>
                    </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
