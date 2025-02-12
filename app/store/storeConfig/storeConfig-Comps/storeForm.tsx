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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="mx-auto bg-gray-100 shadow-lg py-6 px-10">
            <h2 className="text-xl font-bold text-teal-700 border-b border-teal-700 pb-2 mb-4">Store Information</h2>

            <form className="space-y-4">
                <InputField
                    label="Store Name"
                    name="shopName"
                    value={form.shopName}
                    onChange={handleChange} />
                <InputField
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange} />
                <InputField
                    label="Contact"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange} />
                <InputField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange} />
                <InputField
                    label="Tax ID"
                    name="taxId"
                    value={form.taxId}
                    onChange={handleChange} />

                <button className="flex items-center justify-center w-fit py-2 px-4 mt-4 text-white bg-teal-700 hover:bg-teal-800 rounded">
                    💾 Save
                </button>
            </form>
        </div>
    );
};

// Input field component
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
