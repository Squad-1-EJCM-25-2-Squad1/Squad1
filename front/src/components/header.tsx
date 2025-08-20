import logo from "../assets/home/logo.svg"
import lupa from "../assets/home/lupa.svg"
import favorito from "../assets/home/favorito.svg"
import carrinho from "../assets/home/carrinho.svg"
import hamburger from "../assets/home/hamburger.svg"
import { useState } from "react"
import ProfileOptions from "./profileOptions"

export default function Header(){
    const [mobileSearch, setMobileSearch] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [profileTab, setProfileTab] = useState<boolean>(false);

    return(
        <header className="flex flex-col">
            <div className="flex w-full justify-center p-2  bg-[#030711]">
                <label className="text-[#F9FAFB] text-center text-sm">Free shipping on orders over $100 | New arrivals daily</label>
            </div>

            <div className="flex w-full justify-around border-b-1 border-b-[#E5E7EB] py-4 md:px-5">
                <img src={hamburger} alt="" className="md:hidden cursor-pointer"/>

                <button className="flex gap-2 items-center font-bold text-base md:text-xl cursor-pointer">
                    <img src={logo} alt=""/>
                    STYLE
                </button>

                <ul className="gap-8 hidden lg:flex">
                    <button className="cursor-pointer text-base">New In</button>
                    <button className="cursor-pointer text-base">Women</button>
                    <button className="cursor-pointer text-base">Men</button>
                    <button className="cursor-pointer text-base">Sale</button>
                </ul>

                <div className="relative flex gap-2 md:hidden">
                    {
                        !mobileSearch && input === "" &&(
                            <>
                                <button onClick={() => setMobileSearch(!mobileSearch)} className="flex justify-center items-center h-10 w-10">
                                    <img src={lupa} alt="" className="cursor-pointer"/>
                                </button>

                                <button className="flex justify-center items-center h-10 w-10">
                                    <img src={favorito} alt="" className="cursor-pointer"/>
                                </button>

                                <button onClick={() => setProfileTab(!profileTab)}>
                                    <div className="flex justify-center items-center w-10 h-10 rounded-full font-semibold bg-[#F3F4F6] cursor-pointer">
                                        JD
                                    </div>
                                </button>

                                <button className="flex justify-center items-center h-10 w-10">
                                    <img src={carrinho} alt="" className="cursor-pointer"/>
                                </button>
                                
                                
                                {profileTab && (
                                    <ProfileOptions
                                        name= "John Doe"
                                        email= "johndoe@example.com"
                                    />
                                )}
                                    
                            </>

                        )
                    }

                    {
                        (mobileSearch || input != "") &&(
                            <div className="relative md:hidden">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <img src={lupa} className=""/>
                                </div>

                                <input type= "text" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setMobileSearch(true)} onBlur={() => {
                                    setMobileSearch(false);
                                    setProfileTab(false)
                                }}
                                    placeholder= "Search for products..." className="h-10 w-60 bg-[#F8F9FA] rounded-lg pl-10"></input>
                            </div>
                        )
                    }
                </div>

                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img src={lupa} className=""/>
                    </div>

                    <input type= "text" value={input} onChange={(e) => setInput(e.target.value)} placeholder= "Search for products..." className="h-10 w-96 bg-[#F8F9FA] rounded-lg pl-10"></input>
                </div>

                <div className="hidden md:flex md:gap-2">
                    <button className="flex justify-center items-center h-10 w-10">
                        <img src={favorito} alt="" className="cursor-pointer"/>
                    </button>

                    <button onClick={() => setProfileTab(!profileTab)}>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full font-semibold bg-[#F3F4F6] cursor-pointer">
                            JD
                        </div>
                    </button>

                    <button className="flex justify-center items-center h-10 w-10">
                        <img src={carrinho} alt="" className="cursor-pointer"/>
                    </button>

                    {profileTab && (
                        <ProfileOptions
                            name= "John Doe"
                            email= "johndoe@example.com"
                        />
                    )}
                </div>
            </div>
        </header>
    )
}