interface saleInfoProps{
    title: string,
    subtitle: string
}

export default function SaleInfo(props: saleInfoProps){
    return(
        <div className="flex flex-col">
            <label className="text-red-600 text-3xl font-bold text-center">{props.title}</label>
            <label className="text-gray-500 text-sm font-normal text-center">{props.subtitle}</label>
        </div>
    )
}