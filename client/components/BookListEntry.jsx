import React from 'react';

export default class BookListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    }
    this.title = this.props.book.volumeInfo.title;
    this.author = this.props.book.volumeInfo.authors[0];
    this.description = this.props.book.volumeInfo.description;
    this.thumbnail = this.props.book.volumeInfo.imageLinks.smallThumbnail;
  }
  
  handleClickSaveButton() {
    this.setState({
      saved: !this.state.saved
    });
  }

  render() {
    let savedStyle = {
      color: this.state.saved ? 'green' : 'grey'
    };
    let savedText = this.state.saved ? 'Saved!' : 'Save to Library';
    return (
      <div>
        <h1>{this.title}</h1>
        <a href="#" style={savedStyle} onClick={() => this.handleClickSaveButton()}>{savedText}</a>
        <h3>{this.author}</h3>
        <div>Description: {this.description}</div>
        <img src={this.thumbnail}/>
      </div>
    );
  }
}