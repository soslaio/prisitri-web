
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';


export default function () {

    const company = useSelector(state => state.company);
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const unitChange = value => {
        setSelectedUnit(value);
        return value;
    }

    useEffect(() => {
        if (company) {
            setUnits(company.units)
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
