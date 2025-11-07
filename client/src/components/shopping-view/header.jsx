import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { shoppingViewHeaderMenuItems } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { logoutUser } from "@/store/auth-slice"
import { HousePlug, LogOut, Menu, ShoppingCart, User, UserCog } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import UserCartWrapper from "./cart-wrap"
import { useEffect, useState } from "react"
import { fetchCartItems } from "@/store/shop/cart-slice"
import { Label } from "../ui/label"

function MenuItems() {

    const navigate = useNavigate();

    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem('filter');
        const currentFilter = getCurrentMenuItem.id !== 'home' ? 
        {
            category : [getCurrentMenuItem.id]
        } : null

        sessionStorage.setItem('filter', JSON.stringify(currentFilter))
        navigate(getCurrentMenuItem.path)
    }
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map((menuItems) => <Label onClick={() => handleNavigate(menuItems)} className="text-normal font-medium cursor-pointer" key={menuItems.id}>{menuItems.label}</Label>)
        }
    </nav>
}
 
function HeaderRightContent() {

    const [openCartSheet, setOpenCartSheet] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleLogout() {
        dispatch(logoutUser());
        navigate('/verify/signin');
        toast({
            title: 'Please Visit Again!',
        })
    }
    
    useEffect(() => {
        dispatch(fetchCartItems({ userId: user?.userId }));
    }, [dispatch]);

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="sr-only">User Cart</span>
                </Button>
                <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black flex items-center justify-center">
                        <AvatarFallback className="bg-black text-white font-bold cursor-pointer">
                            {user?.username ? user.username.charAt(0).toUpperCase() : 'Guest'}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged in as {user?.username ? user?.username : 'Guest'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/shop/profile')}>
                        <UserCog className="w-4 h-4 mr-2" /> <span className="text-sm font-medium">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> <span className="text-sm font-medium">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function ShoppingHeader() {

    const { isAuthenticated } = useSelector(state => state.auth)
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
                    <SheetContent side="left" className="w-full max-w-xs flex flex-col justify-between">
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    )
}

export default ShoppingHeader