function mostrarFormularioCliente(){

ocultarTodo();

document
.getElementById("formularioCliente")
.classList.remove("hidden");

}

function crearCliente(){

const nombre=
document
.getElementById("nuevoNombre")
.value
.trim();

const identificacion=
document
.getElementById("nuevoIdentificacion")
.value
.trim();

const telefono=
document
.getElementById("nuevoTelefono")
.value
.trim();

const direccion=
document
.getElementById("nuevoDireccion")
.value
.trim();


if(!nombre){

alert(
"Ingresa el nombre del cliente."
);

return;

}


const cliente={

id:Date.now(),

nombre,

identificacion,

telefono,

direccion,

prestamos:[]

};


clientes.push(cliente);

guardarClientes();


document.getElementById(
"nuevoNombre"
).value="";

document.getElementById(
"nuevoIdentificacion"
).value="";

document.getElementById(
"nuevoTelefono"
).value="";

document.getElementById(
"nuevoDireccion"
).value="";


seleccionarCliente(
cliente.id
);

}

function seleccionarCliente(id){

const cliente=
clientes.find(
c=>c.id===id
);

if(!cliente)
return;

clienteActual=cliente;

prestamoActual=null;

ocultarTodo();

document
.getElementById("pantallaCliente")
.classList.remove("hidden");

renderCliente();

}

function renderClientes(){

const lista=
document.getElementById(
"listaClientes"
);


if(!clientes.length){

lista.innerHTML=
`
<div class="card">

<div class="small">
Aún no tienes clientes registrados.
</div>

</div>
`;

return;

}


lista.innerHTML=
clientes.map(c=>{

const ps=
c.prestamos||[];

const deuda=
ps.reduce(
(s,p)=>
s+
Number(p.capital||0)+
Number(p.interes||0),
0
);

const abonado=
ps.reduce(
(s,p)=>
s+
(p.abonos||[]).reduce(
(x,a)=>
x+
Number(a.valor||0),
0
),
0
);

const saldo=
Math.max(
deuda-abonado,
0
);


return `
<div
class="client"
onclick="seleccionarCliente(${c.id})"
>

<div class="client-name">
👤 ${escapeHtml(c.nombre)}
</div>

<div class="client-info">

${
ps.length
?
"💰 Préstamos: "+ps.length
:
"📄 Sin préstamo registrado"
}

</div>

<div class="client-saldo">

${
ps.length
?
"💵 Saldo total: "+money(saldo)
:
"➕ Registrar préstamo"
}

</div>

</div>
`;

}).join("");

}

function renderCliente(){

if(!clienteActual)
return;


document.getElementById(
"nombreCliente"
).textContent=
"👤 "+clienteActual.nombre;


let datos=[];


if(clienteActual.identificacion)

datos.push(
"🪪 "+clienteActual.identificacion
);


if(clienteActual.telefono)

datos.push(
"📱 "+clienteActual.telefono
);


if(clienteActual.direccion)

datos.push(
"📍 "+clienteActual.direccion
);


document.getElementById(
"datosCliente"
).textContent=
datos.join("  • ");


renderListaPrestamos();


if(prestamoActual)

renderPrestamo();

else

document
.getElementById("detallePrestamo")
.classList.add("hidden");

}

function editarCliente(){

if(!clienteActual)
return;


ocultarTodo();


document
.getElementById(
"pantallaEditarCliente"
)
.classList.remove("hidden");


document.getElementById(
"editarNombre"
).value=
clienteActual.nombre||"";


document.getElementById(
"editarIdentificacion"
).value=
clienteActual.identificacion||"";


document.getElementById(
"editarTelefono"
).value=
clienteActual.telefono||"";


document.getElementById(
"editarDireccion"
).value=
clienteActual.direccion||"";

}

function guardarCambiosCliente(){

if(!clienteActual)
return;


const nombre=
document.getElementById(
"editarNombre"
).value.trim();


const identificacion=
document.getElementById(
"editarIdentificacion"
).value.trim();


const telefono=
document.getElementById(
"editarTelefono"
).value.trim();


const direccion=
document.getElementById(
"editarDireccion"
).value.trim();


if(!nombre){

alert(
"⚠️ El nombre no puede estar vacío."
);

return;

}


clienteActual.nombre=nombre;

clienteActual.identificacion=
identificacion;

clienteActual.telefono=
telefono;

clienteActual.direccion=
direccion;


guardarClientes();


ocultarTodo();


document
.getElementById(
"pantallaCliente"
)
.classList.remove("hidden");


renderCliente();


alert(
"✅ Datos guardados exitosamente."
);

}

function cancelarEdicion(){

ocultarTodo();

document
.getElementById(
"pantallaCliente"
)
.classList.remove("hidden");

renderCliente();

}

function eliminarCliente(){

if(!clienteActual)
return;


const ps=
clienteActual.prestamos||[];


const deuda=
ps.reduce(
(s,p)=>
s+
Number(p.capital)+
Number(p.interes),
0
);


const abonado=
ps.reduce(
(s,p)=>
s+
(p.abonos||[])
.reduce(
(x,a)=>
x+
Number(a.valor),
0
),
0
);


const saldo=
Math.max(
deuda-abonado,
0
);


if(
!confirm(
`¿Estás seguro de eliminar a ${clienteActual.nombre}?\n\n`+
`Préstamos: ${ps.length}\n`+
`Deuda total: ${money(deuda)}\n`+
`Total abonado: ${money(abonado)}\n`+
`Saldo pendiente: ${money(saldo)}\n\n`+
`⚠️ También se eliminarán sus préstamos e historial de abonos.`
)
)

return;


clientes=
clientes.filter(
c=>
c.id!==clienteActual.id
);


guardarClientes();


clienteActual=null;

prestamoActual=null;


ocultarTodo();


document
.getElementById(
"pantallaClientes"
)
.classList.remove("hidden");


renderClientes();

}