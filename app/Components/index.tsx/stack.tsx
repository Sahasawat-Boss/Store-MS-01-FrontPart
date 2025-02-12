"use client";

import { FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiPrisma, SiMongodb } from "react-icons/si";

const Stack = () => {
    return (
        <main className="py-4 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
            <h2 className="text-xl font-bold text-center mb-6"> Stack In This Project</h2>

            <div className="flex justify-center space-x-6">
                {/* Next.js */}
                <div className="flex flex-col items-center">
                    <SiNextdotjs className="text-2xl hover:text-gray-300 transition" />
                    <span className="mt-2">Next.js</span>
                </div>

                {/* Node.js */}
                <div className="flex flex-col items-center">
                    <FaNodeJs className="text-2xl text-green-500 hover:text-green-400 transition" />
                    <span className="mt-2">Node.js</span>
                </div>

                {/* Express.js */}
                <div className="flex flex-col items-center">
                    <SiExpress className="text-2xl text-gray-400 hover:text-gray-300 transition" />
                    <span className="mt-2">Express</span>
                </div>

                {/* Prisma */}
                <div className="flex flex-col items-center">
                    <SiPrisma className="text-2xl text-blue-500 hover:text-blue-400 transition" />
                    <span className="mt-2">Prisma</span>
                </div>

                {/* MongoDB */}
                <div className="flex flex-col items-center">
                    <SiMongodb className="text-2xl text-green-400 hover:text-green-300 transition" />
                    <span className="mt-2">MongoDB</span>
                </div>
            </div>
        </main>
    );
};

export default Stack;
