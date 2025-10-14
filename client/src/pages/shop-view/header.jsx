import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { shoppingViewHeaderMenuItems } from "@/config"
import { HousePlug, Menu, ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function MenuItems() {
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map((menuItems) => <Link className="text-normal font-medium" key={menuItems.id} to={menuItems.path}>{menuItems.label}</Link>)
        }
    </nav>
}

function HeaderRightContent() {
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Button variant="outline" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">User Cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black flex items-center justify-center">
                        <AvatarFallback className="bg-black text-white font-bold">
                            NS
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged in as
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function ShoppingHeader() {

    const { isAuthenticated, user } = useSelector(state => state.auth)
    console.log("call-user", user);
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <Link to='/shop/home' className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className="font-bold">Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                {
                    isAuthenticated ? <div>
                        <HeaderRightContent />
                    </div> : null
                }
            </div>
        </header>
    )
}

export default ShoppingHeader