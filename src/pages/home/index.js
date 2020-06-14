
import React, { useEffect, useState } from 'react';

import * as config from '../../config';


export default function () {

    const [companies, setCompanies] = useState([]);
    const [recourceTypes, setResourceTypes] = useState([]);

    const fetchExtendedUserDetails = async () => {
        const url = `http://localhost:8000/extendedusers/${config.loggedExtendedUserId}/`;
        return fetch(url, config.fetchOptions)
            .then(data => data.json())
    }

    const fetchCompanyDetails = async () => {
        const url = `http://localhost:8000/companies/${config.selectedCompanyId}/`;
        return fetch(url, config.fetchOptions)
            .then(data => data.json())
    }

    useEffect(() => {
        (async () => {
            const userDetails = await fetchExtendedUserDetails();
            setCompanies(userDetails.companies);

            const companyDetails = await fetchCompanyDetails();
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
