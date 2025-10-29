import { useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddress } from "@/store/shop/address-slice";


const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}
function Address() {

    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    const {addressList} = useSelector((state) => state.shopAddress); 

    function handleManageAddress(e) {
        e.preventDefault();
        dispatch(addNewAddress({ ...formData, userId: user?.userId }))
        .then((data) => {
            if (data?.payload?.success) {
               dispatch(fetchAllAddress(user?.userId))
               setFormData(initialAddressFormData);
            }
        })
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);
    }
    return (
        <Card>
            <div>
                AddressList
            </div>
            <CardHeader>Add New Address</CardHeader>
            <CardContent className="space-y-3">
                <CommonForm 
                    formFields={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    );
}

export default Address;