'use client';

import React from 'react';
import axios from 'axios';
import { useGlobalContext } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const PeopleYouMayKnow = () => {
    const router = useRouter();
    const { token, user, setUser, setFriends } = useGlobalContext();
    const [people, setPeople] = useState([]);

    const globalAssetsURL = "http://localhost:3001/assets/";

    const onAddFriendHandler = async (friendId) => {
        try {
            const response = await axios.patch(`http://localhost:3001/users/${user._id}/${friendId}`,{},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            user.friends = response.data;
            setFriends(response.data);
            
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/users/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPeople(response.data);
            } catch (error) {
                console.error("Error fetching people:", error);
            }
        }
        fetchData();
    }, []);

    
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 m-4 ml-12 max-h-60 overflow-y-auto no-scrollbar">
            <h3 className="text-white text-lg mb-4">People You May Know!</h3>
            {people.map((friend, index) => (
                <div key={index} className="flex items-center mb-4">
                    <img
                        src={globalAssetsURL + friend.picturePath}
                        alt={friend.firstName}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                        <h4 className="text-white font-semibold">{friend.firstName}</h4>
                        <p className="text-gray-400 text-sm">{friend.description}</p>
                    </div>
                    <button
                        onClick={() => onAddFriendHandler(friend._id)}
                        className="text-blue-500 w-10">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PeopleYouMayKnow;
