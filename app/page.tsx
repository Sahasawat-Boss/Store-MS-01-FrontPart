import Link from "next/link";
import Stack from "./Components/index.tsx/stack";

export default function Home() {

  return (

    <main className="flex flex-col w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">

      <div className="flex w-screen h-[50vh] flex-col justify-center items-center py-4 mb-10 animate-fade-in">
        <h1 className="text-5xl text-white font-semibold animate-fade-in-up">Store-MS-01</h1>
        <Link
          href="/signIn"
          className="text-xl mt-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transform transition-all duration-200 hover:border-transparent py-2 px-10"
        >
          Sign In
        </Link> 
      </div>

      <Stack />
    </main >

  );
}
