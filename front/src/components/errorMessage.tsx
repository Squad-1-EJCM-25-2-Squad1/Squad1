export default function ErrorMessage({message}: {message: string | undefined}){
    return(
        <span className="text-red-500 text-xs font-bold -mt-2">{message}</span>
    )
}