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
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // ✅ Validation state

    // ✅ Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on user input
    };

    // ✅ Validation Function
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.serialNo.trim()) newErrors.serialNo = "Serial No. is required.";
        if (!form.productName.trim()) newErrors.productName = "Product Name is required.";
        if (!form.productPrice.trim() || isNaN(Number(form.productPrice))) newErrors.productPrice = "Valid Product Price is required.";
        return newErrors;
    };

    // ✅ Submit handler (Create product)
    const handleSubmit = async () => {
        setLoading(true);

        // ✅ Validate before sending request
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const productData = {
                ...form,
                productPrice: parseFloat(form.productPrice), // Ensure numeric value
            };

            const response = await axios.post("http://localhost:3001/api/product/create", productData);

            Swal.fire({
                title: "Success!",
                text: "Product created successfully.",
                icon: "success",
                confirmButtonColor: "#2243cc",
            });

            setModalOpen(false); // Close modal after submission
            setForm({ serialNo: "", productName: "", productDetails: "", productPrice: "", remark: "", status: "available" }); // ✅ Reset Form

            console.log("✅ Server Response:", response.data); // ✅ Debugging: Check response
        } catch (error: unknown) {
            console.error("❌ API Error:", error);

            let errorMessage = "Failed to create product.";
            if (error instanceof AxiosError && error.response) {
                console.error("🔴 Axios Error Details:", error.response?.data); // ✅ Debugging
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
            <button
                onClick={() => setModalOpen(true)}
                className="py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded"
                disabled={loading}
            >
                {loading ? "Loading..." : "Add New Product"}
            </button>

            {/* ✅ Reusable Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                title="Create Product"
                isLoading={loading}
            >
                <InputField
                    label="Serial No."
                    name="serialNo"
                    value={form.serialNo}
                    onChange={handleChange}
                    error={errors.serialNo}
                    disabled={loading}
                />
                <InputField
                    label="Product Name"
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                    error={errors.productName}
                    disabled={loading}
                />
                <InputField
                    label="Product Details"
                    name="productDetails"
                    value={form.productDetails}
                    onChange={handleChange}
                    disabled={loading}
                />
                <InputField
                    label="Product Price"
                    name="productPrice"
                    value={form.productPrice}
                    onChange={handleChange}
                    error={errors.productPrice}
                    disabled={loading}
                />
                <InputField
                    label="Remark"
                    name="remark"
                    value={form.remark}
                    onChange={handleChange}
                    disabled={loading}
                />
            </Modal>
        </div>
    );
};

// ✅ Reusable Input Field Component (with Validation)
const InputField = ({
    label,
    name,
    value,
    onChange,
    error,
    disabled = false,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
}) => (
    <div className="mb-3">
        <label className="block text-gray-700 font-medium">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 ${disabled ? "bg-gray-200 cursor-not-allowed" : "border-gray-300"
                }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* ✅ Show validation errors */}
    </div>
);

export default ProductForm;
