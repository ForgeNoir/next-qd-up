`use client`

import React, { useContext, useState} from 'react';
import { getUsers } from '@/services/user/user.service';
import { UserContext } from '@/context/user.context';
import { summonUserSummary } from './summonUserSummary';

export default function Directory() {

    const {currentUser, allUsers} = useContext(UserContext)




    return (
        <div>
            Directory
            <div>
                {allUsers.map((user) => {
                    return summonUserSummary(user)
                })}
            </div>
        </div>
    )
}


