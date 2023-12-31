"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../../firebase.config";
import { User } from "@/models/user.model";
import { logout } from "@/services/user/auth.service";
import { getUsers } from "@/services/user/user.service";

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    allUsers: User[];
    setAllUsers: (users: User[] | []) => void;
}>({
    currentUser: null,
    setCurrentUser: () => {},
    allUsers: [],
    setAllUsers: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[] | []>([]);
    const router = useRouter();
    const homePath = usePathname()
    const pathname = usePathname().split("/")[1];
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
    useEffect(() => {
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(signOutUser, TIMEOUT_PERIOD);
        };

        const addActivityListeners = () => {
            window.addEventListener('load', resetInactivityTimer);
            window.addEventListener('mousemove', resetInactivityTimer);
            window.addEventListener('mousedown', resetInactivityTimer);
            window.addEventListener('click', resetInactivityTimer);
            window.addEventListener('scroll', resetInactivityTimer);
            window.addEventListener('keydown', resetInactivityTimer);
        };

        const removeActivityListeners = () => {
            window.removeEventListener('load', resetInactivityTimer);
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('mousedown', resetInactivityTimer);
            window.removeEventListener('click', resetInactivityTimer);
            window.removeEventListener('scroll', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
        };

        addActivityListeners();
        return removeActivityListeners;
    }, []);


    // All users global state setter
    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getUsers();
            console.log("data", usersData);

            const fetchedUsers: User[] = usersData?.map((userData: User) => {
                const user: User = {
                    id: userData.id,
                    role: userData.role,
                    name: userData.name,
                    email: userData.email,
                    photoURL: userData.photoURL,
                    createdAt: userData.createdAt,
                };
                return user;
            });

            setAllUsers(fetchedUsers);
            console.log(allUsers);
        };

        fetchUsers().catch((error) => {
            console.error(error);
        });
    });




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                const user: User = {
                    id: firebaseUser.uid,
                    role: "member",
                    name: firebaseUser.displayName || "",
                    email: firebaseUser.email || "",
                    photoURL: firebaseUser.photoURL || "",
                    createdAt: firebaseUser.metadata.creationTime || "",
                };
                setCurrentUser(user);

                // router.push("/dashboard");
            } else {
                // User is signed out
                setCurrentUser(null);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, [router]);

    useEffect(() => {
        // Redirect to dashboard if user is on login route and authenticated
        if (currentUser && pathname === "login") {
            router.push("/dashboard");
        }

    }, [pathname, currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers, setAllUsers }}>
            {children}
        </UserContext.Provider>
    );
};
