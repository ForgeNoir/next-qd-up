'use client'
import React, {useContext} from 'react';
import NavBar from '../navigation/NavBar';
import { UserContext } from '@/context/user.context';
import { User } from '@/models/user.model';


export default function DashboardPage() {


    const { currentUser } = useContext(UserContext);

    console.log("currentUser:",currentUser)

    return (
        <div className="flex flex-col justify-center items-center" >
        <NavBar currentUser={currentUser} />
            <h1 className="text-slate-300 text-[4rem]">Dashboard</h1>
        </div>
    );
}