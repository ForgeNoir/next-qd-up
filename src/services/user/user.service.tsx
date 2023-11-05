const { db } = require("../../../firebase.config");
import { FirebaseUser } from "@/models/user.model";
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";

export const createNewFirebaseUser = async (user: FirebaseUser) => {
    console.log('firebase user:',user)
    try {
        const userRef = doc(db, "users", user.id);
        console.log("user ref:", userRef);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            // Document does not exist, safe to create a new one
            await setDoc(userRef, user);
            console.log("User created and saved in Firestore");
        } else {
            // Document already exists
            console.log("User already exists in Firestore. No new document created.");
        }
    } catch (error) {
        if (error instanceof FirestoreError) {
            // Handle Firestore errors
            console.error("Firestore Error:", error.code, error.message);
            throw new Error(`FirestoreError: ${error.code} - ${error.message}`);
        } else {
            // Handle other errors
            console.error("An unknown error occurred:", error);
            throw error; // Rethrow the original error if it's not a FirestoreError
        }
    }
};
