"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    return (
        <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md">
            <div className="container mx-auto py-6 flex justify-between space-x-8">
                <button onClick={() => router.push("/")} className="hover:text-blue-400 transition text-lg">
                    Store-MS-01
                </button>
                <div className="text-sm flex gap-4">
                    <ul>About</ul>
                    <ul>SIgn in</ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
