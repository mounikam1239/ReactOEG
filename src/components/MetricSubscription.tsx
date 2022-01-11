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
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { getSubscriptionMeasurement } from '../feature/measurementSlice';

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
    const dispatch = useDispatch();
    const getMeasurement = useCallback(
        measurement => {
            dispatch(getSubscriptionMeasurement(measurement))
        },
        [dispatch],
    );
    const [subscriptionResponse] = useSubscription({ query: newMessages });
    const { data: subscriptionData } = subscriptionResponse;

    useEffect(
        () => {
            if (!subscriptionData) return;
            getMeasurement(subscriptionData.newMeasurement);
        },
        [subscriptionData, getMeasurement],
    );

    return null;
};