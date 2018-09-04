import React from 'react';
import BookListEntry from './BookListEntry.jsx';

const BookList = ({books, handleSaveBookToLibrary, handleDeleteBookFromLibrary}) => (
  <div className="bookList">
    {_.map(books, (book) => {
      return <BookListEntry key={book.id} book={book} handleSaveBookToLibrary={handleSaveBookToLibrary} handleDeleteBookFromLibrary={handleDeleteBookFromLibrary}/>
    })}
  </div>
);

export default BookList;