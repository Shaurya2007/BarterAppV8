import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDrBrwpnPdNK2xcSbSupQ9TQRxka8yffOE",
  authDomain: "barterapp-45e5e.firebaseapp.com",
  databaseURL: "https://barterapp-45e5e.firebaseio.com",
  projectId: "barterapp-45e5e",
  storageBucket: "barterapp-45e5e.appspot.com",
  messagingSenderId: "467622590555",
  appId: "1:467622590555:web:288bf650e9a94983c5677e"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database()