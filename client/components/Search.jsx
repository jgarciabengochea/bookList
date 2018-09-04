import React from 'react';
import _ from 'lodash';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleSearchQuery = _.debounce(this.handleSearchQuery.bind(this), 500);
  }
  
  handleSearchQuery(query) {
    this.setState({query});
  }

  render() {
    return (
      <div className="search">
        <form >
          <input type="text" onChange={(e) => {e.persist(); e.preventDefault(); this.handleSearchQuery(e.target.value)}}/>
        </form>
        <button onClick={() => {this.props.handleSearch(this.state.query)}}>Search!</button>
      </div>
    )
  }
}