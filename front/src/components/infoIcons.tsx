interface InfoIconsProps{
    image: string,
    title: string,
    subtitle: string,
    hasBackground: boolean,
}

export default function InfoIcons(props: InfoIconsProps){
    return(
        <>
        {props.hasBackground ? (
            <div className="flex w-[440px] flex-col gap-4 justify-center items-center">
                <div className="flex justify-center items-center h-16 w-16 bg-[#E3E4E6] rounded-full">
                    <img src={props.image}/>
                </div>

                <span className="text-lg font-semibold">{props.title}</span>

                <span className="text-base text-[#6B7280] text-center">{props.subtitle}</span>
            </div>
        ) : (
            <div className="flex w-25 flex-col justify-center items-center">
                <div className="flex justify-center items-center mb-2">
                    <img src={props.image} className="w-6 h-6"/>
                </div>

                <span className="text-gray-950 text-sm font-semibold text-center whitespace-nowrap">{props.title}</span>

                <span className="text-gray-500 text-xs font-normal text-center">{props.subtitle}</span>
            </div>
        )}
        </>
    )
}