"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase.config";
import { User } from "@/models/user.model";
import { logout } from "@/services/user/auth.service";
import { createNewFirebaseUser } from "@/services/user/user.service";

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}>({
    currentUser: null,
    setCurrentUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const router = useRouter();

    const TIMEOUT_PERIOD = 30 * 60 * 1000; // 30 minutes

    const signOutUser = () => {
        logout()
            .then(() => {
                console.log("User has been signed out due to inactivity.");
                // Redirect to sign-in page or show a message if needed
            })
            .catch((error) => {
                // Handle errors here
                console.error("Error signing out user:", error);
            });
    };

    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
        // console.log("reset")
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(signOutUser, TIMEOUT_PERIOD);
    };

    // Add event listeners for user activity
    window.onload = resetInactivityTimer;
    window.onmousemove = resetInactivityTimer;
    window.onmousedown = resetInactivityTimer; // catches touchscreen presses
    window.onclick = resetInactivityTimer; // catches touchpad clicks
    window.onscroll = resetInactivityTimer; // catches scrolling with arrow keys
    window.onkeydown = resetInactivityTimer;

    const removeActivityListeners = () => {
        window.onload = null;
        window.onmousemove = null;
        window.onmousedown = null;
        window.onclick = null;
        window.onscroll = null;
        window.onkeydown = null;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                const user: User = {
                    id: firebaseUser.uid,
                    role: "member",
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || "no-name",
                    photoURL: firebaseUser.photoURL || "",
                    createdAt: firebaseUser.metadata.creationTime || "",
                    // ...other user properties
                };
                setCurrentUser(user);
                createNewFirebaseUser(user);
                router.push("/dashboard");
            } else {
                // User is signed out
                setCurrentUser(null);
                removeActivityListeners();
                router.push("/");
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, [router]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
