import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "@/store/shop/cart-slice";



function UserCartItemsContent({ cartItem }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleCartItemDelete(getCartItem) {
        dispatch(deleteFromCart({ userId: user?.userId, productId: getCartItem?.product }) );    }
    return <div className="flex items-center space-x-4">
        <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded-lg object-cover" />
        <div className="flex-1">
            <h3 className="font-semibold">{cartItem?.title}</h3>
            <div className="flex items-center gap-2 mt-1">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="mx-3">{cartItem?.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Decrease quantity</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-medium">
                ${(
                    (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity
                ).toFixed(2)}
            </p>
            <Trash onClick={() => handleCartItemDelete(cartItem)} className="w-4 h-4 cursor-pointer mt-1" size={20} />
        </div>
    </div>;
}

export default UserCartItemsContent;