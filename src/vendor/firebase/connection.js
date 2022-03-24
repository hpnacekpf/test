// import firebase from 'firebase'
import { firebaseConfig } from 'constants'
import { isServer } from 'utils/client-api'

const firebase = require('firebase')

let db = null
let now = null

if (!isServer) {
  firebase.initializeApp(firebaseConfig)
  db = firebase.database()
  now = firebase.database.ServerValue.TIMESTAMP
}

export { db, now }
