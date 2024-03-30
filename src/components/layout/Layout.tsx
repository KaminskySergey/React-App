import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import History from "../history/History";
import { useState } from 'react'


export default function Layout() {
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => {
        setIsOpen(pS => !pS)
    }
    
    return (
        <>
            <div className="bg-[#172554] w-full m-auto absolute top-0 left-0 flex">
                <Header handleToggleHistory={handleToggle} />
            </div>
            <div className="pt-[80px] pb-[16px] h-screen relative">
                {isOpen && <History handleToggle={handleToggle} />}
                <main>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </>
    )
}
