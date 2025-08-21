import ProfileOptionsIcons from "./profileOptionsIcons"
import profile from "../assets/home/profile.svg"
import orders from "../assets/home/orders.svg"
import wishlist from "../assets/home/favorito.svg"
import settings from "../assets/home/settings.svg"
import signOut from "../assets/home/signOut.svg"
import { useAuthContext } from "../contexts/Auth.Context"

interface ProfileOptionsProps{
    name: string,
    email: string
}

export default function ProfileOptions (props: ProfileOptionsProps){

    const { handleLogout } = useAuthContext();

    return (
        <div className="flex flex-col max-w-60 py-3 border-1 border-gray-500 shadow-xl rounded-xl gap-2 absolute top-12 md:top-25 md:right-5 z-20 bg-white">
            <div className="flex flex-col px-3 gap-1">
                <label className="text-gray-950 text-lg font-bold">{props.name}</label>

                <label className="text-gray-500 text-md font-normal">{props.email}</label>
            </div>

            <div className="flex flex-col gap-1 border-y border-gray-500">
                <ProfileOptionsIcons
                    image={profile}
                    label="Profile"
                />

                <ProfileOptionsIcons
                    image={orders}
                    label="Orders"
                />

                <ProfileOptionsIcons
                    image={wishlist}
                    label="Whishlist"
                />

                <ProfileOptionsIcons
                    image={settings}
                    label="Settings"
                />
            </div>

            <button onClick={() => handleLogout()}>
                <ProfileOptionsIcons
                    image={signOut}
                    label="Sign out"
                />
            </button>
        </div>
    )
}