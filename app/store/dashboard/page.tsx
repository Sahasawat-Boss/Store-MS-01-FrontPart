import Sidebar from "@/app/Components/sidebar"
import SystemStatus from "./dashboard-Comps/SystemStatus"

function page() {
    return (
        <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
            <nav><Sidebar /></nav>
            <section className="w-full m-8 animate-fade-in">
                <div className='text-white text-xl mb-2'>Dashboard</div>
                <div className='bg-gray-700 h-[60vh]'>
                    <section className="flex justify-center items-center p-5 animate-fade-in-up">
                        <SystemStatus />
                    </section>
                </div>
            </section>
        </main>
    )
}

export default page