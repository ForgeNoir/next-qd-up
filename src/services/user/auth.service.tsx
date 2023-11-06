"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { app, auth, googleAuthProvider } from "../../../firebase.config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { User } from "@/models/user.model";
import { createNewFirestoreUser } from "./user.service";


//** LOGIN & OUT */



export const loginWithGoogle = async () => {

    try {
        const provider = googleAuthProvider;
        const result = await signInWithPopup(auth, provider);
        console.log(result.user)
        const firebaseUser = result.user;

        const user: User = {
            id: firebaseUser.uid,
            role: "member",
            name: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            photoURL: firebaseUser.photoURL || "",
            createdAt: firebaseUser.metadata.creationTime || "",
        };

        // need a better way to call this function. it checks if user exists and create one if not but it'll do so on every login.
        createNewFirestoreUser(user);

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







