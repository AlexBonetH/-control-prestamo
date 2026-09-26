function guardarClientes(){

localStorage.setItem(
"clientesPrestamo",
JSON.stringify(clientes)
);

}

function migrarDatos(){

clientes.forEach(c=>{

if(!Array.isArray(c.abonos))
c.abonos=[];


if(!Array.isArray(c.prestamos)){

if(
c.capital!=null||
c.interes!=null||
c.abonos.length
){

c.prestamos=[{

id:Date.now()+Math.random(),

capital:Number(c.capital)||0,

interes:Number(c.interes)||0,

abonos:c.abonos

}];

}
else{

c.prestamos=[];

}

}


delete c.capital;

delete c.interes;

delete c.abonos;

});


const antiguos=
JSON.parse(
localStorage.getItem("abonosPrestamo")||"[]"
);


if(
antiguos.length&&
!clientes.length
){

clientes.push({

id:Date.now(),

nombre:"Cliente actual",

identificacion:"",

telefono:"",

direccion:"",

prestamos:[{

id:Date.now()+1,

capital:2000000,

interes:400000,

abonos:antiguos

}]

});

}

guardarClientes();

}