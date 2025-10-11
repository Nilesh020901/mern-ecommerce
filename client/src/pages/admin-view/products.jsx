import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState } from "react";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    salePrice: '',
    totalStock: '',
}

function AdminProducts() {

    const [openCreateProduct, setOpenCreateProduct] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    function onSubmit() {
        console.log(formData);
    }
    return (
        <>
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => setOpenCreateProduct(true)}>Add Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                <Sheet open={openCreateProduct} onOpenChange={() => { setOpenCreateProduct(false) }}>
                    <SheetContent side="right" className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle>Add New Product</SheetTitle>
                        </SheetHeader>
                        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoading={imageLoading} setImageLoading={setImageLoading} />
                        <div className="py-6">
                            <CommonForm formFields={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='Add' onSubmit={onSubmit} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default AdminProducts;