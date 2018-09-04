import React from 'react';
import Search from './Search.jsx';
import BookList from './BookList.jsx';
import { exampleBooks } from './../../exapmleData.js';
import $ from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: exampleBooks,
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
        console.log(books);
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

  render() {
    return (
      <div>
        <h1>Javbrary</h1>
        <Search handleSearch={this.handleSearch.bind(this)}/>
        <BookList books={this.state.books}/>
      </div>
    )
  }
}