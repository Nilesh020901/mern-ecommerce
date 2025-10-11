import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileImageIcon, TrashIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, imageLoading, setImageLoading }) {

    const inputRef = useRef(null);

    const handleImageFileChange = (e) => {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        console.log("call-selectedFile", selectedFile);
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const uploadImageToCloudinary = async (file) => {
        setImageLoading(true);
        if (!file) return;
        const data = new FormData();
        data.append('my_image', file);
        try {
            const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
            console.log("Image upload response:", response);
            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.url);
            } else {
                console.error("Error uploading image:", response.data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setImageLoading(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary(imageFile);
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label htmlFor="product-image" className="mb-2 mt-4 block text-medium font-semibold">Upload Product Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4 mt-3">
                <Input id="image-upload" type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleImageFileChange} />
                {
                    !imageFile ? 
                        <Label htmlFor="image-upload" className="mt-2 flex flex-col items-center h-32 cursor-pointer justify-center text-sm">
                            <UploadCloudIcon className="mb-2 h-6 w-6 text-muted-foreground" />
                            <span>Drag & Drop or Click to upload image</span>
                        </Label>
                        : <div className="mt-2 flex items-center">
                            <div className="flex items-center justify-between w-full">
                                <FileImageIcon className="mr-2 h-6 w-6 text-primary" />
                                <span className="text-sm font-normal">{imageFile.name}</span>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                    <TrashIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;