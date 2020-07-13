
import React from 'react';
import { connect } from 'react-redux';

import { getUnitDetails } from '../actions';
import UnitSelect from '../components/UnitSelect/unitSelect';


const CompanyUnitSelect = ({ units, onChange, defaultValue = null, ...props }) => {
    if (units && units.length > 0) {
        defaultValue = units[0].id;
        onChange(defaultValue);
    }
    return (
        <UnitSelect units={units} onChange={onChange} defaultValue={defaultValue} {...props} />
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: id => dispatch(getUnitDetails(id))
    };
};

const mapStateToProps = state => ({
    units: state.company?.units,
});

export const CompanyUnitSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyUnitSelect);
