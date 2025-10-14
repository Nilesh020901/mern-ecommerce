import { filterOptions } from "@/config";


function ProductFilter() {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map((filterOption) => 
                        <>
                            <div>
                                <h3 className="text-base font-medium">{filterOption}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProductFilter;