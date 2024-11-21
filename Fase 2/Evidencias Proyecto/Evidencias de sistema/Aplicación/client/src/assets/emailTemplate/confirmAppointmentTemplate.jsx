import React from "react";

const ConfirmAppointmentTemplate = ({  nombre, fecha, hora}) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "30px 0" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            background: "#333",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <img src="https://i.imgur.com/GTIQ1BN.png" alt="Logo" style={{ width: "200px", height: "auto", margin: "auto" }} />
          <h1 style={{ position:"relative", margin: "0", fontSize: "24px" }}>Soldado Gym</h1>
        </div>

        {/* Contenido principal */}
        <div style={{ padding: "30px", textAlign: "center" }}>
          <h2 style={{ color: "#333", fontSize: "22px", marginBottom: "15px" }}>
            Hola {nombre}! tu consulta ha sido confirmada!
          </h2>
          <p style={{ color: "#444", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
            {nombre} nos agrada infirmale que su consulta que reservo para el dia {fecha} a las {hora} se ha confirmado. lo estamos esperando 
          </p>
        </div>

        {/* Pie de página */}
        <div
          style={{
            background: "#333",
            color: "#fff",
            textAlign: "center",
            padding: "15px",
            fontSize: "14px",
          }}
        >
          <p>
            © 2024 MiAplicación |{" "}
            <a
              href="https://miaplicacion.com/privacidad"
              style={{ color: "#ffd700", textDecoration: "none" }}
            >
              Política de privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAppointmentTemplate;