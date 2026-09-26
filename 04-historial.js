function renderHistorial(){

const tabla=
document.getElementById(
"tabla"
);

const abonos=
prestamoActual?.abonos||[];


if(!abonos.length){

tabla.innerHTML=
`
<div class="small">

Aún no hay abonos registrados.

</div>
`;

return;

}


let acum=0;


const ordenados=
[...abonos].sort(
(a,b)=>
a.fecha.localeCompare(b.fecha)
);


const rows=
ordenados.map(a=>{

const valor=
Number(a.valor);

acum+=valor;


const indice=
abonos.indexOf(a);


const deuda=
Number(
prestamoActual.capital
)+
Number(
prestamoActual.interes
);


return `
<tr>

<td>
${formatDate(a.fecha)}
</td>

<td>
${money(valor)}
</td>

<td>
${money(acum)}
</td>

<td>
${money(
Math.max(
deuda-acum,
0
)
)}
</td>

<td>

<button
class="delete"
onclick="eliminarAbono(${indice})"
>
🗑️
</button>

</td>

</tr>
`;

}).join("");


tabla.innerHTML=
`
<table>

<thead>

<tr>

<th>Fecha</th>

<th>Abono</th>

<th>Total</th>

<th>Saldo</th>

<th></th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>
`;

}