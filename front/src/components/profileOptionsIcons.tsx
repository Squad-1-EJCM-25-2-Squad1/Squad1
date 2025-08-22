import { useNavigate } from "react-router-dom"

interface ProfileOptionsIconsProps{
    image: string,
    label: string,
    userTab?: boolean
}

export default function ProfileOptionsIcons (props: ProfileOptionsIconsProps){
    
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/me");
    }

    return(
        <button onClick={props.userTab ? handleClick : undefined} className="flex w-[fit-content] gap-2 px-3 cursor-pointer text-gray-950 text-md font-normal">
            <img src={props.image} alt=""/>
            {props.label}
        </button>
    )
}