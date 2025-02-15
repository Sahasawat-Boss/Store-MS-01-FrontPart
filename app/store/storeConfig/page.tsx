import Sidebar from "@/app/Components/sidebar"
import StoreForm from "./storeConfig-Comps/storeForm"

function page() {
    return (
        <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
            <nav><Sidebar /></nav>
            <section className="w-full m-8 px-4">
                <h1 className="font-semibold text-white text-xl mb-3 animate-fade-in-left">Store Configuration</h1>
                <div className='bg-gray-400 animate-fade-in'>
                    <StoreForm/>
                </div>
            </section>
        </main>
    )
}

export default page