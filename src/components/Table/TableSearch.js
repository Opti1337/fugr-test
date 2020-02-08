import React from 'react';

class TableSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSearch(this.state.query);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group input-group-sm">
                    <input type="text" className="form-control" value={this.state.query} onChange={e => this.setState({query: e.target.value})} />
                    <div className="input-group-append">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default TableSearch;