const functions = require('firebase-functions');
const admin = require('../utils/firebase');


exports.getPosts = functions.https.onRequest((req, res) => {
  admin.firestore().Collection('posts').get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
});