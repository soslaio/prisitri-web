
import React, { useState } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';


export default function () {

    // const dispatch = useDispatch();
    const company = useSelector(state => state.company);
    const [selectedUnit, setSelectedUnit] = useState(null);

    // const [units, setUnits] = useState([]);
    // const [loading, setLoading] = useState(false);

    const unitChange = value => {
        setSelectedUnit(value);
        return value;
    }

    // useEffect(() => {
    //     //if (isAuthenticated()) {
    //     // if (!user) {
    //     //     setLoading(true);
    //     //     dispatch(getUserDetails(getUsername()))
    //     //         .catch(() => message.error('Não foi possível carregar os dados do usuário'))
    //     //         .finally(() => setLoading(false));
    //     // }
    //     //if (user) {
    //     // setUnits(companies);
    //     // setSelectedUnit(units[0]);
    //     // setSelectedUnit(units[0].id);
    //     //console.log(units[0]);
    //     // const _companies = user.extended_user.companies;
    //     // if (_companies.length > 0) {
    //     //     setCompanies(_companies);
    //     //     dispatch(setCompanyId(_companies[0].id));
    //     //     setSelectedCompany(_companies[0].id);
    //     // }
    //     //}
    //     //}
    //     // eslint-disable-next-line
    // }, [user]);

    return (
        <React.Fragment>
            {company?.units &&
                <Select
                    value={selectedUnit}
                    style={{ width: 200 }}
                    size="small"
                    onChange={unitChange}
                    options={company?.units?.map(unit => {
                        return {
                            value: unit.id,
                            label: unit.name
                        }
                    })}
                >
                </Select>
            }
        </React.Fragment>
    );
}
