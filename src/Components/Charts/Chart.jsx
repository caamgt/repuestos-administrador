import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: this.props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        const {chartData} = this.state;
        return(
            <div className='chart'>
                <Bar
                    data={chartData}
                    options={{ 
                        maintainAspectRatio: true,
                        title: {
                            display: this.props.displayTitle,
                            text: 'Total de repuestos por ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        );
    }
}