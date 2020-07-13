
import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getUnitDetails } from '../../actions';


export default function () {

    const dispatch = useDispatch();
    const company = useSelector(state => state.company);
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const unitChange = value => {
        setSelectedUnit(value);
        dispatch(getUnitDetails(value))
            .catch(() => message.error('Não foi possível carregar os dados da unidade'));
        return value;
    }

    useEffect(() => {
        if (company) {
            setUnits(company.units);
            const { id } = company.units[0];
            setSelectedUnit(id);
            dispatch(getUnitDetails(id))
                .catch(() => message.error('Não foi possível carregar os dados da unidade'));
        }
        // eslint-disable-next-line
    }, [company]);

    return (
        <React.Fragment>
            {units &&
                <Select
                    value={selectedUnit}
                    style={{ width: 200 }}
                    size="small"
                    onChange={unitChange}
                    options={units?.map(unit => {
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
