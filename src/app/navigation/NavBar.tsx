'use client'
import React from "react";
import { logout } from "@/services/auth.service";
import { User } from "@/models/user.model";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    currentUser: User | null;
}

export default function NavBar({ currentUser }: Props) {
    const pathname = usePathname().split("/")[0];
    const router = useRouter()

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = async  () => {

        const navToLogin = () => {
            router.push("/login");
        }

        if (currentUser) {
            await logout();
        } else {
            router.push("/login");
        }
        if(!currentUser) {
            await navToLogin();
        }
    };



    return (
        <div
            className={`${
                !currentUser && "flex flex-row justify-center items-center"
            } w-full flex flex-row justify-end items-center text-lg font-thin text-slate-300 border-red-500`}
        >
            

            {currentUser && (
                <div>
                <span>Welcome back </span>
                <span className="font-bold">
                    {currentUser?.name.split(" ")[0]}!!{" "}
                </span>
            </div>
            )}

                {pathname !== "login" && (
                    <button
                        onClick={handleClick}
                        className='relative px-5 rounded-full m-5 border-[1px] border-purple-600  hover:bg-purple-600 text-slate-300 text-2xl hover:font-semibold'>
                        {currentUser ? 'Logout' : 'Login'}
                    </button>
                )}
        </div>
    );
}
