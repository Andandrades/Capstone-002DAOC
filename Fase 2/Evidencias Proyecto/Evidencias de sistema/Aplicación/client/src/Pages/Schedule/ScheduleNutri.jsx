import { useEffect, useState } from "react";
import { UserNavBar } from "../../Components/UserNavBar";


export const ScheduleNutri = () => {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [appointments, setAppointments] = useState([])

    const getHours = async () => {
        try {
            const resultado = await fetch(`${import.meta.env.VITE_API_URL}/nutriScheduleDate/${date}`, {
                method: "GET",
            })

            const data = await resultado.json()

            setAppointments(data)


        } catch (error) {
            console.log(error)
        }



    }

    useEffect(() => {
        getHours()
    }, [])

    useEffect(() => {
        console.log(appointments)
    }, [appointments])

    return (
        <section className="w-full h-screen flex justify-start relative flex-col">
            <div className="w-full flex justify-center mt-10 text-center">
                <h1 className="text-3xl font-bold">Nutricionista</h1>

            </div>
            <div className="w-full px-6 flex flex-col justify-start">
                {appointments ? <p>Encontrado</p> : <p>No encontrado</p> }
            </div>
            <UserNavBar />
        </section>
    )
}

export default ScheduleNutri;