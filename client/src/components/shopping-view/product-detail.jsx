import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

function ProductDetailDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className="aspect-square w-full object-cover rounded-lg" />
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl text-primary font-bold ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>${productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? (
                                <p className="text-2xl text-muted-foreground font-bold">${productDetails?.salePrice}</p>
                            ) : (null)
                        }
                    </div>
                    <div className="mt-5">
                        <Button>Add to Cart</Button>
                    </div>
                    <Separator />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailDialog;