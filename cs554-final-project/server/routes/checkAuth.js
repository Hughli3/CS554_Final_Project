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
      const user = await admin.auth().verifyIdToken(req.headers.authorization)
      res.locals.userUid = user.uid
      // if not exist, generate one
      try {
        await userData.getUser(user.uid)
      } catch(e) {
        try {
            await userData.add(user.uid, user.email)
        } catch (e) {
            throw(e)
        }
      }
      next()
    } catch (e) {
      res.status(401).send('authentication fail')
    }
}

module.exports = checkAuth;