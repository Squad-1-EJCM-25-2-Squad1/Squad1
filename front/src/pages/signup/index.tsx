import Header from "../../components/header";
import logo from "../../assets/home/logo.svg";
import googleIcon from "../../assets/SignUp/googleIcon.svg";
import facebookIcon from "../../assets/SignUp/facebookIcon.svg";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/errorMessage";
import emailIcon from "../../assets/SignUp/emailIcon.svg";
import userIcon from "../../assets/SignUp/userIcon.svg";
import passwordIcon from "../../assets/SignUp/passwordIcon.svg";
import viewPassword from "../../assets/SignUp/viewPassword.svg";
import hidePassword from "../../assets/SignUp/hidePassword.svg";
import { useState } from "react";

const formSchema = z.object({
    firstName: z.string().nonempty("O primeiro nome é obrigatório"),
    lastName: z.string().nonempty("O sobrenome é obrigatório"),
    email: z.email("Deve conter um email válido"),
    password: z.string().min(8, "Senha deve conter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Senha deve conter pelo menos 8 caracteres"),
    terms: z.literal(true, {
    message: "Você deve aceitar os termos e condições de uso",
    }),
    newsletterSubscription: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"]
});

type FormData = z.infer<typeof formSchema>;

export default function SignUp(){

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

    const [isCPasswordVisible, setIsCPasswordVisible] = useState<boolean>(false);
    const [inputTypeCPassword, setInputTypeCPassword] = useState<string>("password");

    function handleConfirmPassword(){
        setIsCPasswordVisible(!isCPasswordVisible);

        inputTypeCPassword === "password" ? setInputTypeCPassword("text") : setInputTypeCPassword("password");
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

                    <span className="text-center text-gray-500 text-base font-normal">Create your account and start shopping</span>
                </div>

                <div className="flex flex-col gap-6 p-6 shadow-xl rounded-xl md:w-112">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-gray-950 text-2xl font-bold text-center">Create Account</h1>

                        <span className="text-gray-500 text-base font-normal text-center">Join our community and discover amazing fashion</span>
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
                        <div className="flex justify-between">
                            <div className="flex flex-col w-45/100 gap-3">
                                <span className="text-gray-950 text-sm font-semibold">First name</span>

                                <div className="flex gap-3 items-center border border-gray-300 rounded-lg pl-3">
                                    <img src={userIcon} alt=""/>

                                    <input
                                        type="text"
                                        placeholder="First name"
                                        {...register("firstName")}
                                        className="w-full focus:outline-none h-10">
                                    </input>
                                </div>

                                {errors?.firstName && (
                                    <ErrorMessage
                                        message={errors.firstName.message}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col w-45/100 gap-3">
                                <span className="text-gray-950 text-sm font-semibold">Last name</span>

                                <input
                                    type="text"
                                    placeholder="Last name"
                                    {...register("lastName")}
                                    className="border border-gray-300 rounded-lg h-10 pl-3"
                                />

                                {errors?.lastName && (
                                    <ErrorMessage
                                        message={errors.lastName.message}
                                    />
                                )}
                            </div>
                        </div>
                        
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
                            <span className="text-gray-950 text-sm font-semibold">Password</span>

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

                        <div className="flex flex-col gap-3">
                            <span className="text-gray-950 text-sm font-semibold">Confirm password</span>

                            <div className="flex gap-3 items-center border border-gray-300 rounded-lg px-3">
                                <img src={passwordIcon} alt=""/>

                                <input
                                    type={inputTypeCPassword}
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                    className="w-full focus:outline-none h-10"
                                />
                                
                                <button type="button" onClick={() => handleConfirmPassword()} className="cursor-pointer">
                                    {isCPasswordVisible ? 
                                    <img src={hidePassword} alt="" className="w-6 h-6"/> :
                                    <img src={viewPassword} alt="" className="w-6 h-6"/>}
                                </button>
                            </div>


                            {errors?.confirmPassword && (
                                <ErrorMessage
                                    message={errors.confirmPassword.message}
                                />
                            )}
                        </div>


                        <div className="w-full flex gap-2">  
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("terms")}
                            />

                            <label htmlFor="terms" className="text-gray-950 text-sm font-semibold">I agree to the Terms of Service and Privacy Policy</label>
                        </div>

                        {errors?.terms && (
                            <ErrorMessage
                                message={errors.terms.message}
                            />
                        )}

                        <div className="w-full flex gap-2">  
                            <input
                                type="checkbox"
                                id="newsletterSubscription"
                                {...register("newsletterSubscription")}
                            />

                            <label htmlFor="newsletterSubscription" className="text-gray-950 text-sm font-semibold">Subscribe to our newsletter for exclusive offers and updates</label>
                        </div>

                        <button className="w-full h-11 bg-black text-white text-center items-center rounded-xl cursor-pointer">Create Account</button>      
                    </form>
                    
                    <div className="flex justify-center gap-1">
                        <span className="text-gray-500 text-sm font-normal">Already have an account?</span>

                        <span className="text-gray-950 text-sm font-semibold cursor-pointer">Sign in</span>
                    </div>
                </div>

            </main>
        </div>
    )
}