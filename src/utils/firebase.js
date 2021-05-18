import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCTni3KTzuwhS4lEaiRRD44h8_2ZNwZ7Cw",
    authDomain: "winged-hue-269010.firebaseapp.com",
    projectId: "winged-hue-269010",
    storageBucket: "winged-hue-269010.appspot.com",
    messagingSenderId: "595253944918",
    appId: "1:595253944918:web:b353d3bbb44f1f9a7dd1f7",
    measurementId: "G-W3B312HVFL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;