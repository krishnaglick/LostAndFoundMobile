
/* globals navigator */

const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyACXEK0DMGmTzS2ipYKaI768LtN8U4tJDk",
  authDomain: "lost-and-found-276f6.firebaseapp.com",
  databaseURL: "https://lost-and-found-276f6.firebaseio.com",
  storageBucket: "lost-and-found-276f6.appspot.com",
  messagingSenderId: "880587876831"
});
const rootRef = firebase.database().ref();
const foundItems = rootRef.child('foundItems');

exports.getLocation = async function() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

exports.submitLocation = async function(location) {
  return foundItems.push(location);
};

exports.getLocations = async function() {
  return new Promise((res) => {
    foundItems.once('value', (data) => {
      const vals = [];
      data = data.val();
      Object.keys(data).forEach((key) => vals.push(data[key]));
      res(vals);
    });
  });
};
