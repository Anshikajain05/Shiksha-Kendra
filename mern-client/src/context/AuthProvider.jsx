import React, {  createContext, useState, useEffect } from 'react'
import app from "../firebase/firebase.config"
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, getAuth, updateCurrentUser } from "firebase/auth";
import { GoogleAuthProvider, signOut } from "firebase/auth";
 


 export const AuthContext = createContext();
const auth = getAuth(app)
const googleprovider = new GoogleAuthProvider();

 const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email , password)=>{
       setLoading(true);
       return createUserWithEmailAndPassword(auth,  email, password) 
    }
    const loginwithGoogle = () =>{
      setLoading(true);
      return signInWithPopup(auth,googleprovider)
    }
    const login = (email, password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }
     const logOut = () =>{
      return signOut(auth)
     }
    useEffect(() =>{
      const unsubcribe = onAuthStateChanged(auth, currentUser =>{
         //console.log(currentUser)
         setUser(currentUser)
         setLoading(false)
      })
      return () =>{
        return unsubcribe();
      } 
    },[])
    const authInfo = {
      user,
        createUser,
        loginwithGoogle,
        loading,
        login,
        logOut
    }
    return(
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    )
}
export default AuthProvider