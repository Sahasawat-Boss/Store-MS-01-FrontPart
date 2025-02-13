"use client";

import { useState } from "react";

const StoreForm = () => {
    const [form, setForm] = useState({
        shopName: "",
        address: "",
        phone: "",
        email: "",
        taxId: "",
    });

    // ✅ Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission (prevent reload)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // ❌ Prevent default form submission (page reload)
        console.log("Form submitted:", form);
    };

    // ✅ Handle form reset
    const handleClear = () => {
        setForm({
            shopName: "",
            address: "",
            phone: "",
            email: "",
            taxId: "",
        });
    };

    return (
        <div className="mx-auto bg-gray-100 shadow-lg py-6 px-10">
            <h2 className="font-bold text-teal-700 border-b border-teal-700 pb-2 mb-4">
                Edit Store Information
            </h2>

            {/* ✅ Prevent page reload on submit */}
            <form onSubmit={handleSubmit} className="space-y-4 text-md">
                <InputField label="Store Name" name="shopName" value={form.shopName} onChange={handleChange} />
                <InputField label="Address" name="address" value={form.address} onChange={handleChange} />
                <InputField label="Contact" name="phone" value={form.phone} onChange={handleChange} />
                <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
                <InputField label="Tax ID" name="taxId" value={form.taxId} onChange={handleChange} />

                <div className="flex gap-1.5">
                    {/* ✅ Clear button resets form without reloading */}
                    <button type="button" onClick={handleClear} className="flex items-center justify-center w-fit py-2 px-4 mt-4 text-white bg-gray-500 hover:bg-gray-600 rounded">
                        Clear
                    </button>

                    {/* ✅ Save button now submits without reloading */}
                    <button type="submit" className="flex items-center justify-center w-fit py-2 px-4 mt-4 text-white bg-teal-700 hover:bg-teal-800 rounded">
                        💾 Save
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
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
    </div>
);

export default StoreForm;
