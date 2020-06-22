
import React, { useEffect, useState } from 'react';
import { getExtendedUserDetails, getCompanyDetails } from '../../services/api';


export default function () {

    const [companies, setCompanies] = useState([]);
    const [recourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        (async () => {
            const userDetails = await getExtendedUserDetails();
            setCompanies(userDetails.companies);

            const companyDetails = await getCompanyDetails();
            setResourceTypes(companyDetails.resource_types);
        })();
    }, []);

    return (
        <div id="home">
            <div className="companies-list">
                {companies &&
                    <ul>{companies.map(company => <li key={company.id}>
                        {company.name}
                    </li>)}</ul>}
            </div>
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
