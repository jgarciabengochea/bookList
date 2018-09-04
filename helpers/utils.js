const _ = require('lodash');

module.exports.utils = {
  formatData: (rawBookData) => {
    return _.map(rawBookData, (item) => {
      let data = {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'N/A',
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks.smallThumbnail,
        saved: false
      }
      return data;
    });
  }
}