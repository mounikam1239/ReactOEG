/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import MetricSelect from './MetricSelect';
import { addMetrics } from '../feature/metricSlice';
import { RootState } from '../app/store';
import Metric from './Metric';
import MetricSubscription from './MetricSubscription';
import MetricChart from './MetricChart';

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
        margin: 15,
    },
    header: {
        display: 'flex',
        width: '100%',
    },
    metrics: {
        width: '60%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    selection: {
        width: '40%',
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const setMetrics = (metrics: any) => dispatch(addMetrics(metrics));
    const metrics = useSelector(
        (state: RootState) => state.metrics.value,
    );

    return (
        <div className={classes.wrapper}>
            <MetricSubscription />
            <div className={classes.header}>
                <div className={classes.metrics}>
                    {metrics.map((m, i) => (
                        <Metric metric={m} key={i} />
                    ))}
                </div>
                <div className={classes.selection}>
                    <MetricSelect setMetrics={setMetrics} />
                </div>
            </div>
            <MetricChart />
        </div>
    );
};

export default Dashboard;