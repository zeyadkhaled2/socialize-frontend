'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    friends: [],
};

export const GlobalProvider = ({ children }) => {
    const [mode, setMode] = useState(initialState.mode);
    const [user, setUser] = useState(initialState.user);
    const [token, setToken] = useState(initialState.token);
    const [posts, setPosts] = useState(initialState.posts);
    const [friends, setFriends] = useState(initialState.friends);

    // Load initial state from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {  // Check if we're in the client environment
            const storedMode = localStorage.getItem('mode');
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            const storedPosts = localStorage.getItem('posts');
            const storedFriends = localStorage.getItem('friends');

            if (storedMode) setMode(storedMode);
            if (storedUser) setUser(JSON.parse(storedUser));
            if (storedToken) setToken(storedToken);
            if (storedPosts) setPosts(JSON.parse(storedPosts));
            if (storedFriends) setFriends(JSON.parse(storedFriends));
        }
    }, []);


    // Persist state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);


    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('friends', JSON.stringify(friends));
    }, [friends]);

    return (
        <GlobalContext.Provider
            value={{
                mode,
                setMode,
                user,
                setUser,
                token,
                setToken,
                posts,
                setPosts,
                friends,
                setFriends,
                
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for accessing global context
export const useGlobalContext = () => useContext(GlobalContext);
