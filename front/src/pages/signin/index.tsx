import Header from "../../components/header";
import logo from "../../assets/home/logo.svg";
import googleIcon from "../../assets/SignUp/googleIcon.svg";
import facebookIcon from "../../assets/SignUp/facebookIcon.svg";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/errorMessage";
import emailIcon from "../../assets/SignUp/emailIcon.svg";
import passwordIcon from "../../assets/SignUp/passwordIcon.svg";
import viewPassword from "../../assets/SignUp/viewPassword.svg";
import hidePassword from "../../assets/SignUp/hidePassword.svg";
import { useState } from "react";

const formSchema = z.object({
    email: z.email("Deve conter um email válido"),
    password: z.string().min(8, "Senha inválida")
});

type FormData = z.infer<typeof formSchema>;

export default function SignIn(){

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmitForm = (data: FormData) => {
        console.log(data)
    }


    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [inputTypePassword, setInputTypePassword] = useState<string>("password");

    function handlePassword(){
        setIsPasswordVisible(!isPasswordVisible);

        inputTypePassword === "password" ? setInputTypePassword("text") : setInputTypePassword("password");
    }

    return(
        <div className="flex flex-col">
            <Header/>

            <main className="flex flex-col gap-8 py-12 px-4 items-center">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-center gap-2 items-center text-gray-950 text-2xl font-bold">
                        <img src={logo} alt="" className="w-10 h-10"/>
                        STYLE
                    </div>

                    <span className="text-center text-gray-500 text-base font-normal">Welcome back to your account</span>
                </div>

                <div className="flex flex-col gap-6 p-6 shadow-xl rounded-xl md:w-112">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-gray-950 text-2xl font-bold text-center">Sign In</h1>

                        <span className="text-gray-500 text-base font-normal text-center">Enter your credentials to access your acount</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="w-full h-10 flex justify-center items-center gap-4 border border-gray-300 rounded-xl text-gray-950 text-sm font-semibold">
                            <img src={googleIcon} alt=""/>
                            
                            Continue with Google
                        </button>

                        <button className="w-full h-10 flex justify-center items-center gap-4 border border-gray-300 rounded-xl text-gray-950 text-sm font-semibold">
                            <img src={facebookIcon} alt=""/>

                            Continue with Facebook
                        </button>
                    </div>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-2 text-gray-500 text-xs font-normal">OR CREATE WITH EMAIL</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <span className="text-gray-950 text-sm font-semibold">Email address</span>
                            
                            <div className="flex gap-3 items-center border border-gray-300 rounded-lg pl-3">
                                <img src={emailIcon} alt=""/>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className=" w-full focus:outline-none h-10"
                                />
                            </div>

                            {errors?.email && (
                                <ErrorMessage
                                    message={errors.email.message}
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-950 text-sm font-semibold">Password</span>

                                <span className="text-gray-950 text-sm font-normal cursor-pointer hover:text-purple-500">Forgot password?</span>
                            </div>

                            <div className="flex gap-3 items-center border border-gray-300 rounded-lg px-3">
                                <img src={passwordIcon} alt=""/>

                                <input
                                    type={inputTypePassword}
                                    placeholder="Create a password"
                                    {...register("password")}
                                    className="w-full focus:outline-none h-10"
                                />

                                <button type="button" onClick={() => handlePassword()} className="cursor-pointer">
                                    {isPasswordVisible ? 
                                    <img src={hidePassword} alt="" className="w-6 h-6"/> :
                                    <img src={viewPassword} alt="" className="w-6 h-6"/>}
                                </button>
                            </div>

                                {errors?.password && (
                                    <ErrorMessage
                                        message={errors.password.message}
                                    />
                                )}
                        </div>

                        <button className="w-full h-11 bg-black text-white text-center items-center rounded-xl cursor-pointer">Sign In</button>      
                    </form>
                    
                    <div className="flex justify-center gap-1">
                        <span className="text-gray-500 text-sm font-normal">Don't have an account?</span>

                        <span className="text-gray-950 text-sm font-semibold cursor-pointer">Sign up</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm font-normal text-center">By signin in, you agree to our <span className="text-gray-950 text-sm font-normal cursor-pointer hover:text-purple-500">Terms of Service</span> and <span className="text-gray-950 text-sm font-normal cursor-pointer hover:text-purple-500">Privacy Policy</span></p>
            </main>
        </div>
    )
}