
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

import { getCompanyDetails } from '../../services/api';


export default function () {

    // const [resourceTypes, setResourceTypes] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const companyDetails = await getCompanyDetails();
    //         setResourceTypes(companyDetails.resource_types);
    //     })();
    // }, []);

    return (
        <div>Teste</div>
    );

    // return (
    //     <div id="home">
    //         <div className="resource-types-list">
    //             {resourceTypes &&
    //                 resourceTypes.map(resourceType => <Card style={{ width: 300 }} key={resourceType.id}>
    //                     <p>{resourceType.name}</p>
    //                 </Card>)}
    //         </div>
    //     </div>
    // );
}
