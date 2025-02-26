import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
//import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "react-saas-ai-chatbot.firebaseapp.com",
    projectId: "react-saas-ai-chatbot",
    storageBucket: "react-saas-ai-chatbot.firebasestorage.app",
    messagingSenderId: "459971761628",
    appId: "1:459971761628:web:4aa24e5ef5e676d2342b19",
    //measurementId: "G-9VEKDWSSCD"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
//const analytics = getAnalytics(app)