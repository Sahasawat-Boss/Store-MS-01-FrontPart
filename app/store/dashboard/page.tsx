import Sidebar from "@/app/Components/sidebar"
import SystemStatus from "./dashboard-Comps/SystemStatus"

function page() {
    return (
        <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
            <nav><Sidebar /></nav>
            <section className="w-full m-8 animate-fade-in">
                <div className='font-semibold text-white text-xl mb-2 animate-fade-in-left'>Dashboard</div>
                <div className='bg-gray-700 h-[23vh]'>
                    <section className="flex justify-center items-center pt-10 animate-fade-in-up">
                        <SystemStatus />
                    </section>
                </div>
            </section>
        </main>
    )
}

export default page