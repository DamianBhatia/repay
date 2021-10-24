import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4P9e56aeNdjiuJ0Z-sy5bZetR6C5ADzo",
    authDomain: "repay-916b4.firebaseapp.com",
    projectId: "repay-916b4",
    storageBucket: "repay-916b4.appspot.com",
    messagingSenderId: "332540184495",
    appId: "1:332540184495:web:2237dae8d5deb507e8d15a"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, auth };