import { SuscriptionsCard } from "../../Components/SuscriptionCard"
import "../../Components/css/BackgroundRadius.css"
import { NextClass } from "../../Components/NextClass"
import { BottomNav } from "../../Components/BottomNav"

export const Menu = () => {
    return (
        <section className="w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
            <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl font-bold  mb-10">Bienvenido Example</h1>
            </div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-5">Tu Plan</h1>
            <SuscriptionsCard />
            <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Siguiente Clase</h1>
            <NextClass/>
            <BottomNav/>
        </section>
    )
}