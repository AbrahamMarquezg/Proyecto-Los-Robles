function App() {
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        textAlign: "center",
        fontFamily: "Arial"
      }}
    >
      <h1>Residencial Los Robles</h1>

      <hr />

      <h2>H01 - Login y Registro</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <br />

      <button
        style={{
          backgroundColor: "#2E7D32",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Ingresar
      </button>

      <p>¿Olvidaste tu contraseña?</p>

      <hr />

      <h2>H02 - Base de Datos Segura</h2>

      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: "15px",
          borderRadius: "5px"
        }}
      >
        <p>
          Estado de conexión:
          <strong style={{ color: "green" }}>
            {" "}Configurada
          </strong>
        </p>

        <p>
          Tabla principal:
          <strong> Usuarios</strong>
        </p>

        <p>
          Seguridad:
          <strong> Contraseñas Encriptadas</strong>
        </p>

        <p>
          Ambiente:
          <strong> React + Vite</strong>
        </p>
      </div>
    </div>
  );
}

export default App;