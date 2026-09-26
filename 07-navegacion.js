function ocultarTodo(){

[
"pantallaClientes",
"formularioCliente",
"pantallaCliente",
"pantallaNuevoPrestamo",
"pantallaEditarPrestamo",
"pantallaEditarCliente"
]
.forEach(id=>{

const elemento=document.getElementById(id);

if(elemento)
elemento.classList.add("hidden");

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
