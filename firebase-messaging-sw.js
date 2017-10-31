importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '983990284433'
});
const messaging = firebase.messaging();
