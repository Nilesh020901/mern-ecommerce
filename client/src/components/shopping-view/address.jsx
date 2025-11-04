import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddress } from "@/store/shop/address-slice";
import AddressCard from "./addressCard";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}
function Address() {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();

    function handleManageAddress(e) {
        e.preventDefault();

        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData)
            toast({
                title: 'You can add max 3 address',
                variant: 'destructive',
            })

            return;
        }

        currentEditedId !== null ?
            dispatch(editaAddress({
                formData, userId: user?.userId, addressId: currentEditedId
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress({ userId: user?.userId }))
                    setCurrentEditedId(null)
                    setFormData(initialAddressFormData)
                    toast({
                        title: 'Address updated successfully'
                    })
                }
            })
            :
            dispatch(addNewAddress({ ...formData, userId: user?.userId }))
                .then((data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchAllAddress({ userId: user?.userId }));
                        setFormData(initialAddressFormData);
                        toast({
                            title: 'Address added successfully'
                        })
                    }
                })

    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.userId, addressId:getCurrentAddress._id })).then(data => {
            if(data?.payload?.success) {
                dispatch(fetchAllAddress({ userId: user?.userId }));
                toast({
                    title: 'Address deleted successfully'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city ?? '',
            phone: getCurrentAddress?.phone ?? '',
            pincode: getCurrentAddress?.pincode ?? '',
            notes: getCurrentAddress?.notes ?? ''
        })
        // dispatch(editaAddress({ ...formData, userId: user?.userId, addressId:getCurrentAddress._id }))
        //     .then((data) => {
        //         console.log("call-edit", data)
        //     })
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);
    }

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchAllAddress({ userId: user.userId }));
        }
    }, [dispatch, user?.userId]);

    console.log("call-addressList", addressList);
    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ? (
                        addressList.map(singleAddressItems=> (
                            <AddressCard 
                                handleDeleteAddress={handleDeleteAddress} 
                                addressInfo={singleAddressItems}
                                handleEditAddress={handleEditAddress}
                            />
                        ))
                    ) : (null)
                }
            </div>
            <CardHeader className="text-lg font-semibold">
                { currentEditedId !== null ? 'Edit Address' : 'Add New Address' }</CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formFields={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={    currentEditedId !== null ? 'Edit' : 'Add' }
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    );
}

export default Address;