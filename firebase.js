import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAWD_UKplMRxZl7m7DmeLygWSPWNT9bavM",
    authDomain: "cracker-feb5f.firebaseapp.com",
    projectId: "cracker-feb5f",
    storageBucket: "cracker-feb5f.appspot.com",
    messagingSenderId: "849423163709",
    appId: "1:849423163709:web:6dcc9e4a4d6cd22545e554",
    measurementId: "G-M7C723LX16"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Firebase 초기화


export default firebase;