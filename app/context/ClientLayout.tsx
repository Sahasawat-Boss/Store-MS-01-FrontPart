"use client";

import { SessionProvider } from "./SessionProvider";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar />
            <main className="flex-grow flex">{children}</main>
            <Footer />
        </SessionProvider>
    );
}
