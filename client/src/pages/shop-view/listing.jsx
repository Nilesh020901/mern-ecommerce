import ProductFilter from "../../components/shopping-view/filter";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice.js";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailDialog from "@/components/shopping-view/product-detail";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }

    return queryParams.join("&");
}

function ShoppingListing() {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({});
    const [sortBy, setSortBy] = useState("price-lowtohigh");
    const [open, setOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFromURL = searchParams.get("category");

    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const { user } = useSelector(state => state.auth);

    const { toast } = useToast();

    useEffect(() => {
        const initialFilter = {};

        if (categoryFromURL) {
            initialFilter.category = [categoryFromURL];
        }

        setFilter(initialFilter);
    }, [categoryFromURL]);

    function handleFilterChange(sectionId, option) {
        let updated = { ...filter };

        if (!updated[sectionId]) {
            updated[sectionId] = [option];
        } else {
            if (updated[sectionId].includes(option)) {
                updated[sectionId] = updated[sectionId].filter((i) => i !== option);
            } else {
                updated[sectionId].push(option);
            }
        }

        setFilter(updated);

        const qs = createSearchParamsHelper(updated);
        setSearchParams(qs);
    }

    useEffect(() => {
        if (!sortBy) return;

        dispatch(fetchAllFilteredProducts({ filterParams: filter, sortParams: sortBy }));
    }, [dispatch, filter, sortBy]);

    function handleGetProductDetails(id) {
        dispatch(fetchProductDetails(id));
    }

    useEffect(() => {
        if (productDetails) setOpen(true);
    }, [productDetails]);

    function handleAddToCart(productId) {
        if (!user || !user?.userId) return;

        dispatch(addToCart({ userId: user.userId, productId, quantity: 1 }))
            .then((res) => {
                if (res?.payload?.success) {
                    dispatch(fetchCartItems({ userId: user?.userId }));
                    toast({ title: "Product added to cart successfully!" });
                }
            });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filter} handleFilterChange={handleFilterChange} />

            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-xl font-bold">All Products</h2>

                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {productList?.length} Products
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="w-4 h-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup
                                    value={sortBy}
                                    onValueChange={(v) => setSortBy(v)}
                                >
                                    {sortOptions.map((s) => (
                                        <DropdownMenuRadioItem key={s.id} value={s.id}>
                                            {s.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {productList && productList.length > 0 ? (
                        productList.map((p) => (
                            <ShoppingProductTile
                                key={p._id}
                                product={p}
                                handleAddToCart={handleAddToCart}
                                handleGetProductDetails={handleGetProductDetails}
                            />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground col-span-full">
                            No products found.
                        </p>
                    )}
                </div>
            </div>

            <ProductDetailDialog open={open} setOpen={setOpen} productDetails={productDetails} />
        </div>
    );
}

export default ShoppingListing;
