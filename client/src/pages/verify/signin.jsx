

import CommonForm from "@/components/common/Form";
import { signinFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    email: '',
    password: '',
}
function Signin() {

    const [formData, setFormData] = useState(initialState);

    function onSubmit(e) {
        e.preventDefault();
        console.log(formData);
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