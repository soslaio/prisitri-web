
import React, { useEffect, useState } from 'react';
import { Card, Space } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <h1>Tipo de recurso</h1>
            <div className="resource-types-list">
                {!companyId && <div>Selecione uma empresa</div>}
                {resourceTypes.length == 0 && <div>Não há tipos cadastrados para a empresa selecionada</div>}
                {resourceTypes &&
                    <Space direction="vertical">
                        {resourceTypes.map(resourceType => <Link to={`/tipos/${resourceType.id}`}>
                            <Card style={{ width: 300 }} key={resourceType.id}>
                                <p>{resourceType.name}</p>
                            </Card>
                        </Link>
                        )}
                    </Space>
                }
            </div>
        </div>
    );
}
