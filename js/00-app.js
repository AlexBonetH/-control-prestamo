/* PRESTAMO — APP / INICIALIZACIÓN */
let clientes=JSON.parse(localStorage.getItem("clientesPrestamo")||"[]");
let clienteActual=null;
let prestamoActual=null;
migrarDatos();
document.getElementById("fecha").value=new Date().toISOString().slice(0,10);
renderClientes();
