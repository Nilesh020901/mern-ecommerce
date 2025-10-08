import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    username: '',
    email: '',
    password: '',
}
function Signup() {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    function onSubmit(e) {
        e.preventDefault();
        console.log(formData);
        dispatch(registerUser(formData)).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                toast({
                    title : data?.payload?.message || "Registered Successfully",
                    variant : "success"
                })
                navigate("/verify/signin");
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                })
            }
        });
    }
    return <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-exl font-bold tracking-tighter text-foreground">Create new account</h1>
            <p className="mt-2">Already have an account? <Link to="/verify/signin" className="ml-2 font-medium text-primary hover:underline">Login</Link></p>
        </div>
        <CommonForm 
            formFields={registerFormControls}
            buttonText={"Sign Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
        />
    </div>
}

export default Signup;