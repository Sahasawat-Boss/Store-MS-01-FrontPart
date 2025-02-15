import Sidebar from "@/app/Components/sidebar"
import ProductForm from "./procurement-Comps/productForm"


function page() {
    return (
        <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
            <nav><Sidebar /></nav>
            <section className="w-full m-8 animate-fade-in">
                <div className='font-semibold text-white text-xl mb-2 animate-fade-in-left'>Procurement Management</div>
                <div className='bg-gray-700'>
                    <section className="mx-auto bg-gray-100 shadow-lg py-6 px-12 animate-fade-in-up h-[50vh]">
                        {/* ✅ Hidden div to prevent auto-focus */}
                        <div id="focusTrap" tabIndex={-1} className="absolute top-0 left-0 opacity-0"></div>

                        <h2 className="font-bold text-blue-700 border-b border-blue-700 pb-2">
                            <ProductForm />
                        </h2>
                        <div className="bg-red-100 h-[40vh]">

                        </div>

                    </section>
                </div>
            </section>
        </main >
    )
}

export default page