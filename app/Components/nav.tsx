"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "../context/SessionProvider";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
    const router = useRouter();
    const { session, setSession, isLoading } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ Track dropdown visibility

    // ✅ Ensure component renders only after client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Prevent rendering while session is loading
    if (!isClient || isLoading) return null;

    return (
        <>
            {/* ✅ Navbar */}
            <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md">
                <div className="px-8 py-3 flex justify-between items-center">
                    {/* ✅ Navbar Title */}
                    <button onClick={() => router.push("/")} className="hover:text-blue-400 transition text-lg">
                        Store-MS-01 <span className="text-[0.1rem]">(Mini)</span>
                    </button>

                    {/* ✅ Ensure items align properly in a row */}
                    <div className="flex items-center">
                        {session && session.user ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                {/* ✅ Profile Link (Triggers Dropdown) */}
                                <div className="flex items-center group hover:cursor-pointer">
                                    <p className="text-base mr-1 group-hover:text-blue-400">
                                        {session.user.name}
                                    </p>
                                    <IoSettingsSharp className="text-sm group-hover:text-blue-400" />
                                </div>

                                {/* ✅ Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-6 right-0 w-40 bg-white shadow-lg text-black z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-indigo-200 transition"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-indigo-200 transition"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/signIn" className="text-sm hover:text-blue-400 transition">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ✅ Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
                    <div className="flex flex-col justify-center bg-white text-black rounded-md shadow-xl h-40 p-6 px-10">
                        <h3 className="text-lg font-semibold">Are you sure you want to sign out?</h3>
                        <hr className="border-t-2 border-gray-300 mt-2 mb-6" />
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-2 py-1 text-white bg-gray-500 rounded-sm hover:scale-110 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setSession(null);
                                    setIsModalOpen(false);
                                    router.push("/signIn");
                                }}
                                className="px-2 py-1 bg-red-500 text-white rounded-sm hover:scale-110 hover:bg-red-400"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
