import React from 'react'

import { SideMenu } from '../../Components/SideMenu'
import NutriImage from "../../assets/icons/Nutritionist.png"

export const NutriMenu = () => {

    const days = [
        { id: "L", dia: "Lunes" },
        { id: "M", dia: "Martes" },
        { id: "X", dia: "Miercoles" },
        { id: "J", dia: "Jueves" },
        { id: "V", dia: "Viernes" },
        { id: "S", dia: "Sabado" },
        { id: "D", dia: "Domingo" },
    ]

    const fetchHoursByDay = async (day) =>{
        const resultardo = await fetch(`${import.meta.env.VITE_API_URL}/nutriSchedule`)
    }

    return (
        <div className='h-screen flex'>
            <SideMenu />
            <div className='flex flex-col flex-1'>
                <div className='flex justify-start pl-6 text-center items-center'>
                    <img src={NutriImage} className='w-10' alt="NutriIcon" />
                    <h1 className='text-2xl font-semibold px-2 py-4'>Administracion de Horas Nutricionales</h1>
                </div>
                <div className='h-full flex justify-evenly pt-5 bg-slate-100'>
                    {days.map((day) => (
                        <div className='shadow-sm' id={day.id}>
                            <div className='w-52 bg-white rounded-t-md flex justify-center items-center flex-col'>
                                <div className='w-full flex justify-center'>
                                    <h1 className='text-gray-500 text-xl'>{day.dia}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
