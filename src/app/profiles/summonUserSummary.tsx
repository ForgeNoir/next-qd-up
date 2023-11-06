import React from 'react';
import { User } from '@/models/user.model';

export const summonUserSummary = (user: User) => {

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img className="rounded-full h-24 w-24" src={user.photoURL} alt="user profile" />
                <h1 className="text-slate-300 text-2xl">{user.name}</h1>
                <h2 className="text-slate-300 text-xl">{user.email}</h2>
            </div>
        </div>
    )
}