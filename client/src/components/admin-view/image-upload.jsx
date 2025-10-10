import { Input } from "../ui/input";
import { Label } from "../ui/label";

function ProductImageUpload(imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl) {
    return (
        <div className="w-full max-w-md mx-auto">
            <Label htmlFor="product-image" className="mb-2 mt-4 block text-medium font-semibold">Upload Product Image</Label>
            <div>
                <Input id="image-upload" type="file" accept="image/*" className="mt-1 hidden"  />
            </div>
        </div>
    )
}

export default ProductImageUpload;