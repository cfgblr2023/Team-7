// Import the functions you need from the SDKs you need
import axios from 'axios';
import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';

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
      // console.log('herer');
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
          userType: userType
        });
        if(userType=="Volunterr?"){
        axios.post('/register_user', {
          email: user.email,  
          name: user.displayName
        });
      }else {
        axios.post('/register_user', {
          email: user.email,
          admin: userType=="Admin?"?true:false,
          name: user.displayName
        });
      }
      }
    }
    // window.location.reload();
  } catch (err) {
    console.error(err);

    // alert(err.message);
  }
};
export const registerWithEmailAndPassword = async (email, password, userType) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (res) {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
          admin: userType=="Admin"?true:false
        });

        axios.post('https://sensing-locals.herokuapp.com/api/v1/create_user', {
          email: email,
          password: password,
          userType: fetchUserType(user.email),
          name: user.displayName
        });
      }
    }
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    let res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

export const linkMailWithGoogle = async (email, password) => {
  try {
    const credentials = EmailAuthProvider.credential(email, password);
    const res = await linkWithCredential(auth.currentUser, credentials);
  } catch (err) {
    console.error(err);
    // alert(err.message)
  }
};

export const fetchUserType = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const docs = await getDocs(q);
    return docs.docs[0]._document.data.value.mapValue.fields.userType.stringValue;
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => {
  signOut(auth);
};

export default app;
