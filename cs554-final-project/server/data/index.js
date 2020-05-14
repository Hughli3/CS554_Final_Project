const userData = require('./user');
const propertyData = require('./property');
const imgData = require('./img');
// const watchlistData = require('./watchlist');

module.exports = {
    property: propertyData,
    user: userData,
    image: imgData,
    // watchList: watchlistData,
};
