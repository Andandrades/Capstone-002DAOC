import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import "../Pages/Nutri/HamburgerIcon.css"
import "react-day-picker/style.css"

export const SideMenu = () => {


    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={["h-min-[100%] flex flex-col min-w-20 overflow-x-hidden bg-slate-200 transition-all ease-in-out duration-[250]", `${isOpen ? "w-72" : "w-20"}`].join(" ")}>
            <div className='w-full flex justify-end'>
                <label className='scale-50' for="check">
                    <input  onClick={() => setIsOpen(!isOpen)} type="checkbox" id="check" />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <div className='px-6'>
                <DayPicker className={['transition ease-in-out duration-300', `${isOpen ? "opacity-100" : "opacity-0"}`].join(" ")}  />
            </div>
        </div>
    )
}
