import React, { useEffect, useState } from 'react'
import { UserNavBar } from '../../Components/UserNavBar'
import "../../Components/css/BackgroundRadius.css"
import { ExerciseHistory } from "../../Components/ExerciseHistory"
import { ClassesCard } from '../../Components/ClassesCard'
import axios from 'axios'

const ClassesPage = ({userData}) => {

  const [classes , setClasses] = useState([])
  

  const fetchClasses = async () => {
    const resultado = await axios.get(`${import.meta.env.VITE_API_URL}/userRecords/${userData.id}`)

    if(resultado.status === 200){
      setClasses(resultado.data)
    }
  }

  useEffect(() =>{
    fetchClasses()
  },[])

  return (
    <>
      <section className="bg-[radial-gradient(circle, rgb(255, 255, 255) 8%, rgb(177, 174, 174) 100%)] 
      backgroundPrimary w-full flex justify-start py-10 flex-col px-4 backgroundPrimary h-[100vh] ">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-bold  mb-10">Historial de clases</h1>
        </div>
        <ClassesCard routine={classes[0]} />
        <h1 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">Historial de clases</h1>
        <ExerciseHistory />

      </section>
      <UserNavBar />
    </>
  )
}

export default ClassesPage;