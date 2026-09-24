import { useState } from "react";
import "./App.css";

function App() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [sesionIniciada, setSesionIniciada] = useState(false);

  const usuarioDemostracion = {
    correo: "residente@losrobles.mx",
    contrasena: "Robles2026",
  };

  const validarCorreo = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const manejarIngreso = (evento) => {
    evento.preventDefault();
    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !contrasena.trim()) {
      setTipoMensaje("error");
      setMensaje("Ingresa el correo electrónico y la contraseña.");
      return;
    }

    if (!validarCorreo(correoLimpio)) {
      setTipoMensaje("error");
      setMensaje("Captura un correo electrónico válido.");
      return;
    }

    if (
      correoLimpio === usuarioDemostracion.correo &&
      contrasena === usuarioDemostracion.contrasena
    ) {
      setTipoMensaje("correcto");
      setMensaje("Acceso correcto. Bienvenido al Residencial Los Robles.");
      setSesionIniciada(true);
      return;
    }

    setTipoMensaje("error");
    setMensaje("Correo o contraseña incorrectos.");
  };

  const cerrarSesion = () => {
    setSesionIniciada(false);
    setCorreo("");
    setContrasena("");
    setTipoMensaje("informativo");
    setMensaje("La sesión se cerró correctamente.");
  };

  const mostrarModuloPendiente = (modulo, sprint) => {
    setTipoMensaje("informativo");
    setMensaje(`${modulo} está planificado para el ${sprint}, conforme al Sprint Schedule.`);
  };

  if (sesionIniciada) {
    return (
      <main className="aplicacion">
        <section className="panel">
          <header className="encabezado-panel">
            <div>
              <p className="etiqueta">Sistema comunitario</p>
              <h1>Residencial Los Robles</h1>
              <p>Prototipo navegable correspondiente al Sprint 1.</p>
            </div>
            <button type="button" className="boton-secundario" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </header>

          <div className="bienvenida">
            <strong>Acceso validado correctamente.</strong>
            <span>Usuario de demostración: residente@losrobles.mx</span>
          </div>

          <h2>Módulos del proyecto</h2>
          <section className="cuadricula-modulos">
            <article className="modulo modulo-disponible">
              <span className="estado">Sprint 1</span>
              <h3>Acceso de residentes</h3>
              <p>Interfaz y validaciones iniciales disponibles.</p>
              <button type="button" onClick={() => {
                setTipoMensaje("correcto");
                setMensaje("Este módulo corresponde a H01 del Sprint 1.");
              }}>
                Ver estado
              </button>
            </article>

            <article className="modulo">
              <span className="estado">Sprint 2</span>
              <h3>Panel de pagos</h3>
              <p>Control administrativo de cuotas y solicitudes.</p>
              <button type="button" onClick={() => mostrarModuloPendiente("Panel de pagos", "Sprint 2")}>
                Consultar planeación
              </button>
            </article>

            <article className="modulo">
              <span className="estado">Sprint 3</span>
              <h3>Reportes y avisos</h3>
              <p>Exportación PDF/Excel y comunicación comunitaria.</p>
              <button type="button" onClick={() => mostrarModuloPendiente("Reportes y avisos", "Sprint 3")}>
                Consultar planeación
              </button>
            </article>

            <article className="modulo">
              <span className="estado">Sprint 4</span>
              <h3>Control de visitas</h3>
              <p>Registro de entradas y salidas del residencial.</p>
              <button type="button" onClick={() => mostrarModuloPendiente("Control de visitas", "Sprint 4")}>
                Consultar planeación
              </button>
            </article>

            <article className="modulo">
              <span className="estado">Sprint 5</span>
              <h3>Buzón de incidencias</h3>
              <p>Registro y seguimiento de reportes comunitarios.</p>
              <button type="button" onClick={() => mostrarModuloPendiente("Buzón de incidencias", "Sprint 5")}>
                Consultar planeación
              </button>
            </article>

            <article className="modulo">
              <span className="estado">Sprint 5</span>
              <h3>Manual de usuario</h3>
              <p>Documento PDF con capturas y preguntas frecuentes.</p>
              <button type="button" onClick={() => mostrarModuloPendiente("Manual de usuario", "Sprint 5")}>
                Consultar planeación
              </button>
            </article>
          </section>

          {mensaje && <p className={`mensaje ${tipoMensaje}`} role="status">{mensaje}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="aplicacion">
      <section className="tarjeta-acceso">
        <div className="marca">
          <div className="icono-casa">LR</div>
          <div>
            <p className="etiqueta">Sistema comunitario</p>
            <h1>Residencial Los Robles</h1>
          </div>
        </div>

        <p className="descripcion">Acceso al prototipo de gestión de servicios comunitarios.</p>

        <div className="credenciales">
          <strong>Credenciales para la demostración</strong>
          <span>Correo: residente@losrobles.mx</span>
          <span>Contraseña: Robles2026</span>
        </div>

        <form onSubmit={manejarIngreso} noValidate>
          <label htmlFor="correo">Correo electrónico</label>
          <input id="correo" type="email" placeholder="residente@losrobles.mx" value={correo}
            onChange={(evento) => setCorreo(evento.target.value)} />

          <label htmlFor="contrasena">Contraseña</label>
          <input id="contrasena" type="password" placeholder="Captura tu contraseña" value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)} />

          <button className="boton-principal" type="submit">Ingresar</button>
        </form>

        <button type="button" className="enlace-recuperacion" onClick={() => {
          setTipoMensaje("informativo");
          setMensaje("La recuperación de contraseña está planificada para el Sprint 2.");
        }}>
          ¿Olvidaste tu contraseña?
        </button>

        {mensaje && <p className={`mensaje ${tipoMensaje}`} role="status">{mensaje}</p>}

        <section className="base-tecnica">
          <h2>H02 - Base técnica inicial</h2>
          <dl>
            <div><dt>Ambiente</dt><dd>React + Vite</dd></div>
            <div><dt>Tabla prevista</dt><dd>Usuarios</dd></div>
            <div><dt>Persistencia</dt><dd>Pendiente de integración</dd></div>
            <div><dt>Seguridad prevista</dt><dd>Hash de contraseñas</dd></div>
          </dl>
        </section>

        <p className="nota">Prototipo académico. No procesa datos personales ni credenciales reales.</p>
      </section>
    </main>
  );
}

export default App;
