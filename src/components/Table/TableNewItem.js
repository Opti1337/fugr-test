import React from 'react';

class TableNewItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            },
            buttonIsDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'id') {
            value = Number(value);
        }

        this.setState(prevState => {
            let formData = {
                ...prevState.form,
                [name]: value
            };

            return {
                form: formData,
                buttonIsDisabled: !Object.values(formData).every(x => !!x)
            };
        });
    }

    handleClick(e) {
        this.props.onCreate(this.state.form);

        this.setState({
            form: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            },
            buttonIsDisabled: true
        });
    }

    render() {
        let formData = this.state.form;

        return (
            <React.Fragment>
                <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#tableNewItemModal">Новый пользователь</button>
                <div className="modal fade" id="tableNewItemModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Новый пользователь</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input type="number" step="1" min="1" className="form-control" name="id" value={formData.id} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" value={formData.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={this.handleChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={this.state.buttonIsDisabled} onClick={this.handleClick}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TableNewItem;