
import React, { useEffect, useState } from 'react';
import { getExtendedUserDetails, getCompanyDetails } from '../../services/api';


export default function () {

    
    const [recourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        (async () => {
            const companyDetails = await getCompanyDetails();
            setResourceTypes(companyDetails.resource_types);
        })();
    }, []);

    return (
        <div id="home">
            <div className="resource-types-list">
                {recourceTypes &&
                    <ul>{recourceTypes.map(recourceType => <a key={recourceType.id}
                        href={`http://localhost:3000/tipos/${recourceType.id}`}>
                        <li>{recourceType.name}</li>
                    </a>)}</ul>}
            </div>
        </div>
    );
}
