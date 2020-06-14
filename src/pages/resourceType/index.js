
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as config from '../../config';


export default function () {

    const { uuid } = useParams();
    const [resourceType, setResourceType] = useState(null);

    const fetchResourceTypeDetails = async () => {
        const url = `http://localhost:8000/resourcetypes/${uuid}/`;
        return fetch(url, config.fetchOptions)
            .then(data => data.json())
    }

    useEffect(() => {
        (async () => {
            const resourceTypeDetails = await fetchResourceTypeDetails();
            setResourceType(resourceTypeDetails)
        })();
    }, []);

    return (
        <div id="resourceType">
            {resourceType && <div>
                <h1>{resourceType.name}</h1>
                <ul>
                    {resourceType.resources.map(resource => <a key={resource.id}
                        href={`http://localhost:3000/recursos/${resource.id}`}>
                        <li>{resource.name}</li>
                    </a>)}
                </ul>
            </div>}
        </div>
    );
}
