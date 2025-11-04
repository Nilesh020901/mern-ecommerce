import { MapPinPen, MapPinX } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
    return (
        <Card>
            <CardContent className="grid p-4 gap-4">
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>pincode: {addressInfo?.pincode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="p-3 flex justify-end gap-2">
                <button title="edit" onClick={()=> handleEditAddress(addressInfo)}><MapPinPen  /></button>
                <button title="delete" onClick={()=> handleDeleteAddress(addressInfo)}><MapPinX /></button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard;