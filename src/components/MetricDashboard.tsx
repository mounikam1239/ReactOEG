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

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
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

    console.log('metrics: ', metrics)

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.selection}>
                    <MetricSelect setMetrics={setMetrics} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;