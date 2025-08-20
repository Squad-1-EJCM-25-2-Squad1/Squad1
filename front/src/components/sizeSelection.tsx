interface SizeSelectionProps{
    size: string,
    onStock: boolean,
    selectedSize: string,
    onClick: (size: string) => void
}

export default function SizeSelection(props: SizeSelectionProps){

    let bgColor = "#FFFFFF"
    let bgOpacity = "opacity-100";
    if(!props.onStock){
        bgColor = "#F9F9FA"
        bgOpacity = "opacity-70";
    }
    
    const isSelected = props.selectedSize === props.size;
    const borderColor = isSelected ? "border-purple-600" : "border-gray-300";

    return(
        <button disabled={!props.onStock} onClick={() => props.onClick(props.size)} style={{backgroundColor: bgColor}}className={`flex justify-center items-center w-16 h-12 text-gray-950 text-base font-normal border-2 rounded-xl ${borderColor} ${bgOpacity} cursor-pointer`}>
            {props.size}
        </button>
    )
}