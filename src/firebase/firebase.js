import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
const firebaseConfig = {
    apiKey: "AIzaSyBs22oso79-0CquhJ9hYFEFy7MM-HRhhcY",
    authDomain: "vue-eich.firebaseapp.com",
    projectId: "vue-eich",
    storageBucket: "vue-eich.appspot.com",
    messagingSenderId: "301788977516",
    appId: "1:301788977516:web:1448959492a2bacc743b49"
  };

if (firebase.apps.length === 0) {
  console.log("WII")
  firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
