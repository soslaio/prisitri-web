
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar } from 'antd';
import { useParams } from 'react-router';

import * as config from '../../config';


export default function () {
    const defaultDate = moment('2020-06-14');

    const { uuid } = useParams();
    const [resource, setResource] = useState(null);
    const [value, setValue] = useState(defaultDate);
    const [avaiableDates, setAvaiableDates] = useState(['2020-06-17', '2020-06-24', '2020-06-30'])

    const disableDate = (currentDate) => {
        const fCurrentDate = currentDate.format('YYYY-MM-DD');
        return !avaiableDates.includes(fCurrentDate);
    };

    const fetchResourceDetails = async () => {
        const url = `http://localhost:8000/resources/${uuid}/`;
        return fetch(url, config.fetchOptions)
            .then(data => data.json())
    }

    useEffect(() => {
        (async () => {
            const resourceDetails = await fetchResourceDetails();
            setResource(resourceDetails)
        })();
    }, []);

    return (
        <div id="resource">
            {resource && <div>
                <h1>{resource.name}</h1>
                <Calendar value={value} disabledDate={disableDate} />
            </div>}
        </div>
    );
}
