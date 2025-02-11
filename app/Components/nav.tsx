"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    return (
        <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md">
            <div className="container mx-auto py-4 flex justify-between space-x-8">
                <button onClick={() => router.push("/")} className="hover:text-blue-400 transition">
                    Store-MS-01
                </button>
                <div className="text-sm">
                    Setting
                    Setting
                    Setting
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
