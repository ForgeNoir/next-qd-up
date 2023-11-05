'use client'
import React, {useContext} from 'react';
import { UserContext } from '@/context/user.context';
import { useRouter } from 'next/navigation';


export default function ProfilePage() {

    const { currentUser } = useContext(UserContext);
    const router = useRouter()

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}