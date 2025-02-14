"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { config } from "../../../config"
import Swal from "sweetalert2";

const StoreForm = () => {
    const [form, setForm] = useState({
        storeName: "",
        address: "",
        phone: "",
        email: "",
        taxCode: "",
    });
    const [loading, setLoading] = useState(false);

    // ✅ Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission (send data to backend)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ❌ Prevent page reload
        setLoading(true);
    
        try {
            // ✅ Call API directly without storing response
            await axios.post(`${config.apiUrl}/api/company/createStoreInfo`, form);
    
            // ✅ Show success message
            Swal.fire({
                title: "Success!",
                text: "Store information updated successfully.",
                icon: "success",
                confirmButtonColor: "#2243cc",
            });
    
            // ✅ Reset form after successful submission
            setForm({
                storeName: "",
                address: "",
                phone: "",
                email: "",
                taxCode: "",
            });
        } catch (error: unknown) {
            console.error("❌ API Error:", error);
    
            let errorMessage = "Something went wrong. Please try again.";
    
            if (error instanceof AxiosError && error.response) {
                errorMessage = error.response.data?.message || "Failed to update store.";
            }
    
            // ❌ Show error message
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#2243cc",
            });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="mx-auto bg-gray-100 shadow-lg py-6 px-10">
            <h2 className="font-bold text-blue-700 border-b border-blue-700 pb-2 mb-4">
                Edit Store Information
            </h2>

            {/* ✅ Prevent page reload on submit */}
            <form onSubmit={handleSubmit} className="space-y-4 text-md">
                <InputField label="Store Name" name="storeName" value={form.storeName} onChange={handleChange} />
                <InputField label="Address" name="address" value={form.address} onChange={handleChange} />
                <InputField label="Contact" name="phone" value={form.phone} onChange={handleChange} />
                <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
                <InputField label="Tax Code" name="taxCode" value={form.taxCode} onChange={handleChange} />

                <div className="flex gap-1.5">
                    {/* ✅ Update button now submits to backend */}
                    <button type="submit" className="flex items-center justify-center w-fit py-2 px-4 mt-4 text-white bg-blue-700 hover:bg-blue-500 rounded" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ✅ Reusable Input Field Component
const InputField = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label className="block text-gray-700 font-medium">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
    </div>
);

export default StoreForm;
