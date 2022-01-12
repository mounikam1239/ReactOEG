/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
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

export default ({ setMetrics }: { setMetrics: (arg: string[]) => {} }) => {
    const onChange = (metrics: any) => {
        setMetrics((metrics || []).map(({ value }: { value: string }) => value));
    };

    const queryFunction = () => ({ fetching, data, error }: Metric) => {
        if (fetching) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error </div>;
        }
        if (!data) {
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

    return (
        <Query query={query}>
            {queryFunction()}
        </Query>
    );
};
