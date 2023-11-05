"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { app, auth, googleAuthProvider } from "../../../firebase.config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";


//** LOGIN & OUT */



export const loginWithGoogle = async () => {

    try {
        const provider = googleAuthProvider;
        const result = await signInWithPopup(auth, provider);
        console.log(result.user)
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
};

export const logout = async () => {
    try {
        await auth.signOut();
        console.log("signed out successfully");
    } catch (error) {
        console.error(error);
    }
};







