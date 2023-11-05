"use client";
import React from "react";
import { logout } from "@/services/auth.service";
import { User } from "@/models/user.model";
import { usePathname, useRouter } from "next/navigation";
// import {logo} from '../public/tube-queue-svgrepo-com.svg'
import Image from "next/image";

interface Props {
    currentUser: User | null;
}

export default function NavBar({ currentUser }: Props) {
    const pathname = usePathname().split("/")[0];
    const router = useRouter();

    const handleClick:
        | React.MouseEventHandler<HTMLButtonElement>
        | undefined = async () => {
        const navToLogin = () => {
            router.push("/login");
        };

        if (currentUser) {
            await logout();
        } else {
            router.push("/login");
        }
        if (!currentUser) {
            await navToLogin();
        }
    };

    return (
        <div
            className={`${
                !currentUser && "flex flex-row items-center"
            } w-full flex flex-row justify-end items-center text-lg font-thin text-slate-300 border-red-500`}
        >

            <div onClick={()=>router.push('/')} className='flex  flex-grow justify-start items-center  text-2xl text-slate-300 px-10 '>
                <Image width={70} height={150} alt='logo' className=' p-2 object-cover' src='./line-up-single-line-svgrepo-com.svg'  />
                <p className="relative right-5 font-extrabold">UP</p>
                </div>
            <div className='w-[90vw] flex flex-row justify-end items-center'>
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
                        className="relative px-5 rounded-full m-5 border-[1px] border-purple-600  hover:bg-purple-600 text-slate-300 text-2xl hover:font-semibold"
                    >
                        {currentUser ? "Logout" : "Login"}
                    </button>
                )}
            </div>
        </div>
    );
}
