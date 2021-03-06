import React from 'react';
import PropTypes from 'prop-types';
import { TableItemInfo } from '../Table';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
const $ = require('jquery');
$.DataTable = require('datatables.net-bs4');
require('datatables.net-select-bs4');

class TableComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedItem: null
        };
        this.tableRef = React.createRef();
    }

    componentDidMount() {
        $(this.tableRef.current).DataTable({
            columns: [
                { data: 'id', title: 'ID' },
                { data: 'firstName', title: 'First Name' },
                { data: 'lastName', title: 'Last Name' },
                { data: 'email', title: 'E-Mail' },
                { data: 'phone', title: 'Phone' }
            ],
            data: this.props.data,
            pageLength: 50,
            pagingType: 'numbers',
            lengthChange: false,
            info: false,
            select: true,
            dom: "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
        }).search(this.props.searchQuery).draw();

        this.getDataTable().on('select', (e, dt, type, indexes) => {
            this.setState({
                selectedItem: this.getDataTable().rows(indexes).data().toArray()[0]
            });
        }).on('deselect', (e, dt, type, indexes) => {
            this.setState({
                selectedItem: null
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchQuery !== prevProps.searchQuery) {
            this.getDataTable().search(this.props.searchQuery).draw();
        }

        if (this.props.data.length !== prevProps.data.length) {
            this.getDataTable().clear();
            this.getDataTable().rows.add(this.props.data);
            this.getDataTable().draw();
        }        
    }

    getDataTable() {
        return $(this.tableRef.current).DataTable();
    }

    render() {
        return (
            <React.Fragment>
                <table className="table table-striped" ref={this.tableRef} />
                <TableItemInfo item={this.state.selectedItem} />
            </React.Fragment>
        );
    }
}

TableComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default TableComponent;