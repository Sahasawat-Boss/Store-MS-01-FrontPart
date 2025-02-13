"use client";

import { useState } from "react";
import { config } from "../config";
import { useRouter } from "next/navigation";
import { useSession } from "../context/SessionProvider";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2"; // UI Modal Library

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setSession } = useSession(); // ✅ Add session context

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { username, password }; // ✅ Ensure password is included
            const response = await axios.post(`${config.apiUrl}/api/user/signIn`, payload);

            if (response.data.token && response.data.user) {
                const { token, user } = response.data;

                // ✅ Store token in localStorage
                localStorage.setItem("token", token);

                // ✅ Update session state (triggers Navbar update)
                setSession({ token, user });

                // ✅ Dispatch a storage event to notify Navbar
                window.dispatchEvent(new Event("storage"));

                // ✅ Redirect to dashboard immediately
                router.push("/store/dashboard");

                // ✅ Show Welcome Modal for 2 seconds
                setTimeout(() => {
                    Swal.fire({
                        title: "Welcome Back!",
                        html: `<div style="text-align: center; font-size: 20px;">
                                    <strong>${user.name}</strong>, welcome back! 🎉
                                </div>`,
                        icon: "success",
                        timer: 1500, // ✅ Auto-close after 1.5 seconds
                        showConfirmButton: false, // ✅ No "OK" button needed
                        showClass: { popup: "animate__animated animate__fadeInDown" },
                        hideClass: { popup: "animate__animated animate__fadeOutUp" },
                    });
                }, 500); // ✅ Slight delay to ensure modal shows on the new page

                // ✅ Clear input fields
                setUsername("");
                setPassword("");
            } else {
                // ❌ Show warning modal if login fails
                Swal.fire({
                    title: "Invalid Login",
                    text: "The username or password is incorrect. Please try again.",
                    icon: "warning",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2243cc",
                    showClass: { popup: "animate__animated animate__shakeX" },
                });
            }
        } catch (error: unknown) { // ✅ Use `unknown` instead of `any`
            console.error("❌ Login Error:", error);

            let errorMessage = "An unexpected error occurred.";

            if (error instanceof AxiosError && error.response) {
                // ✅ If it's an Axios error, get error message from response
                errorMessage = error.response.data?.message || "Invalid credentials.";
            } else if (error instanceof Error) {
                // ✅ If it's a generic JavaScript error
                errorMessage = error.message;
            }

            // ❌ Show error modal
            Swal.fire({
                title: "Sign In Failed",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#2243cc",
                showClass: { popup: "animate__animated animate__shakeX" },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800">
            <div className="bg-gray-900 py-10 px-12 rounded-lg shadow-lg border border-gray-700 text-white transition-all duration-300 animate-fade-in">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-200 animate-fade-in-down">
                    Sign In
                </h2>
                <form onSubmit={handleSignIn} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border-none rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 animate-fade-in-left"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="mb-3 w-full px-4 py-2 border-none rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 animate-fade-in-left"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-10 bg-gradient-to-r rounded from-blue-600 to-indigo-800 text-white hover:shadow-xl hover:scale-105 transform transition-all duration-200 animate-fade-in-up"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-10 flex justify-center items-center rounded bg-gray-500">
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
                                Signing In...
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
