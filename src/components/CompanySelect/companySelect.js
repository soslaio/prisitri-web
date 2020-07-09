
import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getUserDetails, setCompanyId } from '../../actions';
import { getUsername, isAuthenticated } from '../../services/auth';


export default function () {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [loading, setLoading] = useState(false);

    const companyChange = (value, option) => {
        dispatch(setCompanyId(value));
        setSelectedCompany(value);
        return value;
    }

    useEffect(() => {
        if (isAuthenticated()) {
            if (!user) {
                setLoading(true);
                dispatch(getUserDetails(getUsername()))
                    .catch(() => message.error('Não foi possível carregar os dados do usuário'))
                    .finally(() => setLoading(false));
            }

            if (user) {
                const _companies = user.extended_user.companies;
                if(_companies.length > 0){
                    setCompanies(_companies);
                    dispatch(setCompanyId(_companies[0].id));
                    setSelectedCompany(_companies[0].id);
                }
            }
        }  // eslint-disable-next-line
    }, [user]);

    return (
        <React.Fragment>
            {user &&
                <Select
                    value={selectedCompany}
                    style={{ width: 200 }}
                    size="small"
                    loading={loading}
                    onChange={companyChange}
                    options={companies?.map(company => {
                        return {
                            value: company.id,
                            label: company.name
                        }
                    })}
                >
                </Select>
            }
        </React.Fragment>
    );
}
