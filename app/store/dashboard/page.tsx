import Sidebar from "@/app/Components/sidebar"

function page() {
    return (
        <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
            <nav><Sidebar /></nav>
            <section className="w-full m-8">
                <div className='text-white text-xl mb-2'>Dashboard</div>
                <div className='bg-gray-100 h-[60vh]'></div>
            </section>
        </main>
    )
}

export default page