interface FooterProps{
    title: string,
    subtitle: string,
    color: string
    color2?: string,
}

export default function (props: FooterProps){
    let dynamicBackground;
    if(!props.color2){
        dynamicBackground = `bg-[${props.color}]`
    }
    else{
        dynamicBackground = `bg-gradient-to-l from-[${props.color}] to-[${props.color2}]`
    }

    return (
        <footer className= {`flex flex-col items-center w-full py-20 px-4 md:px-20 ${dynamicBackground}`}>
            <label className="text-gray-50 text-4xl font-bold text-center">{props.title}</label>

            <label className="text-gray-50 text-xl font-normal text-center w-full md:w-1/2 lg:1/3 p-4">{props.subtitle}</label>

            <div className="flex w-full flex-col md:flex-row md:justify-center items-center gap-4">
                <input type="email" placeholder="Enter your email" className="w-full md:w-75 px-4 py-3 text-gray-400 text-base font-normal bg-white rounded-lg"></input>

                <button className="w-full md:w-auto px-8 py-3 text-gray-950 text-sm font-semibold rounded-2xl bg-white cursor-pointer">Subscribe</button>
            </div>
        </footer>
    )
}