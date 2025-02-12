"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    return (
        <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md">
            <div className=" px-8 py-3 flex justify-between">
                <button onClick={() => router.push("/")} className="hover:text-blue-400 transition text-lg">
                    Store-MS-01
                </button>
                <div className="text-sm flex gap-4">
                    <ul>About</ul>
                    <Link
                        href="/signIn">
                        Sign In
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
