import ProductFilter from "../../components/shopping-view/filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice.js";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

function  ShoppingListing() {

    const [filter, setFilter] = useState({});
    const [sortBy, setSortBy] = useState(null);
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.shopProducts);

    function handleSortChange(value) {
        console.log("call-short", value)
        setSortBy(value);
    };

    function handleFilterChange(getSectionId, getCurrentOption) {
        console.log("call-filter", getSectionId, getCurrentOption);
        let cpyFilters = { ...filter};
        const indexOfCurrentOption = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentOption === -1) {
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
                sessionStorage.setItem('filter', JSON.stringify(cpyFilters));
            }
        }

        console.log("cpyFilters", cpyFilters);
        setFilter(cpyFilters);
    }

    useEffect(() => {
        setSortBy("price-lowtohigh");
        setFilter(JSON.parse(sessionStorage.getItem('filter')) || {});
    }, []);

    console.log("call-filter", filter, sortBy);
    //fetch list of products from backend
    useEffect(() => {
        dispatch(fetchAllFilteredProducts());
        
    }, [dispatch]);

    console.log("call-uproducts", productList)
    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
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
                            <ShoppingProductTile product={product} />
                        ) : (<p className="text-center text-muted-foreground col-span-full">No products found.</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing;