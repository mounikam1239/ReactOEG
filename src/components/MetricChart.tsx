/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const colors = ['red', 'blue', 'black', 'orange', 'purple', 'green'];
const calcThirtyMinutesAgo = () => new Date().getTime() - 30 * 60 * 1000;
const thirtyMinutesAgo = calcThirtyMinutesAgo();

const measurementDataToChartFormat = (getMultipleMeasurements: any) => {
    const data = getMultipleMeasurements;
    if (data.length === 0) {
        return [];
    }
    const metricLength = data[0].measurements.length;
    const dataChartFormat = [];

    for (let index = 0; index < metricLength; index += 1) {
        const obj: any = { name: '' };
        for (let j = 0; j < data.length; j += 1) {
            obj[data[j].measurements[index].metric] = data[j].measurements[index].value;
            obj.name = data[j].measurements[index].at;
        }
        dataChartFormat.push(obj);
    }
    return dataChartFormat;
};

const MetricChart = () => {
    const dispatch = useDispatch();
    const measurements = useSelector(
        (state: RootState) => state.measurements.value,
    );
    const metrics = useSelector(
        (state: RootState) => state.metrics.value,
    );

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

    let dataList: any = [];
    if (measurements.length !== 0) {
        dataList = measurementDataToChartFormat(measurements);
    }
    if (metrics.length === 0) {
        return null;
    }
    if (dataList.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={dataList}
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
                        allowDataOverflow
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
                        ? metrics.map((a: string, index: number) => (
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
                        ))
                        : null}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricChart;
