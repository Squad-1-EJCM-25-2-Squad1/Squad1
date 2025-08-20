import { useState } from "react";
import wishlist from "../assets/home/favorito.svg";
import wishlisted from "../assets/sales/wishlisted.svg";

interface ItemCardProps{
    image: string,
    discount: number,
}

export default function ItemCard(props: ItemCardProps){

    const [wishlistedItem, setWishlistedItem] = useState<boolean>(false)

    return(
        <div className="relative flex items-center justify-center bg-gray-300 w-85 lg:w-100 xl:w-125 2xl:w-165 h-85 lg:h-100 xl:h-125 2xl:h-165">
            <img src={props.image} alt="" className="opacity-20"/>
            
            <span className="absolute text-white text-xs font-semibold py-1 px-3 rounded-full bg-red-600 top-4 left-4">-{props.discount}%</span>

            <button onClick={() => setWishlistedItem(!wishlistedItem)} className="absolute top-4 right-4 bg-white rounded-xl p-4
            transition duration-300 ease-in-out filter brightness-100 hover:brightness-90 cursor-pointer">
                {!wishlistedItem && (
                    <img src={wishlist} alt=""/>
                )}

                {wishlistedItem && (
                    <img src={wishlisted} alt=""/>
                )}
            </button>
        </div>
    )
}