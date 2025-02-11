"use client";

import { useState } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2"; // UI Modal Library

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from refreshing

        try {
            const payload = { username, password };
            const response = await axios.post(`${config.apiUrl}/api/user/signIn`, payload);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            } else {
                Swal.fire({
                    title: "ตรวจสอบ user",
                    text: "ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง",
                    icon: "warning",

                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",

            });
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-800">
            {/*===== Sign In Form =====*/}
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
                <form onSubmit={handleSignIn} className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit" // Ensure button submits form
                        className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignIn;
