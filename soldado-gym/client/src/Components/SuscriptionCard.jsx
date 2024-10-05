import Garant from "../assets/Guarantee.svg"
import Bookmark from "../assets/Bookmark.svg"
import Plus from "../assets/Plus.svg"


export const SuscriptionsCard = () => {
    return (
        <div className="w-full">
            <div className=" flex flex-col relative bg-white px-4 py-6 rounded-lg text-[20px]">
                <img src={Garant} className="absolute top-[-10px] left-[-10px]" alt="" />
                <h1 className="mb-3">Plan Estandar</h1>
                <div className="h-[3px] rounded-full w-full bg-button-primary mb-3"></div>
                <ul className="px-2">
                    <li className="flex justify-start gap-2 items-center" > <img src={Bookmark} alt="" className="w-[34px]"/> Clases del plan: 10</li>
                    <li className="flex justify-start gap-2 items-center" > <img src={Plus} alt="" /> Clases restantes: 3</li>
                </ul>
                <button className="w-full bg-button-primary mt-5 py-2 rounded-lg"><p className="text-white">Más Información</p></button>
            </div>
        </div>

    )
}