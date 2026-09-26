function registrar(){

if(!prestamoActual)
return;


const fecha=
document.getElementById(
"fecha"
).value;


const valor=
Number(
document.getElementById(
"valor"
).value
);


if(
!fecha||
!valor||
valor<=0
){

alert(
"Ingresa una fecha y un valor válido."
);

return;

}


const deuda=
Number(
prestamoActual.capital
)+
Number(
prestamoActual.interes
);


const total=
(prestamoActual.abonos||[])
.reduce(
(s,a)=>
s+
Number(a.valor),
0
);


if(
total+valor>deuda
&&
!confirm(
`Este abono genera un excedente de ${money(total+valor-deuda)}. ¿Deseas registrarlo?`
)
)

return;


prestamoActual.abonos.push({
fecha,
valor
});


prestamoActual.abonos.sort(
(a,b)=>
a.fecha.localeCompare(b.fecha)
);


guardarClientes();


document.getElementById(
"valor"
).value="";


renderPrestamo();

renderListaPrestamos();

}

function eliminarAbono(indice){

if(!prestamoActual)
return;


const a=
prestamoActual.abonos[indice];


if(!a)
return;


if(
!confirm(
`¿Deseas eliminar este abono de ${money(a.valor)} realizado el ${formatDate(a.fecha)}?`
)
)

return;


prestamoActual.abonos.splice(
indice,
1
);


guardarClientes();

renderPrestamo();

renderListaPrestamos();

}