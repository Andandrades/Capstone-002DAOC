import React from 'react'
import weightlift from "../assets/icons/weightlift.ico"
import Plus from "../assets/Plus.svg"





export const ClassesCard = () => {
    return (
        <div className="w-full">
            <div className=" flex flex-col relative bg-white px-4 py-6 rounded-lg text-[20px]">
                <h1 className="mb-3">Ultima clase</h1>
                <div className="h-[3px] rounded-full w-full bg-button-primary mb-3"></div>
                <p>Sabado - 12:00 PM</p>
                <ul className="px-2">
                    <li className="flex justify-start gap-2 items-center" > <img src={weightlift} alt="" className="w-[34px]" /> <p>Ejercicios realizados: </p> 
                    <p className="text-orange-500">2</p> </li>
                    <li className="flex justify-start gap-2 items-center" > <img src={Plus}  alt="" /> <p>Enfoque muscular: </p> 
                    <p className="text-orange-500">piernas y brazo</p> </li>
                </ul>
                <button className="w-full bg-button-primary mt-5 py-2 rounded-lg"><p className="text-white">Más Información</p></button>
            </div>
        </div>

    )
}