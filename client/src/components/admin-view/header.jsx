import { LogOut, TextAlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpenSidebar }) {

    const dispatch = useDispatch()
    const { toast } = useToast();

    function handleLogout() {
        dispatch(logoutUser());
        toast({
            title: 'Please Visit Again!'
        })
    }
    return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={() => setOpenSidebar(true)} className="lg:hidden sm:block">
            <TextAlignJustify />
            <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
            <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                <LogOut /> Logout
            </Button>
        </div>
    </header>
}

export default AdminHeader;