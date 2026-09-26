function ocultarTodo(){

[
"pantallaClientes",
"formularioCliente",
"pantallaCliente",
"pantallaNuevoPrestamo",
"pantallaEditarCliente"
]
.forEach(id=>{

document
.getElementById(id)
.classList.add("hidden");

});

}

function volverClientes(){

ocultarTodo();

clienteActual=null;

prestamoActual=null;

document
.getElementById("pantallaClientes")
.classList.remove("hidden");

renderClientes();

}