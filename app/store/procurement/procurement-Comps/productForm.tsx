"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios"; // ✅ Fix: Import AxiosError
import Swal from "sweetalert2";
import Modal from "@/app/Components/modal";

const ProductForm = () => {
    const [form, setForm] = useState({
        serialNo: "",
        productName: "",
        productDetails: "",
        productPrice: "",
        remark: "",
        status: "available",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Submit handler (Create product)
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:3001/api/product/createProduct", form);
    
            Swal.fire({
                title: "Success!",
                text: "Product created successfully.",
                icon: "success",
                confirmButtonColor: "#2243cc",
            });
    
            setModalOpen(false); // Close modal after submission
        } catch (error: unknown) {
            console.error("❌ API Error:", error);
    
            let errorMessage = "Failed to create product.";
            if (error instanceof AxiosError && error.response) {
                errorMessage = error.response.data?.message || "Something went wrong.";
            }
    
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
                Product Management
            </h2>

            {/* ✅ Open Modal */}
            <button onClick={() => setModalOpen(true)} className="py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded">
                Add New Product
            </button>

            {/* ✅ Reusable Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} title="Create Product" isLoading={loading}>
                <InputField label="Serial No." name="serialNo" value={form.serialNo} onChange={handleChange} />
                <InputField label="Product Name" name="productName" value={form.productName} onChange={handleChange} />
                <InputField label="Product Details" name="productDetails" value={form.productDetails} onChange={handleChange} />
                <InputField label="Product Price" name="productPrice" value={form.productPrice} onChange={handleChange} />
                <InputField label="Remark" name="remark" value={form.remark} onChange={handleChange} />
            </Modal>
        </div>
    );
};

// ✅ Reusable Input Field Component
const InputField = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="mb-3">
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

export default ProductForm;
