function renderListaPrestamos(){

const cont=
document.getElementById(
"listaPrestamos"
);

const ps=
clienteActual.prestamos||[];


if(!ps.length){

cont.innerHTML=
`
<div class="small">
Este cliente todavía no tiene préstamos registrados.
</div>
`;

return;

}


cont.innerHTML=
ps.map((p,i)=>{

const deuda=
Number(p.capital)+
Number(p.interes);

const total=
(p.abonos||[]).reduce(
(s,a)=>
s+
Number(a.valor),
0
);

const saldo=
Math.max(
deuda-total,
0
);


return `
<div class="loan-card">

<strong>
Préstamo ${i+1}
</strong>

<div class="small">

Capital: ${money(p.capital)}
•
Interés: ${money(p.interes)}

</div>

<div
style="margin-top:6px;font-weight:800"
>

💵 Saldo: ${money(saldo)}

</div>

<button
onclick="seleccionarPrestamo(${p.id})"
>
Ver préstamo
</button>

</div>
`;

}).join("");

}

function seleccionarPrestamo(id){

const p=
(clienteActual.prestamos||[])
.find(
x=>x.id===id
);

if(!p)
return;

prestamoActual=p;

renderListaPrestamos();

renderPrestamo();

}

function renderPrestamo(){

if(!prestamoActual)
return;


document
.getElementById("detallePrestamo")
.classList.remove("hidden");


const deuda=
Number(prestamoActual.capital)+
Number(prestamoActual.interes);


const total=
(prestamoActual.abonos||[])
.reduce(
(s,a)=>
s+
Number(a.valor),
0
);


const saldo=
deuda-total;


document.getElementById(
"capital"
).textContent=
money(
prestamoActual.capital
);


document.getElementById(
"interes"
).textContent=
money(
prestamoActual.interes
);


document.getElementById(
"deuda"
).textContent=
money(deuda);


document.getElementById(
"total"
).textContent=
money(total);


document.getElementById(
"saldo"
).textContent=
money(
Math.max(
saldo,
0
)
);


const estado=
document.getElementById(
"estado"
);


if(saldo===0){

estado.innerHTML=
`
<div class="ok">

✅ DEUDA CANCELADA
<br>
Saldo pendiente: $0

</div>
`;

}

else if(saldo<0){

estado.innerHTML=
`
<div class="warn">

⚠️ Hay un excedente de
${money(-saldo)}

</div>
`;

}

else{

estado.innerHTML="";

}


renderHistorial();

}

function mostrarNuevoPrestamo(){

if(!clienteActual)
return;


ocultarTodo();


document
.getElementById(
"pantallaNuevoPrestamo"
)
.classList.remove("hidden");


document.getElementById(
"clientePrestamoNombre"
).textContent=
"👤 "+clienteActual.nombre;


document.getElementById(
"nuevoCapital"
).value="";


document.getElementById(
"nuevoInteres"
).value="";


actualizarDeudaNueva();

}

function actualizarDeudaNueva(){

const capital=
Number(
document.getElementById(
"nuevoCapital"
).value
)||0;


const interes=
Number(
document.getElementById(
"nuevoInteres"
).value
)||0;


document.getElementById(
"nuevaDeuda"
).textContent=
money(
capital+interes
);

}

function crearPrestamo(){

if(!clienteActual)
return;


const capital=
Number(
document.getElementById(
"nuevoCapital"
).value
);


const interes=
Number(
document.getElementById(
"nuevoInteres"
).value
);


if(
!capital||
capital<=0
){

alert(
"⚠️ El capital debe ser mayor que cero."
);

return;

}


if(interes<0){

alert(
"⚠️ El interés no puede ser negativo."
);

return;

}


const p={

id:Date.now()+Math.random(),

capital,

interes,

abonos:[]

};


if(
!Array.isArray(
clienteActual.prestamos
)
)

clienteActual.prestamos=[];


clienteActual.prestamos.push(p);

guardarClientes();


prestamoActual=p;


ocultarTodo();


document
.getElementById(
"pantallaCliente"
)
.classList.remove("hidden");


renderCliente();


alert(
"✅ Préstamo creado correctamente."
);

}

function cancelarNuevoPrestamo(){

ocultarTodo();

document
.getElementById(
"pantallaCliente"
)
.classList.remove("hidden");

renderCliente();

}