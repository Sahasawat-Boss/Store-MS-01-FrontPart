"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaUserFriends, FaCog, FaShoppingCart } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { MdDashboardCustomize , MdMenu, MdPointOfSale  } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`h-full ${isOpen ? "w-40" : "w-14"} flex flex-col transition-[width] duration-300 ease-in-out bg-gradient-to-r from-black via-gray-950 to-gray-900 shadow-lg overflow-hidden`}
        >
            {/* Sidebar Header (Toggle Button) */}
            <div className="flex items-center border-b border-gray-700">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-4 rounded-md hover:bg-gray-700 transition-all"
                >
                    <MdMenu size={22} />
                </button>
                <span
                    className={`ml-3 text-white font-bold transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"
                        }`}
                >
                    Menu
                </span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col flex-grow mt-5 space-y-2 text-white text-[14px]">
                <SidebarItem href="/store/dashboard" icon={<MdDashboardCustomize  size={20} />} text="Dashboard" isOpen={isOpen} />
                <SidebarItem href="/store/shop" icon={<FaShoppingCart size={20} />} text="Shop" isOpen={isOpen} />
                <SidebarItem href="/store/sale" icon={<MdPointOfSale  size={20} />} text="Sale" isOpen={isOpen} />
                <SidebarItem href="/store/repair" icon={<GiAutoRepair size={20} />} text="Repair" isOpen={isOpen} />
                <SidebarItem href="/store/storeConfig" icon={<FaCog size={20} />} text="Store Config" isOpen={isOpen} />
                <SidebarItem href="/store/userConfig" icon={<FaUserFriends  size={20} />} text="User Config" isOpen={isOpen} />
            </nav>
        </aside>
    );
};

// Sidebar Item Component
const SidebarItem = ({ href, icon, text, isOpen }: { href: string; icon: React.ReactNode; text: string; isOpen: boolean }) => {
    const pathname = usePathname(); // ✅ Get current route
    const isActive = pathname === href; // ✅ Check if current route matches href

    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 transition-all duration-300 ease-in-out rounded-md
                ${isActive ? "bg-blue-900" : "hover:bg-blue-900"}`}
        >
            {/* ✅ Fixed icon size and alignment */}
            <div className="w-6 h-6 flex justify-center items-center">{icon}</div>

            {/* ✅ Hide text properly when sidebar is closed */}
            <span
                className={`ml-3 whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"
                    }`}
            >
                {text}
            </span>
        </Link>
    );
};

export default Sidebar;
