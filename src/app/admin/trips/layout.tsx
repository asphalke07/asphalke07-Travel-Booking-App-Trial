import React from "react";
import { Sidebar } from "@/src/components/admin/sidebar";

const AdminLayout = ({children}:{children:React.ReactNode})=>{
    return(
        <section className="bg-[#f5f5fe] flex">
            <Sidebar/>
            <section className="flex-1 flex flex-col ">
                <div className="h-48 bg-black text-white flex justify-center flex-col px-10 gap-3">
                    <h1 className="text-5xl">Trips</h1>
                    <p>All the info about Trips</p>
                </div>
                {children}
            </section>
        </section>
    )
};

export default AdminLayout;