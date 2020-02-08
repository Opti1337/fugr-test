import React from 'react';
import { TableComponent, TableToolbar } from '../Table';
import Loader from '../Loader';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      data: [],
      searchQuery: ''
    };

    this.handleNewItemCreated = this.handleNewItemCreated.bind(this);
  }

  fetchData(type = 'small') {
    let url = '';

    switch (type) {
      case 'big':
        url = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
        break;
      default:
        url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        break;
    }

    this.setState({ isLoading: true });

    fetch(url).then(response => response.json()).then(result => {
      this.setState({
        isLoading: false,
        data: result
      });
    });
  }

  handleNewItemCreated(formData) {
    this.setState({
      data: [formData, ...this.state.data]
    });
  }

  render() {
    return (
      <div className="container py-5">
        <p className="mb-2">Выберите размер данных:</p>
        <div className="mb-5">
          <button className="btn btn-primary mr-1" onClick={this.fetchData.bind(this, 'small')}>Маленький</button>
          <button className="btn btn-primary" onClick={this.fetchData.bind(this, 'big')}>Большой</button>
        </div>
        {this.state.isLoading === true &&
          <Loader />
        }
        {this.state.isLoading === false &&
          <div>
            <TableToolbar onSearch={query => this.setState({ searchQuery: query })} onCreate={this.handleNewItemCreated} />
            <TableComponent data={this.state.data} searchQuery={this.state.searchQuery} />
          </div>
        }
      </div>
    );
  }
}

export default App;
