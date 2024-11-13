// pages/login.js
'use client';
import React from 'react';
import useLogin from '@/libs/hooks/use-login';
import { useRouter } from 'next/navigation';
import axios, { all } from 'axios';
import { useGlobalContext } from '@/store';

const LoginPage = () => {

    const {
        values,
        handleSubmit,
        handleChange,
        errors,
        isSubmitting,
    } = useLogin();

    const isFormValid = values.email && values.password;
    const router = useRouter();
    const { setUser, setToken, setPosts} = useGlobalContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            try {
                // Step 1: Login request
                const loginResponse = await axios.post("http://localhost:3001/auth/login", {
                    email: values.email,
                    password: values.password,
                });

                const { token, user } = loginResponse.data;
                setUser(user);
                setToken(token); // Set the token for the next request

                // Step 2: Fetch posts using the token
                const postsResponse = await axios.get("http://localhost:3001/posts/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPosts(postsResponse.data);

                // Redirect after both requests are complete
                router.push('/');
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>

                <form onSubmit={onSubmitHandler}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    {/* General Error Message */}
                    {errors.general && <div className="text-red-500 text-sm mb-4">{errors.general}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full p-3 text-white font-semibold rounded-md transition ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
