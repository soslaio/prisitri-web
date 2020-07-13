
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setUnit } from '../../actions';


export default function () {

    const dispatch = useDispatch();
    const company = useSelector(state => state.company);
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const unitChange = (value, opt) => {
        dispatch(setUnit({
            id: opt.value,
            name: opt.label
        }))
        setSelectedUnit(value);
        return value;
    }

    useEffect(() => {
        if (company) {
            console.log('unitselect useeffect')
            setUnits(company.units);
            setSelectedUnit(company.units[0].id);
        }
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
