import React from 'react'
import { UserNavBar } from '../../Components/UserNavBar'
import "../../Components/css/BackgroundRadius.css"
import { ExerciseHistory } from "../../Components/ExerciseHistory"
import { ClassesCard } from '../../Components/ClassesCard'


export const ClassesPage = () => {
  return (
    <>
    <section className="w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
        <ClassesCard />
        <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Historial de clases</h1>
        <ExerciseHistory/>
        <ExerciseHistory/>
       
    </section>
     <UserNavBar/>
     </>
  )
}
