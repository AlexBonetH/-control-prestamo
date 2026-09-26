function money(n){
 
return "$"+
Math.round(
Number(n)||0
).toLocaleString("es-CO");
 
}
 
function formatDate(s){
 
const [y,m,d]=s.split("-");
 
return `${d}/${m}/${y}`;
 
}
 
function escapeHtml(t){
 
return String(t||"")
.replace(
/[&<>"']/g,
m=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
"\"":"&quot;",
"'":"&#039;"
}[m])
);
 
}
