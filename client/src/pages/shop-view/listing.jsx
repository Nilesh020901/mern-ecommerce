import ProductFilter from "../../components/shopping-view/filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice.js";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import {  useSearchParams } from "react-router-dom";
import ProductDetailDialog from "@/components/shopping-view/product-detail";
import { addToCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    console.log("call--params", queryParams)
    return queryParams.join('&');
}

function  ShoppingListing() {

    const [filter, setFilter] = useState({});
    const [sortBy, setSortBy] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useSelector(state => state.auth);
    const {toast} = useToast();
   
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector((state) => state.shopProducts);

    function handleSortChange(value) {
        console.log("call-short", value)
        setSortBy(value);
    };

    function handleFilterChange(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filter};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexOfCurrentOption === -1) {
                cpyFilters[getSectionId].push(getCurrentOption);
            } else {
                cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
            }

        }

        setFilter(cpyFilters);
        sessionStorage.setItem('filter', JSON.stringify(cpyFilters));
        console.log("cpyFilters", cpyFilters);
        
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddToCart(productId) {
        if (!user || !user?.userId) {
            console.warn("User not logged in. Cannot add to cart.");
            return;
        }
        dispatch(addToCart({ userId: user?.userId, productId: productId, quantity: 1 }))
        .then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems({ userId: user?.userId }));
                toast({
                    title: 'Product added to cart successfully!',
                })
            }
        });
    }

    useEffect(() => {
        setSortBy("price-lowtohigh");
        setFilter(JSON.parse(sessionStorage.getItem('filter')) || {});
    }, []);

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            let createQueryString = createSearchParamsHelper(filter);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filter])

    //fetch list of products from backend
    useEffect(() => {
        if (filter !== null && sortBy !== null) 
        dispatch(fetchAllFilteredProducts({ filterParams: filter, sortParams: sortBy }));
    }, [dispatch, sortBy, filter]);

    useEffect(() => {
        if (productDetails !== null) setOpen(true);
    }, [productDetails]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filter} handleFilterChange={handleFilterChange} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-xl font-bold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productList?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="w-4 h-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                                    {
                                        sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        productList && productList.length > 0 ? productList.map((product) => 
                            <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={product} handleAddToCart={handleAddToCart} />
                        ) : (<p className="text-center text-muted-foreground col-span-full">No products found.</p>)
                    }
                </div>
            </div>
            {/* need to complete */}
            <ProductDetailDialog open={open} setOpen={setOpen} productDetails={productDetails} />
        </div>
    )
}

export default ShoppingListing;