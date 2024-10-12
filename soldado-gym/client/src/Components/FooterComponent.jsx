import React from 'react'
import InstagramIcon from "../assets/img/instagram.webp";
import WhatsAppIcon from "../assets/img/WhatsApp.webp";


export const FooterComponent = () => {
  return ( <footer className="bg-[#252525] text-white py-6">
    <div className="max-w-screen-lg w-full mx-auto px-6 text-center">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white">Soldado Gym</h2>
        <p className="mt-2">Tu mejor opción para mejorar tu salud y bienestar</p>
      </div>
      <div className="flex justify-center gap-10 mb-6">
        <a
          href="https://www.instagram.com/soldado_gym_la_estrella?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          className="text-gray-300 hover:text-white flex flex-col items-center"
        >
          <img src={InstagramIcon} alt="Instagram" className="w-10 h-10" />
          <span>Instagram</span>
        </a>
        <a
          href="https://wa.me/+56963009649"
          className="text-gray-300 hover:text-white flex flex-col items-center"
        >
          <img src={WhatsAppIcon} alt="WhatsApp" className="w-10 h-10" />
          <span>WhatsApp</span>
        </a>
      </div>
      <div className="text-gray-500 text-sm">
        <p>&copy; 2024 Soldado Gym. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
  )
}
