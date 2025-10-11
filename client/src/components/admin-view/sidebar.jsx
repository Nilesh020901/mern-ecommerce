import { ChartNoAxesCombined, LayoutDashboard, LayoutList, PackageSearch } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <PackageSearch />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <LayoutList />
    },
]

function MenuItems({setOpen}) {

    const navigate = useNavigate();

    return <nav className="mt-10 flex flex-1 flex-col gap-2">
        {
            adminSidebarMenuItems.map((menuItem) => (
                <div key={menuItem.id} onClick={() => { navigate(menuItem.path); setOpen ? setOpen(false) : null; }} className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-medium text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground">
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>)
            )
        }
    </nav>
}

function AdminSidebar({open, setOpen}) {

    const navigate = useNavigate();

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b p-4">
                            <SheetTitle className="text-medium font-semibold flex items-center gap-2 mt-4 mb-2">
                                <ChartNoAxesCombined size={20} /> Admin Panel
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate("/admin/dashboard")} className="flex cursor-pointer items-center gap-2">
                    <ChartNoAxesCombined size={24} />
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSidebar;