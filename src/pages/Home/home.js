
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';

import { getCompanyDetails } from '../../services/api';


export default function () {

    const companyId = useSelector(state => state.companyId);
    const [resourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        if (companyId) {
            getCompanyDetails(companyId)
                .then(data => setResourceTypes(data.resource_types));
        }
    }, [companyId]);

    return (
        <div id="home">
            <div className="resource-types-list">
                {resourceTypes &&
                    resourceTypes.map(resourceType => <Card style={{ width: 300 }} key={resourceType.id}>
                        <p>{resourceType.name}</p>
                    </Card>)}
            </div>
        </div>
    );
}
