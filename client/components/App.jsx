import React from 'react';
import Search from './Search.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  render() {
    return (
      <div>
        <h1>Javbrary</h1>
        <Search />
      </div>
    )
  }
}