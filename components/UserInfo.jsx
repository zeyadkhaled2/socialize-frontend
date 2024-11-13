'use client';
import { useGlobalContext } from "@/store"; // Adjust based on your state management
import React from 'react';

const UserInfo = () => {
    // Assuming you are fetching user data from global state or a prop.
    const { user } = useGlobalContext(); // Adjust based on your state management
    if (!user) return <div>Loading...</div>;
    const {
        email,
        firstName,
        lastName,
        location,
        occupation,
        picturePath, // Assuming there's no profile picture for now
        impressions,
        viewedProfile,
        friends,
    } = user;
    console.log(user);
    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-sm w-full bg-slate-800 m-4 ml-5 p-4 rounded-lg shadow-lg h-1/4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
                <img
                    src={picturePath || 'https://via.placeholder.com/150'}
                    alt="User Profile"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                />
            </div>

            {/* User Info */}
            <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-white">{firstName} {lastName}</h2>
                <p className="text-sm text-gray-300">{occupation}</p>
                <p className="text-sm text-gray-400">{location}</p>
            </div>

            {/* Email */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-300">Email</h3>
                <p className="text-sm text-gray-200">{email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-300">Impressions</h3>
                    <p className="text-sm text-gray-200">{impressions}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-300">Profile Views</h3>
                    <p className="text-sm text-gray-200">{viewedProfile}</p>
                </div>
            </div>

            {/* Friends */}
            <div>
                <h3 className="text-sm font-medium text-gray-300">Friends</h3>
                <p className="text-sm text-gray-200">{friends.length} Friends</p>
            </div>
        </div>
    );
};

export default UserInfo;
