import React from 'react'

import { SideMenu } from '../../Components/SideMenu'
import NutriImage from "../../assets/icons/Nutritionist.png"
import { NutriPanel } from '../../Components/NutriPanel'

export const NutriMenu = ({userId}) => {

    return (
        <div className='h-screen flex'>
            <SideMenu />
            <div className='flex flex-col flex-1'>
                <div className='flex justify-start pl-6 text-center items-center'>
                    <img src={NutriImage} className='w-10' alt="NutriIcon" />
                    <h1 className='text-2xl font-semibold px-2 py-4'>Administracion de Horas Nutricionales</h1>
                </div>
                <div className='h-full flex justify-evenly pt-5 bg-slate-100'>
                   <NutriPanel userId={userId} />
                </div>
            </div>
        </div>
    )
}
