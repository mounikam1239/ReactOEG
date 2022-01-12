/* eslint-disable @typescript-eslint/indent */
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
            dispatch(getSubscriptionMeasurement(measurement));
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
