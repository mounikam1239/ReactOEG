/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useQuery } from 'urql';
import { RootState } from '../app/store';
import { addMeasurement } from '../feature/measurementSlice';
// import Tooltip from './Tooltip';

const moment = require('moment');

function formatXAxis(tickItem: string) {
    tickItem = moment(parseInt(tickItem, 10)).format('LT');
    return tickItem;
}

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

const colors = ['red', 'blue', 'black', 'orange', 'purple', 'green']
const calcThirtyMinutesAgo = () => new Date().getTime() - 30 * 60 * 1000;
const thirtyMinutesAgo = calcThirtyMinutesAgo();

const measurementDataToChartFormat = (getMultipleMeasurements: any) => {
    const data = getMultipleMeasurements;
    if (data.length === 0) {
        return [];
    }
    const metric_length = data[0].measurements.length;
    const data_chart_format = [];

    for (let index = 0; index < metric_length; index += 1) {
        const obj: any = {};
        for (let j = 0; j < data.length; j += 1) {
            obj[data[j].measurements[index].metric] =
                data[j].measurements[index].value;
            obj['name'] = data[j].measurements[index].at;
        }
        data_chart_format.push(obj);
    }
    return data_chart_format;
};

const MetricChart = () => {
    const dispatch = useDispatch();
    const measurements = useSelector(
        (state: RootState) => state.measurements.value,
    );
    const metrics = useSelector(
        (state: RootState) => state.metrics.value,
    );
    const [state, setState] = React.useState({
        Tooltip: [],
    });

    const [queryResult] = useQuery(
        {
            query,
            variables: {
                input: metrics.map(metricName => ({
                    metricName,
                    after: thirtyMinutesAgo,
                })),
            },
        },
    );
    useEffect(
        () => {
            const { data } = queryResult;
            if (!data) return;
            dispatch(addMeasurement(data.getMultipleMeasurements || []));
        },
        [queryResult, dispatch],
    );

    let data_list: any = [];
    if (measurements.length !== 0) {
        data_list = measurementDataToChartFormat(measurements);
    }
    if (metrics.length === 0) {
        return null;
    }
    if (data_list.length === 0) {
        return <div>Loading...</div>;
    }

    const displayTooltip = (name: any) => (e: any) => {
        setState({ ...state, [name]: e });
    };
    const hideTooltip = (name: any) => () => {
        setState({ ...state, [name]: [] })
    }

    return (
        <div>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={data_list}
                    onMouseMove={displayTooltip('Tooltip')}
                    onMouseLeave={hideTooltip('Tooltip')}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        allowDataOverflow={true}
                        tickFormatter={formatXAxis}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        scale="linear"
                        padding={{ top: 10, bottom: 10 }}
                        tickCount={10}
                    />
                    <Legend />

                    {metrics
                        ? metrics.map((a: any, index: number) => {
                            return (
                                <Line
                                    type="monotone"
                                    key={`${a}`}
                                    dataKey={`${a}`}
                                    strokeOpacity="1"
                                    stroke={colors[index]}
                                    activeDot={{ r: 8 }}
                                    isAnimationActive={false}
                                    dot={false}
                                />
                            );
                        })
                        : null}
                </LineChart>
            </ResponsiveContainer>
            {/* {!state.Tooltip ? null : <Tooltip TooltipInfo={state.Tooltip} />} */}
        </div>
    );
};

export default MetricChart;