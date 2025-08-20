interface SaleCardProps{
    infoTag: string,
    title: string,
    image: string,
    categoryTag: string,
    rating: number,
    numOfReviews: number,
    price: number,
    oldPrice: number
}

import wishlist from "../assets/home/favorito.svg";
import rating from "../assets/home/ratingStar.svg";
import cart from "../assets/sales/whiteCart.svg";
import wishlisted from "../assets/sales/wishlisted.svg";
import { useState } from "react";

export default function SaleCard(props: SaleCardProps){
    const percentageDiscount = Math.round((props.oldPrice -props.price)/props.oldPrice * 100);

    const discount = props.oldPrice - props.price;

    const [wishlistedItem, setWishlistedItem] = useState<boolean>(false)

    return(
    <div className="flex flex-col shadow-md w-80 rounded-xl">
        <div className="relative w-full cursor-pointer">
            <img src={props.image} alt="" className="opacity-5 bg-gray-500 rounded-t-xl"/>

            <div className="absolute top-3 left-3 bg-red-600 rounded-full py-1 px-3 text-white text-xs font-semibold text-center">
                -{percentageDiscount}%
            </div>

            <div className="absolute top-3 right-3 bg-gray-100 rounded-full py-1 px-3 text-gray-950 text-xs font-semibold text-center">
                {props.infoTag}
            </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="rounded-full py-1 px-3 text-gray-950 text-xs font-semibold text-center border border-gray-400">{props.categoryTag}</div>

                    <div className="flex gap-1 items-center">
                        <img src={rating} alt=""/>

                        <label className="text-gray-950 text-sm font-semibold">{props.rating}</label>

                        <label className="text-gray-500 text-sm font-normal">({props.numOfReviews})</label>
                    </div>
                </div>

                <label className="text-gray-950 text-lg font-semibold">{props.title}</label>

                <div className="flex gap-2 items-center">
                    <label className="text-red-600 text-2xl font-bold">${props.price}</label>

                    <label className="text-gray-500 text-lg font-normal line-through">${props.oldPrice}</label>

                    <div className="px-3 py-1 bg-red-500 text-gray-50 text-xs font-semibold text-center rounded-full">Save ${discount}</div>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex flex-grow justify-center items-center gap-2 w-50 h-10 bg-black rounded-xl text-gray-50 text-sm font-semibold cursor-pointer">
                    <img src={cart} alt=""/>

                    Add to Cart
                </button>

                <button onClick={() => setWishlistedItem(!wishlistedItem)} className="flex justify-center items-center w-10 h-10 border border-gray-400 bg-white rounded-xl cursor-pointer
                transition duration-300 ease-in-out filter brightness-100 hover:brightness-95">
                    {!wishlistedItem && (
                        <img src={wishlist} alt=""/>
                    )}
                    {wishlistedItem && (
                        <img src={wishlisted} alt=""/>
                    )}
                </button>
            </div>
        </div>
    </div>
    )
}