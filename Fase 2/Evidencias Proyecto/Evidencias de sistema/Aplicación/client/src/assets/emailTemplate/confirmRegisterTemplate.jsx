import React from 'react';

const ConfirmRegisterTemplate = ({ nombre, email }) => {
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
          <img
            src="https://i.imgur.com/GTIQ1BN.png"
            alt="Logo"
            style={{ width: "200px", height: "auto", margin: "auto" }}
          />
          <h1 style={{ margin: "0", fontSize: "24px" }}>¡Bienvenido a Soldado Gym!</h1>
        </div>

        {/* Contenido principal */}
        <div style={{ padding: "30px", textAlign: "center" }}>
          <h2 style={{ color: "#333", fontSize: "22px", marginBottom: "15px" }}>
            Hola {nombre}, ¡tu viaje comienza aquí!
          </h2>
          <p style={{ color: "#444", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
            Estamos emocionados de darte la bienvenida a la familia de **Soldado Gym**. Tu cuenta registrada con el correo <strong>{email}</strong> ya está lista. Ahora tienes acceso a un mundo de oportunidades para alcanzar tus metas de salud y bienestar.
          </p>
          <p style={{ color: "#444", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
            Mantente fuerte, motivado y enfocado en cada paso de tu camino. ¡Estamos aquí para apoyarte en cada repetición, cada movimiento y cada meta alcanzada!
          </p>
          <a
            href="https://miaplicacion.com/iniciar-sesion"
            style={{
              display: "inline-block",
              background: "#333",
              color: "#fff",
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "20px",
            }}
          >
            Comienza Ahora
          </a>
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
            © 2024 Soldado Gym |{" "}
            <a
              href="https://miaplicacion.com/privacidad"
              style={{ color: "#ffd700", textDecoration: "none" }}
            >
              Política de privacidad
            </a>
          </p>
          <p style={{ marginTop: "10px" }}>Gracias por confiar en nosotros. ¡Te esperamos en el gimnasio!</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegisterTemplate;
