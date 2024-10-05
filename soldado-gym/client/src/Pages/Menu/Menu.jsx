import { SuscriptionsCard } from "../../Components/SuscriptionCard"
import "../../Components/css/BackgroundRadius.css"

export const Menu = () => {
    return (
        <section className="w-full flex justify-center flex-col px-4 backgroundPrimary h-[100vh]">
            <div className="w-full px-10 flex justify-center items-center">
                <h1>Bienvenido Example</h1>
            </div>
            <SuscriptionsCard />
        </section>
    )
}