const admin = require('firebase-admin')
const serviceAccount = require("../config/firebase-key.json");
const data = require('../data');
const userData = data.user;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://finalproject-e61f4.firebaseio.com"
});

const checkAuth = async (req, res, next) => {
    try {
      await admin.auth().verifyIdToken(req.body.auth)
      let user = await admin.auth().getUser(req.body.uid)
      if (user.uid != req.body.uid) throw "unauthorized"
      // if not exist, generate one
      try {
        await userData.getUser(user.uid)
      } catch(e) {
        await userData.add(user.uid)
      }
      next()
    } catch (e) {
      res.status(403).send('unauthorized')
    }
}

module.exports = checkAuth;