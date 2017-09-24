// @flow
import { initializeApp } from 'firebase';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAczxjZGX4uTW5WCDWdypweyy-Eg_ox9W0",
    authDomain: "fourth-case-153714.firebaseapp.com",
    databaseURL: "https://fourth-case-153714.firebaseio.com",
    projectId: "fourth-case-153714",
    storageBucket: "",
    messagingSenderId: "783308779677"
};

const firebase = initializeApp(FIREBASE_CONFIG, 'ecirgas');

const auth = firebase.database().app.auth();
const currentUserUid = auth.currentUser ? auth.currentUser.uid : 'ecirgas';
console.log(currentUserUid);

export default firebase.database().ref(`/${currentUserUid}`);
