import { SuscriptionsCard } from "../../Components/SuscriptionCard"
import "../../Components/css/BackgroundRadius.css"
import { NextClass } from "../../Components/NextClass"
import { UserNavBar } from "../../Components/UserNavBar"
import { useUser } from "../../Components/API/UserContext"
import { subscriptionByUser } from "../../Components/API/subscriptions"
import { useEffect, useState } from "react"
import { GetNextClass } from "../../Components/API/Schedule"
import Spinner from "../../Components/Spinner"
const Menu = () => {

    const { userData } = useUser();
    const [suscriptionData, setSuscriptionData] = useState();
    const [nextClassData, setNextClassData] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingNextClass, setLoadingNextClass] = useState(true);
    const userDataString = localStorage.getItem("userData");
    const LocaluserData = userDataString ? JSON.parse(userDataString) : null;

    const fetchData = async () => {
        console.log(userData)
        const payload = {
            userId: LocaluserData.id,
        };
        try {
            const data = await subscriptionByUser(payload);
            const datasuscripcion = JSON.parse(JSON.stringify(data[0]));
            setSuscriptionData(datasuscripcion);
        } catch {
            console.log("error al obtener las suscripciones activas");
        }
        try {
            const NextClass = await GetNextClass(LocaluserData.id);
            setNextClassData(NextClass);
        } catch {
            console.log("error al obtener la siguiente clase.");
        }
        setLoading(false)
        setLoadingNextClass(false)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
                <div className="w-full flex justify-center items-center flex-col ">
                    <h1 className="text-2xl font-bold ">Bienvenido </h1>
                    <h2 className="text-2xl font-bold  mb-10">{userData.name}</h2>

                </div>
                <h1 className="text-2xl font-semibold text-gray-700 mb-5">Tu Plan</h1>
                <div >
                    {loading ? (
                        <div className="relative flex justify-center items-center min-h-[200px]">
                            <Spinner />
                        </div>
                    ) : (
                        <SuscriptionsCard suscriptionData={suscriptionData} />
                    )}
                </div>
                <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Siguiente Clase</h1>
                <div >
                    {loadingNextClass ? (
                        <div className="relative flex justify-center items-center min-h-[200px]">
                            <Spinner />
                        </div>
                    ) : (
                        <NextClass nextClassData={nextClassData} />)}
                </div>


            </section>
            <UserNavBar />
        </>
    )
}

export default Menu;