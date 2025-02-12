"use client";

import { useState } from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { MdWork, MdMenu } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`h-full ${isOpen ? "w-40" : "w-16"} flex flex-col transition-all duration-300 ease-in-out bg-gradient-to-r from-black via-gray-950 to-gray-800 shadow-lg`}
        >
            {/* Sidebar Header (Toggle Button) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span
                    className={`text-white font-bold transition-all duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 delay-200 overflow-hidden"
                        }`}
                >
                    Menu
                </span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                    <MdMenu size={24} />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <main className="flex flex-col flex-grow mt-5 space-y-3 text-white text-[13px]">
                <SidebarItem href="/dashboard" icon={<FaHome size={16} />} text="Dashboard" isOpen={isOpen} />
                <SidebarItem href="/profile" icon={<FaUser size={16} />} text="Profile" isOpen={isOpen} />
                <SidebarItem href="/projects" icon={<MdWork size={16} />} text="Projects" isOpen={isOpen} />
                <SidebarItem href="/settings" icon={<FaCog size={16} />} text="Settings" isOpen={isOpen} />
            </main>
        </aside>
    );
};

// Sidebar Item Component (Ensures Proper Icon Size)
const SidebarItem = ({ href, icon, text, isOpen }: { href: string; icon: React.ReactNode; text: string; isOpen: boolean }) => {
    return (
        <Link
            href={href}
            className="flex items-center px-4 py-3 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded"
        >
            <div className="w-6 flex justify-center">{icon}</div> {/* ✅ Keeps icons properly sized */}
            <span
                className={`transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 ml-4" : "opacity-0 delay-200 overflow-hidden"
                    }`}
            >
                {text}
            </span>
        </Link>
    );
};

export default Sidebar;
