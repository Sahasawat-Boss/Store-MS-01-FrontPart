"use client";

import { useState } from "react";
import { FaHome, FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { MdWork, MdMenu } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`h-full ${isOpen ? "w-48" : "w-14"} flex flex-col transition-all duration-300 ease-in-out bg-gradient-to-r from-black via-gray-950 to-gray-900 shadow-lg`}
        >
            {/* Sidebar Header (Toggle Button) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                {isOpen && <span className="text-white font-bold">Menu</span>}
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                    <MdMenu size={20} />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col flex-grow mt-5 space-y-2 text-white text-[14px]">
                <SidebarItem href="/store/dashboard" icon={<FaHome size={18} />} text="Dashboard" isOpen={isOpen} />
                <SidebarItem href="/profile" icon={<FaShoppingCart size={18} />} text="Shop" isOpen={isOpen} />
                <SidebarItem href="/projects" icon={<MdWork size={18} />} text="Sale" isOpen={isOpen} />
                <SidebarItem href="/projects" icon={<MdWork size={18} />} text="Repair" isOpen={isOpen} />
                <SidebarItem href="/store/storeConfig" icon={<FaCog size={18} />} text="Store Config" isOpen={isOpen} />
                <SidebarItem href="/settings" icon={<FaUser size={18} />} text="User Config" isOpen={isOpen} />
            </nav>
        </aside>
    );
};

// Sidebar Item Component
const SidebarItem = ({ href, icon, text, isOpen }: { href: string; icon: React.ReactNode; text: string; isOpen: boolean }) => {
    return (
        <Link
            href={href}
            className="flex items-center px-4 py-3 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded"
        >
            <div className="w-6 flex justify-center">{icon}</div>
            <span className={`ml-3 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
                {text}
            </span>
        </Link>
    );
};

export default Sidebar;
