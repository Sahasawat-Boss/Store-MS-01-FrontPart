import Link from "next/link";
import Stack from "./Components/index.tsx/stack";

export default function Home() {

  return (

    <main className="flex flex-col  w-screen bg-gradient-to-r from-black via-gray-950 to-gray-800 ">

      <div className="flex w-screen h-96 flex-col justify-center items-center py-4 mb-10">
        <h1 className="text-4xl text-white font-semibold">Store-MS-01</h1>
        <Link
          href="/signIn"
          className="mt-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#acacac]  hover:border-transparent py-1 px-10"
        >
          Sign In
        </Link>
      </div>

      <Stack />
    </main >

  );
}
