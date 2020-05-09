import firebase from "firebase/app";
import '@firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyCkUjphSyUCwtLQ7AI8QAFM_q5rE2Ldfn8",
    authDomain: "react-ecommerce-3dc07.firebaseapp.com",
    databaseURL: "https://react-ecommerce-3dc07.firebaseio.com",
    projectId: "react-ecommerce-3dc07",
    storageBucket: "react-ecommerce-3dc07.appspot.com",
    messagingSenderId: "185983969823",
    appId: "1:185983969823:web:ef82aa08cdc50d127c032a",
    measurementId: "G-CW9VW8LVMQ"
};

export const createUserProfileDocument =  async (userAuth, additionalData) => {
    if(!userAuth) return ;

    //const userRef = firestore.doc(`users/${userAuth.uid}`);   (Old Code)
    const userRef = firestore().collection(`users`).doc(`${userAuth.uid}`);
    const snapShot = await userRef.get();
    //console.log(snapShot);
    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,email,createAt, ...additionalData
            })
        } catch (e) {
            console.log('error creatring user', e.message)

        }
    }

    return userRef;


}

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore;

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);



export default firebase;
