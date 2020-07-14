import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "XXXX-XXXX-XXXX",
  authDomain: "XXXX-app-web.firebaseapp.com",
  databaseURL: "https://XXXX-app-web.firebaseio.com",
  projectId: "XXXX-app-web",
  storageBucket: "XXXX-app-web.appspot.com",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXX:web:XXXXXX",
  measurementId: "G-XXXXXXX"
};

export default !firebase.apps.length
  ? { FireBaseContext : firebase.initializeApp(firebaseConfig).firestore(), Token: localStorage.getItem('token') }
  : { FireBaseContext : firebase.app().firestore(), Token: localStorage.getItem('token') }
