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
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useStyles = makeStyles({
    card: {
        width: '40%',
        marginRight: '1rem',
        marginBottom: '1rem',
    },
});

export default ({ metric }: { metric: string }) => {
    const classes = useStyles();
    const measurements = useSelector(
        (state: RootState) => state.measurements.value,
    );

    const matchedMeasurements = measurements.find(item => item.metric === metric);
    let value = 0;
    if (matchedMeasurements) {
        value = matchedMeasurements.measurements[matchedMeasurements.measurements.length - 1].value;
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6">{metric}</Typography>
                <Typography variant="h3">{value}</Typography>
            </CardContent>
        </Card>
    );
};