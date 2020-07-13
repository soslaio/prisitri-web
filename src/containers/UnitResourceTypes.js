
import React from 'react';
import { connect } from 'react-redux';

import ResourceTypesList from '../components/ResourceTypesList/resourceTypesList';


const UnitResourceTypesList = ({ resourceTypes, ...props }) => {
    delete props.dispatch;
    return (
        <ResourceTypesList resourceTypes={resourceTypes} {...props} />
    )
};

const mapStateToProps = state => ({
    resourceTypes: state.unit?.resource_types,
});

export const UnitResourceTypesListContainer = connect(mapStateToProps)(UnitResourceTypesList);
