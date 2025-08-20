import ratingStar from "../assets/home/ratingStar.svg";

interface RecommendationCardProps{
    image: string,
    title: string,
    rating: number,
    price: number,
    oldPrice?: number,
}

export default function RecommendationCard(props: RecommendationCardProps){
    return(
    <div className="flex flex-col w-85 rounded-xl shadow-lg">
        <img src={props.image} alt="" className="w-full bg-gray-300 opacity-20 rounded-t-xl"/>

        <div className="flex flex-col p-4">
            <span className="text-gray-950 text-base font-semibold mb-2">{props.title}</span>

            <div className="flex gap-1 items-center text-gray-950 text-sm font-normal mb-4">
                <img src={ratingStar} alt=""/>

                {props.rating}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <span className="text-gray-950 text-base font-bold">${props.price}</span>

                    {props.oldPrice && (
                        <span className="text-gray-500 text-sm font-normal line-through">${props.oldPrice}</span>
                    )}
                </div>

                <button className="px-3 py-2 border border-gray-300 rounded-xl text-gray-950 text-sm font-semibold cursor-pointer">
                    View
                </button>
            </div>
        </div>
    </div>
    )
}