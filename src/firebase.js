import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyAtF7_VQXumEeugoLqNblbrZzCJzBuLALQ",
  authDomain: "moviestream-8ea65.firebaseapp.com",
  projectId: "moviestream-8ea65",
  storageBucket: "moviestream-8ea65.firebasestorage.app",
  messagingSenderId: "997990581351",
  appId: "1:997990581351:web:bba95dafd5822e4ee040c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// now we will get support of firebase in our project

// So after initializing this firebase, we will initialize the firebase authentication in our project.
const auth= getAuth(app);
// after this we have to configure the FireStore also for the database.

const db= getFirestore(app);

// after this we will create functions for signup, login and logout in our project.

// first we will create user-signup functions.

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password); // this function will create user with email and password. 
        // we will get the created user in this res.
        const user= res.user;
        //  And from this res we will get user details that is stored in this '.user' property.
        // so now we have created the user in our firebase
        // next we will store the user information in our firestore database.

        await addDoc(collection(db, "users"),{
            // in this object we are defining the data that will be stored in this user collection.
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            // so we will store these 4 things in the database.
        });
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
// so we have created the user sign up function, and after this we will create login function.

const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // using this line user would be logged in our website.
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout =()=>{
    signOut(auth);
}

export{ auth, db, login, signup, logout};