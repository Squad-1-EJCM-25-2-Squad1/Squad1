interface checkBoxProps{
    name: string,
    value: string
}

export default function CheckBox(props: checkBoxProps){
    return(
        <label className="flex gap-2 text-gray-950 text-sm font-semibold cursor-pointer">
            <input type="checkbox" name={props.name} value={props.value} className="cursor-pointer"/>
            {props.value}
        </label>
    )
}