import React, { Component } from "react";
import "../Sidebar/Sidebar.css";
import "./MainContainer.css";
import {Chart} from '../Charts/Chart';
import { Row, Col, Card } from "react-bootstrap";
import { PieChart } from "../PieChart/PieChart";

export class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      totalPorCategoria: {}
    }
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    this.getTotalPorMarca(token);
    this.getTotalPorCategoria(token);
    // this.getTotal(token);
  }

  getTotalPorMarca = (token) => {
    fetch(`http://localhost:3001/productos/totalxmarca`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
          const repuestos = data.totalXMarca;
          let marcas = [];
          let cantidad = [];
          repuestos.forEach(repuesto => {
            marcas.push(repuesto._id.nombre);
            cantidad.push(repuesto.totalPorMarca);
          });
          return this.setState({
            chartData: {
              labels: marcas,
                      datasets: [
                          {
                              label: 'Marca',
                              data: cantidad,
                              backgroundColor: [
                                  'rgba(255,99,132,0.6)',
                                  'rgba(54,162,235,0.6)',
                                  'rgba(255,206,86,0.6)',
                                  'rgba(75,192,192,0.6)',
                                  'rgba(153,102,255,0.6)',
                                  'rgba(255,159,64,0.6)',
                                  'rgba(56,109,52,0.6)',
                                  'rgba(200,89,32,0.6)',
                                  'rgba(255,99,132,0.6)'
                              ]
                          }
                      ],
            }
          });
        })
        .catch(err => console.log(err));
  }

  getTotalPorCategoria = (token) => {
    fetch(`http://localhost:3001/productos/totalxcategoria`, {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'Authorization': token}
        })
        .then(resp => resp.json())
        .then(data => {
          const repuestos = data.totalXCategoria;
          let categorias = [];
          let cantidad = [];
          repuestos.forEach(repuesto => {
            categorias.push(repuesto._id.nombre);
            cantidad.push(repuesto.totalPorCategoria);
          });
          return this.setState({
            totalPorCategoria: {
              labels: categorias,
                      datasets: [
                          {
                              label: 'Categoría',
                              data: cantidad,
                              backgroundColor: [
                                  'rgba(255,99,132,0.6)',
                                  'rgba(54,162,235,0.6)',
                                  'rgba(255,206,86,0.6)',
                                  'rgba(75,192,192,0.6)',
                                  'rgba(153,102,255,0.6)',
                                  'rgba(255,159,64,0.6)',
                                  'rgba(56,109,52,0.6)',
                                  'rgba(200,89,32,0.6)',
                                  'rgba(255,99,132,0.6)'
                              ]
                          }
                      ],
            }
          });
        })
        .catch(err => console.log(err));
  }

  // getTotal = (token) => {
  //   fetch(`http://localhost:3001/productos/total`, {
  //           method: 'get',
  //           headers: {'Content-Type': 'application/json', 'Authorization': token}
  //       })
  //       .then(resp => resp.json())
  //       .then(data => {
  //         data.granTotal.forEach(item => {
  //           let totalTest = 0;
  //           totalTest += item.total;
  //         })
  //       })
  //       .catch(err => console.log(err));
  // }
  render() {
    const {chartData, totalPorCategoria} = this.state;
    return (
        <div id="page-content-wrapper">
            <h3>Total de inventario</h3>
            <div className='separador'></div>
            <Row>
              <Col className='card-padding cards-counteiner' xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card className='tarjeta'>
                  <Card.Body>
                    {
                      Object.keys(chartData).length &&
                    <Chart chartData={chartData} legendPosition='bottom' location='marca'/>
                    }
                  </Card.Body>
                </Card>
              </Col>
              <Col className='cards-counteiner' xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card className='tarjeta'>
                  <Card.Body>
                    {
                      Object.keys(totalPorCategoria).length &&
                    <PieChart chartData={totalPorCategoria} legendPosition='bottom' location='categoría'/>
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        </div>
    );
  }
}
