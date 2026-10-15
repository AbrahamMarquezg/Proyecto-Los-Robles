import { useMemo, useState } from "react";
import "./App.css";

const USUARIO_INICIAL = {
  correo: "residente@losrobles.mx",
  contraseña: "Robles2026",
  nombre: "Residente de demostración",
};

const PAGOS_INICIALES = [
  { id: 1, vivienda: "A-01", residente: "Laura Martinez", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-10", fechaPago: "2026-10-04", método: "Transferencia", estado: "Pagado" },
  { id: 2, vivienda: "A-02", residente: "Carlos Ramirez", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-10", fechaPago: "", método: "", estado: "Vencido" },
  { id: 3, vivienda: "B-03", residente: "Maria Lopez", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-18", fechaPago: "", método: "", estado: "Pendiente" },
  { id: 4, vivienda: "B-04", residente: "Jorge Hernandez", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-10", fechaPago: "2026-10-08", método: "Efectivo", estado: "Pagado" },
  { id: 5, vivienda: "C-05", residente: "Ana Torres", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-18", fechaPago: "", método: "", estado: "Pendiente" },
  { id: 6, vivienda: "C-06", residente: "Ricardo Gomez", concepto: "Cuota de mantenimiento", periodo: "Octubre 2026", monto: 1250, vencimiento: "2026-10-10", fechaPago: "", método: "", estado: "Vencido" },
];

const validarCorreo = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
const hoy = () => new Date().toISOString().slice(0, 10);
const dinero = (cantidad) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(cantidad);

function obtenerUsuario() {
  try {
    return JSON.parse(localStorage.getItem("losRoblesUsuario")) || USUARIO_INICIAL;
  } catch {
    return USUARIO_INICIAL;
  }
}

function obtenerPagos() {
  try {
    return JSON.parse(localStorage.getItem("losRoblesPagos")) || PAGOS_INICIALES;
  } catch {
    return PAGOS_INICIALES;
  }
}

function App() {
  const [usuario, setUsuario] = useState(obtenerUsuario);
  const [pagos, setPagos] = useState(obtenerPagos);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [sesiónIniciada, setSesiónIniciada] = useState(false);
  const [vista, setVista] = useState("inicio");
  const [búsqueda, setBúsqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [métodoPago, setMétodoPago] = useState("Transferencia");
  const [pasoRecuperacion, setPasoRecuperacion] = useState(1);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [código, setCódigo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const guardarPagos = (nuevosPagos) => {
    setPagos(nuevosPagos);
    localStorage.setItem("losRoblesPagos", JSON.stringify(nuevosPagos));
  };

  const notificar = (texto, tipo = "informativo") => {
    setTipoMensaje(tipo);
    setMensaje(texto);
  };

  const manejarIngreso = (evento) => {
    evento.preventDefault();
    const correoLimpio = correo.trim().toLowerCase();
    if (!correoLimpio || !contraseña.trim()) return notificar("Ingresa el correo electrónico y la contraseña.", "error");
    if (!validarCorreo(correoLimpio)) return notificar("Captura un correo electrónico valido.", "error");
    if (correoLimpio === usuario.correo && contraseña === usuario.contraseña) {
      setSesiónIniciada(true);
      setVista("inicio");
      return notificar("Acceso correcto. Bienvenido al Residencial Los Robles.", "correcto");
    }
    notificar("Correo o contraseña incorrectos.", "error");
  };

  const cerrarSesión = () => {
    setSesiónIniciada(false);
    setVista("inicio");
    setCorreo("");
    setContraseña("");
    notificar("La sesión se cerro correctamente.", "informativo");
  };

  const pagosFiltrados = useMemo(() => pagos.filter((pago) => {
    const termino = búsqueda.trim().toLowerCase();
    const coincideBúsqueda = !termino || pago.vivienda.toLowerCase().includes(termino) || pago.residente.toLowerCase().includes(termino);
    const coincideEstado = filtroEstado === "Todos" || pago.estado === filtroEstado;
    return coincideBúsqueda && coincideEstado;
  }), [pagos, búsqueda, filtroEstado]);

  const resumen = useMemo(() => ({
    esperado: pagos.reduce((suma, pago) => suma + pago.monto, 0),
    pagado: pagos.filter((pago) => pago.estado === "Pagado").reduce((suma, pago) => suma + pago.monto, 0),
    pendiente: pagos.filter((pago) => pago.estado !== "Pagado").reduce((suma, pago) => suma + pago.monto, 0),
    alCorriente: pagos.filter((pago) => pago.estado === "Pagado").length,
    conAdeudo: pagos.filter((pago) => pago.estado !== "Pagado").length,
  }), [pagos]);

  const confirmarPago = (evento) => {
    evento.preventDefault();
    if (!pagoSeleccionado) return;
    const actualizados = pagos.map((pago) => pago.id === pagoSeleccionado.id
      ? { ...pago, estado: "Pagado", fechaPago: hoy(), método: métodoPago }
      : pago);
    guardarPagos(actualizados);
    setPagoSeleccionado(null);
    notificar(`Pago de la vivienda ${pagoSeleccionado.vivienda} registrado correctamente.`, "correcto");
  };

  const reiniciarDatos = () => {
    guardarPagos(PAGOS_INICIALES);
    notificar("Los datos de demostración fueron restablecidos.", "informativo");
  };

  const solicitarCódigo = (evento) => {
    evento.preventDefault();
    const correoLimpio = correoRecuperacion.trim().toLowerCase();
    if (!correoLimpio) return notificar("Captura el correo registrado.", "error");
    if (!validarCorreo(correoLimpio)) return notificar("Captura un correo electrónico valido.", "error");
    if (correoLimpio !== usuario.correo) return notificar("El correo no se encuentra registrado en el prototipo.", "error");
    setPasoRecuperacion(2);
    notificar("Código académico generado: ROBLES26. En producción se enviaria por correo.", "informativo");
  };

  const validarCódigo = (evento) => {
    evento.preventDefault();
    if (código.trim().toUpperCase() !== "ROBLES26") return notificar("El código de recuperacion no es correcto.", "error");
    setPasoRecuperacion(3);
    notificar("Código validado. Captura tu nueva contraseña.", "correcto");
  };

  const cambiarContraseña = (evento) => {
    evento.preventDefault();
    if (nuevaContraseña.length < 8 || !/[A-Z]/.test(nuevaContraseña) || !/\d/.test(nuevaContraseña)) {
      return notificar("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.", "error");
    }
    if (nuevaContraseña !== confirmarContraseña) return notificar("Las contraseñas no coinciden.", "error");
    const usuarioActualizado = { ...usuario, contraseña: nuevaContraseña };
    setUsuario(usuarioActualizado);
    localStorage.setItem("losRoblesUsuario", JSON.stringify(usuarioActualizado));
    setPasoRecuperacion(1);
    setCorreoRecuperacion("");
    setCódigo("");
    setNuevaContraseña("");
    setConfirmarContraseña("");
    setVista("login");
    notificar("Contraseña actualizada. Ya puedes iniciar sesión con la nueva contraseña.", "correcto");
  };

  const Mensaje = () => mensaje ? <p className={`mensaje ${tipoMensaje}`} role="status">{mensaje}</p> : null;

  if (!sesiónIniciada) {
    if (vista === "recuperacion") {
      return (
        <main className="aplicacion">
          <section className="tarjeta-acceso">
            <div className="marca"><div className="icono-casa">LR</div><div><p className="etiqueta">Sprint 2 · H07</p><h1>Recuperar contraseña</h1></div></div>
            <p className="descripcion">Restablece el acceso mediante el flujo académico de recuperacion.</p>
            <div className="pasos"><span className={pasoRecuperacion >= 1 ? "activo" : ""}>1. Correo</span><span className={pasoRecuperacion >= 2 ? "activo" : ""}>2. Código</span><span className={pasoRecuperacion >= 3 ? "activo" : ""}>3. Contraseña</span></div>
            {pasoRecuperacion === 1 && <form onSubmit={solicitarCódigo} noValidate><label htmlFor="correoRecuperacion">Correo registrado</label><input id="correoRecuperacion" type="email" value={correoRecuperacion} onChange={(e) => setCorreoRecuperacion(e.target.value)} placeholder="residente@losrobles.mx" /><button className="boton-principal" type="submit">Generar código</button></form>}
            {pasoRecuperacion === 2 && <form onSubmit={validarCódigo}><div className="código-demo"><strong>Código de demostración</strong><span>ROBLES26</span></div><label htmlFor="código">Código temporal</label><input id="código" value={código} onChange={(e) => setCódigo(e.target.value)} placeholder="Captura el código" /><button className="boton-principal" type="submit">Validar código</button></form>}
            {pasoRecuperacion === 3 && <form onSubmit={cambiarContraseña}><label htmlFor="nuevaContraseña">Nueva contraseña</label><input id="nuevaContraseña" type="password" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} /><small>Mínimo 8 caracteres, una mayúscula y un número.</small><label htmlFor="confirmarContraseña">Confirmar contraseña</label><input id="confirmarContraseña" type="password" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} /><button className="boton-principal" type="submit">Actualizar contraseña</button></form>}
            <Mensaje />
            <button type="button" className="enlace-recuperacion" onClick={() => { setVista("login"); setPasoRecuperacion(1); notificar("Regresaste al inicio de sesión."); }}>Volver al inicio de sesión</button>
            <p className="nota">Prototipo académico: el código se muestra en pantalla y no se envia por correo.</p>
          </section>
        </main>
      );
    }

    return (
      <main className="aplicacion">
        <section className="tarjeta-acceso">
          <div className="marca"><div className="icono-casa">LR</div><div><p className="etiqueta">Sistema comunitario</p><h1>Residencial Los Robles</h1></div></div>
          <p className="descripcion">Acceso al prototipo de gestión de servicios comunitarios.</p>
          <div className="credenciales"><strong>Credenciales iniciales</strong><span>Correo: residente@losrobles.mx</span><span>Contraseña inicial: Robles2026</span></div>
          <form onSubmit={manejarIngreso} noValidate><label htmlFor="correo">Correo electrónico</label><input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="residente@losrobles.mx" /><label htmlFor="contraseña">Contraseña</label><input id="contraseña" type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Captura tu contraseña" /><button className="boton-principal" type="submit">Ingresar</button></form>
          <button type="button" className="enlace-recuperacion" onClick={() => { setVista("recuperacion"); setMensaje(""); }}>¿Olvidaste tu contraseña?</button>
          <Mensaje />
          <section className="base-técnica"><h2>Avance acumulado</h2><dl><div><dt>Fase anterior</dt><dd>Sprint 1 aprobado</dd></div><div><dt>Fase actual</dt><dd>Sprint 2</dd></div><div><dt>Historia H03</dt><dd>Panel de pagos</dd></div><div><dt>Historia H07</dt><dd>Recuperacion de contraseña</dd></div></dl></section>
          <p className="nota">Prototipo académico. No utilices datos personales ni credenciales reales.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="aplicacion">
      <section className="panel">
        <header className="encabezado-panel"><div><p className="etiqueta">Sistema comunitario · Fase 2</p><h1>Residencial Los Robles</h1><p>Segundo progreso de desarrollo en React.</p></div><button type="button" className="boton-secundario" onClick={cerrarSesión}>Cerrar sesión</button></header>
        <nav className="navegacion"><button className={vista === "inicio" ? "activo" : ""} onClick={() => setVista("inicio")}>Inicio</button><button className={vista === "pagos" ? "activo" : ""} onClick={() => { setVista("pagos"); setMensaje(""); }}>Panel de pagos</button></nav>

        {vista === "inicio" && <><div className="bienvenida"><strong>Acceso validado correctamente.</strong><span>Usuario: {usuario.correo}</span></div><h2>Módulos del proyecto</h2><section className="cuadricula-módulos"><article className="módulo módulo-disponible"><span className="estado">Sprint 1</span><h3>Acceso de residentes</h3><p>Interfaz y validaciónes aprobadas en la Fase 1.</p><button onClick={() => notificar("H01 permanece disponible e integrada con los nuevos módulos.", "correcto")}>Ver estado</button></article><article className="módulo módulo-disponible"><span className="estado">Sprint 2 · H03</span><h3>Panel de pagos</h3><p>Consulta, búsqueda, filtros y registro de cuotas residenciales.</p><button onClick={() => setVista("pagos")}>Abrir módulo</button></article><article className="módulo módulo-disponible"><span className="estado">Sprint 2 · H07</span><h3>Recuperacion de contraseña</h3><p>Flujo de validación y actualizacion disponible desde el acceso.</p><button onClick={() => notificar("H07 se encuentra integrada en la pantalla de acceso.", "correcto")}>Ver estado</button></article><article className="módulo"><span className="estado">Sprint 3</span><h3>Reportes y avisos</h3><p>Programado para la siguiente fase.</p><button onClick={() => notificar("Reportes y avisos permanecen programados para el Sprint 3.")}>Consultar planeacion</button></article><article className="módulo"><span className="estado">Sprint 4</span><h3>Control de visitas</h3><p>Programado conforme al Sprint Schedule.</p><button onClick={() => notificar("Control de visitas permanece programado para el Sprint 4.")}>Consultar planeacion</button></article><article className="módulo"><span className="estado">Sprint 5</span><h3>Incidencias y manual</h3><p>Programado para el cierre del desarrollo.</p><button onClick={() => notificar("Incidencias y manual permanecen programados para el Sprint 5.")}>Consultar planeacion</button></article></section></>}

        {vista === "pagos" && <section className="seccion-pagos"><div className="titulo-seccion"><div><p className="etiqueta">Sprint 2 · Historia H03</p><h2>Panel de pagos</h2><p>Control académico de cuotas de mantenimiento.</p></div><button className="boton-terciario" onClick={reiniciarDatos}>Restablecer datos</button></div><section className="resumen-pagos"><article><span>Total esperado</span><strong>{dinero(resumen.esperado)}</strong></article><article><span>Total pagado</span><strong>{dinero(resumen.pagado)}</strong></article><article><span>Saldo pendiente</span><strong>{dinero(resumen.pendiente)}</strong></article><article><span>Viviendas al corriente</span><strong>{resumen.alCorriente}</strong></article><article><span>Viviendas con adeudo</span><strong>{resumen.conAdeudo}</strong></article></section><div className="barra-filtros"><div><label htmlFor="búsqueda">Buscar residente o vivienda</label><input id="búsqueda" value={búsqueda} onChange={(e) => setBúsqueda(e.target.value)} placeholder="Ejemplo: A-01 o Laura" /></div><div><label htmlFor="estadoPago">Estado</label><select id="estadoPago" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}><option>Todos</option><option>Pagado</option><option>Pendiente</option><option>Vencido</option></select></div></div><div className="contenedor-tabla"><table><thead><tr><th>Vivienda</th><th>Residente</th><th>Periodo</th><th>Monto</th><th>Vencimiento</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{pagosFiltrados.length ? pagosFiltrados.map((pago) => <tr key={pago.id}><td data-label="Vivienda">{pago.vivienda}</td><td data-label="Residente">{pago.residente}</td><td data-label="Periodo">{pago.periodo}</td><td data-label="Monto">{dinero(pago.monto)}</td><td data-label="Vencimiento">{pago.vencimiento}</td><td data-label="Estado"><span className={`insignia ${pago.estado.toLowerCase()}`}>{pago.estado}</span></td><td data-label="Acción">{pago.estado === "Pagado" ? <span className="fecha-pago">{pago.fechaPago}<br />{pago.método}</span> : <button className="boton-tabla" onClick={() => { setPagoSeleccionado(pago); setMensaje(""); }}>Registrar pago</button>}</td></tr>) : <tr><td colSpan="7" className="sin-resultados">No se encontraron registros con esos criterios.</td></tr>}</tbody></table></div><p className="contador">Mostrando {pagosFiltrados.length} de {pagos.length} registros.</p></section>}
        <Mensaje />
      </section>

      {pagoSeleccionado && <div className="fondo-modal" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="tituloModal"><p className="etiqueta">Registro de movimiento</p><h2 id="tituloModal">Confirmar pago</h2><dl><div><dt>Vivienda</dt><dd>{pagoSeleccionado.vivienda}</dd></div><div><dt>Residente</dt><dd>{pagoSeleccionado.residente}</dd></div><div><dt>Monto</dt><dd>{dinero(pagoSeleccionado.monto)}</dd></div></dl><form onSubmit={confirmarPago}><label htmlFor="métodoPago">Método de pago</label><select id="métodoPago" value={métodoPago} onChange={(e) => setMétodoPago(e.target.value)}><option>Transferencia</option><option>Efectivo</option><option>Tarjeta</option></select><div className="acciones-modal"><button type="button" className="boton-secundario" onClick={() => setPagoSeleccionado(null)}>Cancelar</button><button type="submit" className="boton-principal">Confirmar pago</button></div></form></section></div>}
    </main>
  );
}

export default App;
