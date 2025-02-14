"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { config } from "../../../config"; // ✅ Import config

const SystemStatus = () => {
    const [status, setStatus] = useState({
        server: "Checking...",
        database: "Checking...",
        apiVersion: "Checking...",
        environment: "Checking...",
    });

    // ✅ Use relative API path or config.apiUrl
    const fetchStatus = useCallback(async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/system/system-status`); // ✅ Use dynamic API URL
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
        const interval = setInterval(fetchStatus, 15000);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    useEffect(() => {
    }, [status]);

    return (
        <div className="px-14 py-6 bg-gray-900 text-white rounded-md shadow-md animate-fade-in-up">
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
