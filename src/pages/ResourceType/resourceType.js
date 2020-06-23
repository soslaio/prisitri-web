
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getResourceTypeDetails } from '../../services/api';


export default function () {

    const { resourceTypeId } = useParams();
    const [resourceType, setResourceType] = useState(null);

    useEffect(() => {
        (async () => {
            const resourceTypeDetails = await getResourceTypeDetails(resourceTypeId);
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
