import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCQdCaLDWp2a4Ox8yenocQ8DtlIf1uDJPw",
    authDomain: "reactblogapp-70038.firebaseapp.com",
    projectId: "reactblogapp-70038",
    storageBucket: "reactblogapp-70038.appspot.com",
    messagingSenderId: "949515253758",
    appId: "1:949515253758:web:af67b2ce49bfdf593832af"
  };

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();

const auth=firebase.auth();

const storage=firebase.storage();

const provider= new firebase.auth.GoogleAuthProvider();

export {db,auth,provider,storage};