import React from 'react'
import { UserNavBar } from '../../Components/UserNavBar'
import "../../Components/css/BackgroundRadius.css"
import { ExerciseHistory } from "../../Components/ExerciseHistory"
import { ClassesCard } from '../../Components/ClassesCard'
import "./ClassesStyle.css"

export const ClassesPage = () => {
  return (
    <>

      <section className="backgroundPrimary w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-bold  mb-10">Historial de clases</h1>
        </div>
        <ClassesCard />
        <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Historial de clases</h1>
        <ExerciseHistory />
        <ExerciseHistory />

      </section>
      <UserNavBar />
    </>
  )
}
