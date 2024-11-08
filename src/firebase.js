// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlAXE7IL8Z0v0JMRmAbWI03EDeUDRfI6w',
  authDomain: 'metadataforttcs.firebaseapp.com',
  projectId: 'metadataforttcs',
  storageBucket: 'metadataforttcs.appspot.com',
  messagingSenderId: '502636296776',
  appId: '1:502636296776:web:fb9261210e697af0e5767d',
  measurementId: 'G-V7J3SC3YSN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
