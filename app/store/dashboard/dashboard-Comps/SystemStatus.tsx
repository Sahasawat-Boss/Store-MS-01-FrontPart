"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const SystemStatus = () => {
    const [status, setStatus] = useState({
        server: "Checking...",
        database: "Checking...",
        apiVersion: "Loading...",
        environment: "Loading...",
    });


    // ✅ Wrap fetchStatus in useCallback to prevent unnecessary re-creation
    const fetchStatus = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/system-status");
            setStatus({
                server: response.data.server,
                database: response.data.database,
                apiVersion: response.data.apiVersion,
                environment: response.data.environment,
            });
        } catch {
            setStatus({
                server: "Disconnected",
                database: "Disconnected",
                apiVersion: "N/A",
                environment: "N/A",
            });
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 15000); // ✅ Auto-refresh every 15 seconds
        return () => clearInterval(interval);
    }, [fetchStatus]); // ✅ Properly include fetchStatus in the dependency array

    // ✅ Log connection status when `status` updates
    useEffect(() => {
        console.log(`🔄 Connected to Server: ${status.server}, Database: ${status.database}`);
    }, [status]);
    
    return (
        <div className="p-6 bg-gray-900 text-white rounded-md shadow-md animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">System Status</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <p>Server: <span className={status.server === "Connected" ? "text-green-400" : "text-red-400"}>{status.server}</span></p>
                <p>Database: <span className={status.database === "Connected" ? "text-green-400" : "text-red-400"}>{status.database}</span></p>
                <p>API Version: <span className="text-gray-300">{status.apiVersion}</span></p>
                <p>Environment: <span className="text-gray-300">{status.environment}</span></p>
            </div>
        </div>
    );
};

export default SystemStatus;
