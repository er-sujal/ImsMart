// import React, { useState } from "react";
// import './css/LoginSignUp.css'

// const LoginSignUp = () =>
// {
//     const [state,setState]= useState("Login");
//     const [formData,setFormData] = useState({
//         username:"",
//         password:"",
//         email:""
//     })

//     const changeHandler = (e) =>{
//         setFormData({...formData,[e.target.name]:e.target.value})
//     }

    // const login = async () =>{
    //     console.log("Login",formData)
    //     let responseData;
    //     await fetch('http://localhost:4000/login',{
    //         method:'POST',
    //         headers:{
    //             Accept:"application/form-data",
    //             'Content-Type':'application/json',  
    //         },
    //         body: JSON.stringify(formData),
    //     }).then((response)=> response.json()).then((data)=>responseData=data)

    //     if(responseData.success){
    //         localStorage.setItem('auth-token',responseData.token);
    //         window.location.replace('/')
    //     }
    //     else{
    //         alert(responseData.errors)
    //     }
    // }

    // const signup = async () =>{
    //     console.log("Singup",formData)
    //     let responseData;
    //     await fetch('http://localhost:4000/signup',{
    //         method:'POST',
    //         headers:{
    //             Accept:"application/form-data",
    //             'Content-Type':'application/json',  
    //         },
    //         body: JSON.stringify(formData),
    //     }).then((response)=> response.json()).then((data)=>responseData=data)

    //     if(responseData.success){
    //         localStorage.setItem('auth-token',responseData.token);
    //         window.location.replace('/')
    //     }
    //     else{
    //         alert(responseData.errors)
    //     }
    // }

//     return(
//         <div className="loginsignup">
//             <div className="loginsignup-countainer">
//                 <h1>{state}</h1>
//                 <div className="loginsignup-fields">
//                     {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="name" />:<></>}
//                     <input type="email" name="email" value={formData.email} onChange={changeHandler} id="" placeholder="abc@email.domain" />
//                     <input type="password" name="password" value={formData.password} onChange={changeHandler} id="" placeholder="**********" />
//                 </div>
//                 <button onClick={()=>{state==="Login"?login():signup()}}>Countinue</button>
//                 {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p>:<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span> </p>}
//                 <div className="loginsignup-aggry">
//                     <input type="checkbox" name="" id="" />
//                     <p>I accept All terms of use & privacy policy.</p>
//                 </div>
//             </div>
            
//         </div>
//     )
// }

// export default LoginSignUp


import React, { useState } from "react";
import "./css/LoginSignUp.css";

const LoginSignUp = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (state === "Sign Up") {
            validateField(name, value);
        }
    };

    const validateEmail = (email) => {
        const reputableDomains = [
            "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "icloud.com",
            "protonmail.com",
        ]; 
        const domain = email.split('@')[1];
        return /\S+@\S+\.\S+/.test(email) && reputableDomains.includes(domain);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateConfirmPassword = (confirmPassword) => {
        return confirmPassword === formData.password;
    };

    const validateField = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "username":
                if (!value) {
                    error = "This field is required";
                }
                break;
            case "email":
                if (!value) {
                    error = "This field is required";
                } else if (!validateEmail(value)) {
                    error = "Invalid email address";
                }
                break;
            case "password":
                if (!value) {
                    error = "Password is required";
                } else if (value.length < 8) {
                    error = "Password must be at least 8 characters long";
                } else if (!/[A-Z]/.test(value)) {
                    error = "Password must contain at least one uppercase letter";
                } else if (!/[a-z]/.test(value)) {
                    error = "Password must contain at least one lowercase letter";
                } else if (!/\d/.test(value)) {
                    error = "Password must contain at least one number";
                } else if (!/[@$!%*?&]/.test(value)) {
                    error = "Password must contain at least one special character";
                }
                break;
            case "confirmPassword":
                if (!value) {
                    error = "This field is required";
                } else if (value !== formData.password) {
                    error = "Passwords do not match";
                }
                break;
            default:
                break;
        }
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };
    

    const handleValidation = () => {
        let isValid = true;
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (state === "Sign Up") {
                    validateField(key, formData[key]);
                    if (errors[key]) {
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    };

    const login = async () =>{
        console.log("Login",formData)
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:"application/form-data",
                'Content-Type':'application/json',  
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/')
        }
        else{
            alert(responseData.errors)
        }
    }

    const signup = async () =>{
        console.log("Singup",formData)
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:"application/form-data",
                'Content-Type':'application/json',  
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)
        if(responseData.success){
            alert("Signed up successfully! Please login.");
            window.location.replace('/login')
        }
        else{
            alert(responseData.errors)
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-countainer">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && (
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abc@email.domain"
                    />
                    {state === "Sign Up" && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="**********"
                    />
                    {state === "Sign Up" && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                    {state === "Sign Up" && (
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                    )}
                    {state === "Sign Up" && errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>
                <button onClick={state === "Login" ? login : signup}>
                    Continue
                </button>
                {state === "Sign Up" ? (
                    <p className="loginsignup-login">
                        Already have an account?{" "}
                        <span onClick={() => setState("Login")}>Login here</span>{" "}
                    </p>
                ) : (
                    <p className="loginsignup-login">
                        Create an account?{" "}
                        <span onClick={() => setState("Sign Up")}>Click here</span>{" "}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
