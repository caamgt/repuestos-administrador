import React, { Component } from 'react';
import { Pie} from 'react-chartjs-2';

export class PieChart extends Component {
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
                <Pie
                    data={chartData}
                    options={{ 
                        maintainAspectRatio: true,
                        title: {
                            display: this.props.displayTitle,
                            text: 'Total de repuestos por ' + this.props.location
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