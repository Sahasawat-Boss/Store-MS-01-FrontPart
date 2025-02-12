"use client";

import { useState } from "react";
import { config } from "../config";
import { useRouter } from "next/navigation"; // Correct import for App Router
import axios from "axios";
import Swal from "sweetalert2"; // UI Modal Library

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { username, password };
            const response = await axios.post(`${config.apiUrl}/api/user/signIn`, payload);

            if (response.data.token) {
                const token = response.data.token;

                // Save token to localStorage
                localStorage.setItem("token", token);
                router.push('/dashboard')

                // --------Show modal Sucess
                Swal.fire({
                    title: " Welcome Back!",
                    html: `
                        <div style="text-align: left; font-size: 16px;">
                            <strong>Username:</strong> ${username} <br>
                        </div>
                    `,
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4346db", // Indigo-800
                    showClass: {
                        popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                    },
                });

                // Clear inputs after login
                setUsername("");
                setPassword("");
            } else {
                // --------Show modal Warning
                Swal.fire({
                    title: "Invalid Login",
                    text: "The username or password is incorrect. Please try again.",
                    icon: "warning",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4346db", // Indigo-800
                    showClass: {
                        popup: "animate__animated animate__shakeX",
                    },
                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";

            // --------Show modal Error
            Swal.fire({
                title: "Login Failed",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#4346db", // Indigo-800
                showClass: {
                    popup: "animate__animated animate__shakeX",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">

            {/*Sign In Form*/}
            <div className=" bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 text-white transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-200">Sign In</h2>
                <form onSubmit={handleSignIn} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border-none rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 ">Password</label>
                        <input
                            type="password"
                            className="w-full mb-6 px-4 py-2 border-none rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-10 flex justify-center items-center bg-gray-400">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Logging In...
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignIn;
