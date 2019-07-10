import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAyaWEBlwQUAaXE5TmjgoFWnXisnSaHA90",
        authDomain: "markdown-stock.firebaseapp.com",
        databaseURL: "https://markdown-stock.firebaseio.com",
        projectId: "markdown-stock",
        storageBucket: "markdown-stock.appspot.com",
        messagingSenderId: "sender-id", 
    })
}

export default firebase