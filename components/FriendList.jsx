'use client';
import axios from "axios";
import { useGlobalContext } from "@/store";
import React, { useEffect, useState } from "react";

const FriendList = () => {

    const { user, token, friends } = useGlobalContext();
    const [friendList, setFriendList] = useState([]);

    const globalAssetsURL = "http://localhost:3001/assets/";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${user._id}/friends`,
                    { headers: { Authorization: `Bearer ${token}` } });
                setFriendList(response.data);
            }
            catch (error) {
                console.error("Error fetching friends:", error);
            }
        }
        fetchData();
    }, [friends]);


    // const friends = [
    //     { name: "Steve Ralph", description: "Degenerate", img: "path/to/image1.jpg" },
    //     { name: "Whatcha Doing", description: "Educator", img: "path/to/image2.jpg" },
    //     { name: "Jane Doe", description: "Hacker", img: "path/to/image3.jpg" },
    // ];

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 h-3/4 m-4 ml-12">
            <h3 className="text-white text-lg mb-4">Friend List</h3>
            {friendList.map((friend, index) => (
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
                    <button className="text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 9l-6 6-6-6"
                            />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};
export default FriendList;