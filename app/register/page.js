'use client';
import React, { use } from "react";
import Link from "next/link";
import useRegister from "@/libs/hooks/use-register.js"
import { useRouter } from "next/navigation";
import axios from "axios";

const registerPage = () => {
    const {
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        isSubmitting,
    } = useRegister();


    const router = useRouter();
    const isFormValid = values.firstName &&
        values.lastName &&
        values.email &&
        values.password &&
        values.location &&
        values.occupation &&
        values.picture;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("location", values.location);
            formData.append("occupation", values.occupation);
            formData.append("picture", values.picture);
            try {
                await axios.post("http://localhost:3001/auth/register", formData);
                router.push("/login");
            } catch (error) {
                console.error("Registration error:", error);
            } 
        }
    }


    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
            <form onSubmit={onSubmitHandler}>
                {/* First Name */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && <div className="text-red-500 text-sm mt-2">{errors.firstName}</div>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && <div className="text-red-500 text-sm mt-2">{errors.lastName}</div>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-2">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-2">{errors.password}</div>}
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.location && <div className="text-red-500 text-sm mt-2">{errors.location}</div>}
                </div>

                {/* Occupation */}
                <div className="mb-4">
                    <label htmlFor="occupation" className="block text-sm font-medium mb-2">Occupation</label>
                    <input
                        type="text"
                        name="occupation"
                        value={values.occupation}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.occupation && <div className="text-red-500 text-sm mt-2">{errors.occupation}</div>}
                </div>

                {/* Picture URL */}
                <div className="mb-6">
                    <label htmlFor="picture" className="block text-sm font-medium mb-2">Picture</label>
                    <input
                        type="file"
                        name="picture"
                        onChange={(e) => setFieldValue("picture", e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.picture && <div className="text-red-500 text-sm mt-2">{errors.picture}</div>}
                </div>

                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>


                {/* ALREADY HAVE AN ACCOUNT? */}
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default registerPage;