import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCeeWSU5tjylkAJxGbCImUhOt2l9hiDGDY",
    authDomain: "game-boulette.firebaseapp.com",
    databaseURL: "https://game-boulette.firebaseio.com",
    projectId: "game-boulette",
    storageBucket: "game-boulette.appspot.com",
    messagingSenderId: "610043854052",
    appId: "1:610043854052:web:ffec1ae248547ab21f40f1"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseStore = firebase.firestore();