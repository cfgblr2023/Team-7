// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'sensing-locals.firebaseapp.com',
  projectId: 'sensing-locals',
  storageBucket: 'sensing-locals.appspot.com',
  messagingSenderId: '230314708430',
  appId: '1:230314708430:web:63ac77d9bdf4890efcaf9f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (userType) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    if (res) {
        console.log("herer")
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
          userType: userType
        });
      }
    }
    window.location.reload();
  } catch (err) {
    console.error(err);
    
    // alert(err.message);
  }
};
export const logout = () => {
  signOut(auth);
};

export default app;
