interface ColorSelectionProps{
    bgColor: string,
    onStock: boolean;
    selectedColor: string;
    onClick: (color: string) => void
}

export default function ColorSelection(props: ColorSelectionProps){
    let isSelected = props.selectedColor === props.bgColor;

    const borderColor = isSelected ? "border-purple-600" : "border-gray-300" 

    let bgOpacity = "opacity-100"

    if(!props.onStock){
        bgOpacity = "opacity-20"
    }

    return(
        <button disabled={!props.onStock} onClick={() => props.onClick(props.bgColor)} style={{ backgroundColor: props.bgColor }} className={`flex justify-center items-center w-10 h-10 rounded-full border-2 ${borderColor} ${bgOpacity} cursor-pointer`}>
            {!props.onStock && (<div className="w-7 h-1 rotate-45 bg-red-500"/>)}
        </button>
    )
}