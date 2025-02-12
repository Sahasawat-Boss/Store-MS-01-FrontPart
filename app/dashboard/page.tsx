import Sidebar from "../Components/sidebar"

function page() {
  return (
    <main className="flex w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">
      <nav><Sidebar /></nav>
      <section className="w-full m-8">
        <div className='text-white mb-2'>Dashboard</div>
        <div className='bg-gray-400 h-[60vh]'></div>
      </section>
    </main>
  )
}

export default page