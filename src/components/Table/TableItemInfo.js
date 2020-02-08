import React from 'react';
import PropTypes from 'prop-types';

class TableItemInfo extends React.Component {
    render() {
        let item = this.props.item;

        if (item === null) {
            return null;
        }

        return (
            <div className="card mt-4">
                <div className="card-body">
                    Выбран пользователь <b>{item.firstName} {item.lastName}</b><br />
                    Описание:<br />
                    <textarea className="form-control" value={item.description || '-'} readOnly />
                    Адрес проживания: <b>{item.address && item.address.streetAddress ? item.address.streetAddress : '-'}</b><br />
                    Город: <b>{item.address && item.address.city ? item.address.city : '-'}</b><br />
                    Провинция/штат: <b>{item.address && item.address.state ? item.address.state : '-'}</b><br />
                    Индекс: <b>{item.address && item.address.zip ? item.address.zip : '-'}</b>
                </div>
            </div>
        );
    }
}

TableItemInfo.propTypes = {
    item: PropTypes.object
}

export default TableItemInfo;