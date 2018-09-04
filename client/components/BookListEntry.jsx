import React from 'react';

export default class BookListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      author: this.props.book.author,
      description: this.props.book.description,
      image: this.props.book.image,
      saved: this.props.book.saved
    }
  }
  // awww yiss we are in mutha fuckin business
  componentWillReceiveProps(nextProps){
    if(nextProps.book.title !== this.props.book.title){
      this.setState({
        title: nextProps.book.title,
        author: nextProps.book.author,
        description: nextProps.book.description,
        image: nextProps.book.image,
        saved: nextProps.book.saved
      });
    }
  }

  handleClickSaveButton() {
    this.setState({
      saved: !this.state.saved
    }, () => {
      let bookData = {
        title: this.state.title,
        author: this.state.author,
        image: this.state.image
      }
      if (this.state.saved) {
        this.props.handleSaveBookToLibrary(bookData);
      } else {
        this.props.handleDeleteBookFromLibrary(bookData);
      }
    });
  }

  render() {
    let savedStyle = {
      color: this.state.saved ? 'green' : 'grey'
    };
    let savedText = this.state.saved ? 'Saved!' : 'Save to Library';
    return (
      <div>
        <br/>
        <img src={this.state.image}/>
        <h1>{this.state.title}</h1>
        <h3>{this.state.author}</h3>
        <a href="#" style={savedStyle} onClick={() => this.handleClickSaveButton()}>{savedText}</a>
        <br/>
        <div>Description: {this.state.description}</div>
        <br/>
      </div>
    );
  }
}