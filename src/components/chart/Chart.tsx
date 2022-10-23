import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import './Chart.scss'

type chartProps = {
    date: string,
    value: number,
}

interface ChartComponentProps {
    dataSets: {
        label: string;
        data: chartProps[];
    }[]
}

const ChartComponent: React.FC<ChartComponentProps> = ({dataSets}) => {

    const chartData = dataSets.map((dataSet) => ({
        label: dataSet.label,
        data: dataSet.data
    }))

    const primaryAxis: AxisOptions<chartProps> = React.useMemo(
        (): AxisOptions<chartProps> => ({
            getValue: (datum: { date: string }) => datum.date,
        }),
        []
      )
    
      const secondaryAxes: AxisOptions<chartProps>[] = React.useMemo(
        (): AxisOptions<chartProps>[] => [
          {
            getValue: datum => datum.value,
            elementType: 'line',
            show: false,
          },

        ],
        []
      )

    return (
        <div className='chartContainer'>
            <Chart
                options={{
                    data: chartData,
                    primaryAxis,
                    secondaryAxes,
                    tooltip: false,
                }}
            />
        </div>
    )
};

export default ChartComponent;
