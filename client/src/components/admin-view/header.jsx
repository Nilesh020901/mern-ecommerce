import { LogOut, TextAlignJustify } from "lucide-react";
import { Button } from "../ui/button";


function AdminHeader({ setOpenSidebar }) {
    return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={() => setOpenSidebar(true)} className="lg:hidden sm:block">
            <TextAlignJustify />
            <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
            <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                <LogOut /> Logout
            </Button>
        </div>
    </header>
}

export default AdminHeader;