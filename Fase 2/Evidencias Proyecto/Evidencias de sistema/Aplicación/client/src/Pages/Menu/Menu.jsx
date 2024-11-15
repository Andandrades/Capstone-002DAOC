import { SuscriptionsCard } from "../../Components/SuscriptionCard"
import "../../Components/css/BackgroundRadius.css"
import { NextClass } from "../../Components/NextClass"
import { UserNavBar } from "../../Components/UserNavBar"
import { useUser } from "../../Components/API/UserContext"
import { subscriptionByUser } from "../../Components/API/subscriptions"
import { useEffect, useState } from "react"
const Menu = () => {

    const { userData } = useUser();
    const [suscriptionData, setSuscriptionData] = useState();

    const fetchData = async () => {
        const payload = {
            userId: userData.id,
        };
        try {
            const data = await subscriptionByUser(payload);
            const datasuscripcion = JSON.parse(JSON.stringify(data[0]));
            setSuscriptionData(datasuscripcion);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
                <div className="w-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold  mb-10">Bienvenido {userData.name}</h1>
                </div>
                <h1 className="text-2xl font-semibold text-gray-700 mb-5">Tu Plan</h1>
                <SuscriptionsCard 
                suscriptionData={suscriptionData} />
                <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Siguiente Clase</h1>
                <NextClass />

            </section>
            <UserNavBar />
        </>
    )
}

export default Menu;