"use client";

import { useState } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2"; // UI Modal Library

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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

                // ✅ Show modal with username, password, and token
                Swal.fire({
                    title: "🚀 Welcome Back!",
                    html: `
                        <div style="text-align: left; font-size: 16px;">
                            <strong>Username:</strong> ${username} <br>
                            <strong>Password:</strong> ***** <br>
                            <strong>Token:</strong> 
                            <textarea style="width:100%;height:80px;" readonly>${token}</textarea>
                            <br><br>
                            <img src="https://i.pinimg.com/originals/23/51/bc/2351bc65b2b5d75cef146b7edddf805b.gif" alt="Success" 
                                style="display: block; margin: 10px auto; border-radius: 10px; max-width: 100%;" />
                        </div>
                    `,
                    icon: "success",
                    confirmButtonText: "OK",
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
                Swal.fire({
                    title: "⚠️ ตรวจสอบ user",
                    text: "ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง",
                    icon: "warning",
                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
            Swal.fire({
                title: "❌ Error",
                text: errorMessage,
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 w-96 text-white transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-200">Sign In</h2>
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border-none rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border-none rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
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
                            </>
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
