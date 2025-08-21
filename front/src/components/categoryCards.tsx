interface CategoryCardsProps{
    title: string,
    numOfItems: number,
    image: string
}

export default function CategoryCards(props: CategoryCardsProps){
    return (
        <div className="relative w-81 h-81 justify-center items-center bg-gradient-to-b from-[#EAEAEA] to-[#666666] rounded-xl cursor-pointer">
            <img src={props.image} alt="" className="opacity-20 w-81 h-81"/>

            <div className="flex flex-col absolute bottom-4 left-4">
                <label className="text-white text-lg font-semibold">{props.title}</label>

                <label className="text-white text-sm">{props.numOfItems}+ items</label>
            </div>
        </div>
    )
}