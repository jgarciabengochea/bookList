import React from 'react';
import Search from './Search.jsx';
import BookList from './BookList.jsx';
import $ from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      library: []
    }
  }

  handleSearch(string) {
    $.ajax({
      url: 'http://localhost:3000/books',
      method: 'POST',
      data: {q: string}
    })
    .done((books) => {
      this.setState({books});
    })
    .fail((err) => console.log(err));
  }
  
  handleSaveBookToLibrary(bookData) {
    $.ajax({
      url: 'http://localhost:3000/library',
      method: 'POST',
      data: {data: bookData}
    })
    .done(() => {
      alert('Saved to your library. Please click show library to see saved books.')
    })
    .fail((err) => console.log(err));
  }
  
  handleDeleteBookFromLibrary(bookData) {
    $.ajax({
      url: 'http://localhost:3000/library',
      method: 'DELETE',
      data: {data: bookData}
    })
    .done(() => {
      alert('Deleted from your library');
    })
    .fail((err) => console.log(err));
  }
  
  componentDidMount() {
    this.handleSearch('Dan Brown');
  }

  render() {
    return (
      <div>
        <h1>Javbrary</h1>
        <Search handleSearch={this.handleSearch.bind(this)}/>
        <BookList books={this.state.books} handleSaveBookToLibrary={this.handleSaveBookToLibrary} handleDeleteBookFromLibrary={this.handleDeleteBookFromLibrary}/>
      </div>
    )
  }
}