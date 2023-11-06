"use client";
import React, { useContext } from "react";
import NavBar from "../navigation/NavBar";
import { UserContext } from "@/context/user.context";
import Directory from "./Directory";

export default function ProfilesPage() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="flex min-h-screen flex-col items-center">
            <NavBar currentUser={currentUser} />
            <Directory />
        </div>
    );
}
