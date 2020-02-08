import React from 'react';
import { TableNewItem, TableSearch } from '../Table';

class TableToolbar extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-between align-items-center mb-3">
                <TableNewItem onCreate={formData => this.props.onCreate(formData)} />
                <TableSearch onSearch={query => this.props.onSearch(query)} />
            </div>
        );
    }
}

export default TableToolbar;