import { initializeApp } from 'firebase/app';
import { initializeAuth, reactNativeLocalPersistence } from "firebase/auth";
import firebaseCredentials from "./firebaseCreds";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Example Firebase credentials
// const firebaseCredentials = {
//     apiKey: 'api-key',
//     authDomain: 'project-id.firebaseapp.com',
//     databaseURL: 'https://project-id.firebaseio.com',
//     projectId: 'project-id',
//     storageBucket: 'project-id.appspot.com',
//     messagingSenderId: 'sender-id',
//     appId: 'app-id',
//     measurementId: 'G-measurement-id',
// };

const app = initializeApp(firebaseCredentials);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// initializeAuth(app,
//     {
//         persistence: reactNativeLocalPersistence
//     }
// )

export default app;