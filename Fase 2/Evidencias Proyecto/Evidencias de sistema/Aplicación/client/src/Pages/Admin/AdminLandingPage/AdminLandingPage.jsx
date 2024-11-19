import React from 'react'
import { NavBarAdmin } from '../../../Components/NavBarAdmin'
export const AdminLandingPage = () => {
  return (
    <>
      <div className="bg-[#333] flex flex-col justify-start items-center pt-6">
        <h1 className="text-3xl font-bold text-white text-center">Administrar pagina</h1>
      </div>
      <NavBarAdmin />
    </>
  )
}
export default AdminLandingPage;