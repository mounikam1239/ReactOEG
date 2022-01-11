/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable @typescript-eslint/no-use-before-define */
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
import { Query } from 'urql';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const query = 'query {getMetrics}';

const animatedComponents = makeAnimated();

interface Metrics {
    getMetrics: string[]
}

interface Metric {
    fetching: boolean;
    data?: Metrics | undefined;
    error?: object | undefined;
}

export default (props: any) => {
    const { setMetrics } = props;
    const onChange = (metrics: any) => {
        setMetrics((metrics || []).map(({ value }: { value: string }) => value));
    };

    const queryFunction = () => {
        return ({ fetching, data, error }: Metric) => {
            if (fetching) {
                return <div>Loading...</div>;
            } else if (error) {
                return <div>Error </div>;
            } else if (!data) {
                return <div>NO Record found</div>;
            }

            const metrics = data.getMetrics.map((metric: string) => ({
                value: metric,
                label: metric,
            }));

            return (
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    onChange={onChange}
                    options={metrics} />
            );
        };
    }

    return (
        <Query query={query}>
            {queryFunction()}
        </Query>
    );
};