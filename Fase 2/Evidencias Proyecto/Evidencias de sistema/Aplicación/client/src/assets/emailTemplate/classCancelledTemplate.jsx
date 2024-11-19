import React from "react";

const ClassCancelledTemplate = ({ nombre, fecha }) => {
  const scheduleUrl = `${import.meta.env.VITE_APP_BASE_URL}/schedule/gym`;

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
          <img src="https://cdn.discordapp.com/attachments/1088082112269271123/1308403290144505919/soldadoLogo.png?ex=673dd105&is=673c7f85&hm=3993fadd7ebd66cbc197e5aff4243c49a218281d8235b778584d6967b03ad1ca&" alt="Logo" style={{ width: "200px", height: "auto", margin: "auto" }} />
          <h1 style={{ position:"relative", margin: "0", fontSize: "24px" }}>Soldado Gym</h1>
        </div>

        {/* Contenido principal */}
        <div style={{ padding: "30px", textAlign: "center" }}>
          <h2 style={{ color: "#333", fontSize: "22px", marginBottom: "15px" }}>
            Clase Cancelada!
          </h2>
          <p style={{ color: "#444", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
            Hola {nombre}, lamentamos informarle que la clase que tenía programada para el día {fecha} se ha cancelado. Le pedimos disculpas por los inconvenientes. Si desea volver a agendar una clase, por favor haga clic en el botón de abajo.
          </p>
          <a
            href={scheduleUrl}
            style={{
              display: "inline-block",
              padding: "15px 25px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007bff",
              textDecoration: "none",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 123, 255, 0.3)",
            }}
          >
            Reagendar
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

export default ClassCancelledTemplate;