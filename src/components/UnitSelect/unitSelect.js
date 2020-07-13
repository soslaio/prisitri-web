
import React from 'react';
import { Select } from 'antd';


export default function ({ units, ...props }) {
    return (
        <React.Fragment>
            {units &&
                <Select
                    {...props}
                    style={{ width: 200 }}
                    size="small"
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
