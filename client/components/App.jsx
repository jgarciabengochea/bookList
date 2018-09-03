import React from 'react';

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
        <h1>This is it</h1>
      </div>
    )
  }
}