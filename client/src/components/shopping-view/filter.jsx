import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";


function ProductFilter({filters, handleFilterChange}) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map((filterOption) => 
                        <>
                            <div>
                                <h3 className="text-lg font-semibold">{filterOption}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filterOptions[filterOption].map((option) => <Label className="flex items-center gap-2 font-medium">
                                            <Checkbox checked={filters && Object.keys(filters).length > 0 && filters[filterOption] && filters[filterOption].indexOf(option.id) > -1}  onCheckedChange={() => handleFilterChange(filterOption, option.id)} />
                                            {option.label}
                                        </Label>)
                                    }
                                </div>
                            </div>
                            <Separator  />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProductFilter;