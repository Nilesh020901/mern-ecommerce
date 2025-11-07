import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const { productList } = useSelector(state => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        currentEditedId !== null ? 
        dispatch(editProduct({
            id: currentEditedId, formData
        })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProduct(false);
                setCurrentEditedId(null);
                toast({
                    title: 'Product edited successfully'
                })
            }
        }) :
        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl
        })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProduct(false);
                toast({
                    title: 'Product add successfully'
                })
            }
        })
    }

    function isFormValid() {
        return Object.keys(formData)
            .map(key => formData[key] !== '')
            .every(item => item)
    }

    function handleDelete(getcurrentId) {
        console.log("call-del",getcurrentId);
        dispatch(deleteProduct(getcurrentId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                toast({
                    title: 'Product deleted successfully'
                })
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    console.log("call-formData", uploadedImageUrl, formData);
    return (
        <>
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => setOpenCreateProduct(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ? 
                    productList.map(productItem => (
                    <AdminProductTile 
                        setFormData={setFormData} 
                        setOpenCreateProduct={setOpenCreateProduct} 
                        setCurrentEditedId={setCurrentEditedId} key={productItem._id} 
                        product={productItem}
                        handleDelete={handleDelete}
                    />
                    )) 
                    : null
                }
            </div>
            <Sheet 
                open={openCreateProduct} 
                onOpenChange={() => { 
                    setOpenCreateProduct(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                 }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload isEditMode={currentEditedId !== null} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoading={imageLoading} setImageLoading={setImageLoading} />
                    <div className="py-6">
                        <CommonForm 
                            formFields={addProductFormElements} 
                            formData={formData} 
                            setFormData={setFormData} 
                            buttonText={ currentEditedId !== null ? 'Edit' : 'Add' } 
                            onSubmit={onSubmit}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default AdminProducts;