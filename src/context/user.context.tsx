"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase.config";
import { User } from "@/models/user.model";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                const user: User = {
                    id: firebaseUser.uid,
                    role: "member",
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || "no-name",
                    // ...other user properties
                };
                setCurrentUser(user);
                router.push('/dashboard')
            } else {
                // User is signed out
                setCurrentUser(null);
                router.push('/login')
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
