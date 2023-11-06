"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user.context";
import { useRouter, usePathname } from "next/navigation";
import { getUserById } from "@/services/user/user.service";
import { User } from "@/models/user.model";
import NavBar from "@/app/navigation/NavBar";

export default function ProfilePage() {
    const { currentUser } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const router = useRouter();
    const pathArray = usePathname().split("/");
    const pathId = pathArray[pathArray.length - 1];

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(pathId);
            console.log("data", userData);

            const fetchedUser: User = {
                id: userData?.id,
                role: userData?.role,
                name: userData?.name,
                email: userData?.email,
                photoURL: userData?.photoURL,
                createdAt: userData?.createdAt,
            };

            setProfileUser(fetchedUser);
            console.log(profileUser);
        };

        fetchUser().catch((error) => {
            console.error(error);
        });
    }, [pathId]);

    console.log(profileUser);
    return (
        <div>
            <NavBar currentUser={currentUser} />
            <div className=' flex flex-col justify-center items-center'>
                <h1 className="">Profile Page</h1>
                <img
                    className="object-cover rounded-2xl"
                    alt="profile pic"
                    src={profileUser?.photoURL}
                />
                <ul>
                    <li>Name: {profileUser?.name}</li>
                    <li>Email: {profileUser?.email}</li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}
