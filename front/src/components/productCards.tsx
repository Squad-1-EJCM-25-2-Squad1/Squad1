import ratingStar from "../assets/home/ratingStar.svg"

interface ProductCardsProps{
    tag: string,
    title: string,
    image: string,
    rating: number,
    numOfReviews: number,
    price: number,
    oldPrice?: number
}

export default function ProductCards(props: ProductCardsProps){
    return (
        <div className="flex flex-col shadow-md">
            <div className="relative w-81 h-81 justify-center items-center bg-[#EAEAEA] rounded-xl cursor-pointer">
                <img src={props.image} alt="" className="opacity-20 w-81 h-81"/>

                <label className={`absolute top-3 left-3 py-2 px-3 text-gray-50 text-xs rounded-full ${props.tag === 'Sale' ? 'bg-red-500' : 'bg-black'}`}>{props.tag}</label>
            </div>

            <div className="flex flex-col w-81 p-4">
                <label className="text-gray-950 text-lg font-semibold">{props.title}</label>

                <div className="flex items-center gap-1">
                    <img src={ratingStar} alt=""/>

                    <label className="text-gray-950 text-sm font-semibold">{props.rating}</label>

                    <label className="text-gray-500 text-sm font-normal">({props.numOfReviews})</label>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <label className="text-gray-950 text-xl font-bold">${props.price}</label>

                        {props.oldPrice && <label className="text-gray-500 text-sm font-normal line-through">${props.oldPrice}</label>}
                    </div>

                    <button className="py-3 px-2 text-gray-950 text-sm font-semibold border-1 border-[#E5E7EB] rounded-xl cursor-pointer">Add to Cart</button>
                </div>

            </div>
        </div>
    )
}