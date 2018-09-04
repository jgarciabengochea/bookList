import React from 'react';
import BookListEntry from './BookListEntry.jsx';

const BookList = ({books}) => (
  <div className="bookList">
    {_.map(books, (book) => {
      return <BookListEntry key={book.id} book={book}/>
    })}
  </div>
);

export default BookList;