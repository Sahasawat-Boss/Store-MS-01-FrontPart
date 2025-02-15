import { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    children: React.ReactNode;
    submitText?: string;
    isLoading?: boolean;
};

const  Modal = ({ isOpen, onClose, onSubmit, title, children, submitText = "Save", isLoading = false }: ModalProps) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                {/* Modal Content */}
                <div>{children}</div>

                {/* Actions */}
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : submitText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
