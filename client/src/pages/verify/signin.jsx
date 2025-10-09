import CommonForm from "@/components/common/Form";
import { signinFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    email: '',
    password: '',
}
function Signin() {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        console.log(formData);
        dispatch(loginUser(formData)).then(data => {
            console.log(data);
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message || "Logged in Successfully",
                    variant: "success"
                })
                // navigate("/")
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
            <h1 className="text-exl font-bold tracking-tighter text-foreground">Login an account</h1>
            <p className="mt-2">Don't have an account? <Link to="/verify/signup" className="ml-2 font-medium text-primary hover:underline">Sign Up</Link></p>
        </div>
        <CommonForm 
            formFields={signinFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
        />
    </div>
}

export default Signin;