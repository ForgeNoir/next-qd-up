import React from "react";
import { logout } from "@/services/auth.service";
import { User } from "@/models/user.model";

interface Props {
    currentUser: User | null;
}

export default function NavBar({ currentUser }: Props) {
    return (
        <div
            className={`${
                !currentUser && ""
            }flex flex-row justify-center items-center text-lg font-thin text-slate-300 border-red-500`}
        >
            <button
                onClick={logout}
                className={`${
                    !currentUser && "hidden"
                } px-5 rounded-full m-5 border-[1px] border-purple-600  hover:bg-purple-600 text-slate-300 text-2xl hover:font-semibold`}
            >
                {" "}
                logout{" "}
            </button>
            {currentUser && (
                <div
                    className={`flex flex-row justify-center items-center text-lg font-thin text-slate-300 border-red-500`}
                >
                    <span className="text-slate-300 text-2xl">|</span>
                    <span className="px-5 rounded-full m-5 border-[1px] border-purple-600  hover:bg-purple-600 text-slate-300 text-2xl hover:font-semibold">
                        {" "}
                        {currentUser?.name}{" "}
                    </span>
                </div>
            )}
            <div>
                <span>Welcome back</span>
                <span className="font-bold">
                    {" "}
                    {currentUser?.name.split(" ")[0]}!!{" "}
                </span>
            </div>
        </div>
    );
}
