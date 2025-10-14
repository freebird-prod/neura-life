import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcACA_EAbs_X1kYTUiIpxqujJtPh7teCg",
  authDomain: "dharun-kumar-apps.firebaseapp.com",
  projectId: "dharun-kumar-apps",
  storageBucket: "dharun-kumar-apps.firebasestorage.app",
  messagingSenderId: "303638793489",
  appId: "1:303638793489:web:0f81563ed1df6efba590b0",
  measurementId: "G-GLXVP6D63F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
