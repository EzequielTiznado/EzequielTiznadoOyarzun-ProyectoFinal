
const presentes =JSON.parse(localStorage.getItem("presentes")) || [];
const ausentes = JSON.parse(localStorage.getItem("ausentes")) || [];
const llegaronTarde =JSON.parse(localStorage.getItem("tarde")) || [];

const registrarIngresos = document.getElementById("registrarIngresos");
const verPresentes = document.getElementById("verPresentes");
const verAusentes = document.getElementById("verAusentes");
const verTarde = document.getElementById("verTarde");
const info = document.getElementById("info");

verPresentes.style.display="block"
verAusentes.style.display="block"
verTarde.style.display="block"



const divmain = document.getElementById("divmain");
info.addEventListener("click",()=>{
    Swal.fire('Bienvenidos al sistema de control de ingresos!',
    'Clickea en "Registrar ingresos" para registrar si el usuario ingreso o llego tarde a la empresa. Una vez cargados los ingresos, se mostraran los accesos para ver los presentes, ausentes y llegadas tarde.  Si se clickea en el boton "Salir - Fin del dia" se borraran los datos guardados y se tendran que volver a ingresar el registro de presentes' )
})
const botonsalir = document.createElement("button");
    botonsalir.className="botonsalir";
    botonsalir.innerHTML = `Salir - Fin del dia`;

    divmain.append(botonsalir);

    const obtenerDatos = async()=>{
        const response = await fetch("datos.json");
        const datos = await response.json();

registrarIngresos.addEventListener("click",()=>{
 
        datos.forEach((empleado)=>{
            console.log(empleado.apellido);
            let pregunta = parseInt(prompt(`Ingreso ${empleado.apellido} ${empleado.nombre}? 1:si/2:no`));
            if (pregunta === 1){
                empleado.presente=true;

                presentes.push({
                    apellido:empleado.apellido,
                    nombre:empleado.nombre,
                    dni:empleado.dni,
                    presente:empleado.presente,
                    
                });
               
                let horario = ParseFloat(prompt("A que hora?"));
                if(horario > 8.00){
                    empleado.llegadaTarde=true;
                    llegaronTarde.push({
                        apellido:empleado.apellido,
                        nombre:empleado.nombre,
                        dni:empleado.dni,
                        presente:empleado.presente,
                    });
                }else{
                    empleado.llegadaTarde=false;
                }
            }else{
                empleado.presente=false;
                ausentes.push({
                    apellido:empleado.apellido,
                    nombre:empleado.nombre,
                    dni:empleado.dni,
                    presente:empleado.presente,
                    
                });
            }
            
            verPresentes.style.display="block"
            verAusentes.style.display="block"
            verTarde.style.display="block"
            registrarIngresos.style.display="none"
           
            guardarLocalPresentes();
            guardarLocalAusentes();
            guardarLocalTarde();
        }); });
           

          

            const alertClick = document.createElement("div");

            alertClick.className="alertClick";

           
        

            verPresentes.addEventListener("click",()=>{
                registrarIngresos.style.display="none"
                divmain.style.display="block";
               
                alertClick.innerHTML = `<h1 class="modal-header-title">Presentes</h1>
                
                
                
                `;
               
                for(let presente of presentes){
                    let content = document.createElement("div");
                    content.className="card";
                    content.innerHTML=`<p class="presentesp">${presente.nombre} ${presente.apellido}</p>`;
                  
                    alertClick.append(content);
                }
                
                divmain.append(alertClick);

                
                
               
          
    
})
verAusentes.addEventListener("click",()=>{
    registrarIngresos.style.display="none"
    divmain.style.display="block";
  
                alertClick.innerHTML = `<h1 class="modal-header-title">Ausentes</h1>
               
                
                
                `;
              
                for(let ausente of ausentes){
                    let content = document.createElement("div");
                    content.className="card";
                    content.innerHTML=`<p class="presentesp">${ausente.nombre} ${ausente.apellido}</p>`;
                  
                    alertClick.append(content);
                }
                
                divmain.append(alertClick);

                
                
             
               
})

verTarde.addEventListener("click",()=>{
    registrarIngresos.style.display="none"
    divmain.style.display="block";
   
                alertClick.innerHTML = `<h1 class="modal-header-title">Llegadas tarde</h1>
                
                
                
                `;
             
                for(let tarde of llegaronTarde){
                    let content = document.createElement("div");
                    content.className="card";
                    content.innerHTML=`<p class="presentesp">${tarde.nombre} ${tarde.apellido}</p>`;
                  
                    alertClick.append(content);
                }
                
                divmain.append(alertClick);

                
                
               
});

    
            const guardarLocalPresentes = ()=>{
                localStorage.setItem("presentes",JSON.stringify(presentes));
            };
            const guardarLocalAusentes = ()=>{
                localStorage.setItem("ausentes",JSON.stringify(ausentes));
            };
            const guardarLocalTarde = ()=>{
                localStorage.setItem("tarde",JSON.stringify(llegaronTarde));
            };
        }
        obtenerDatos();
          
            botonsalir.addEventListener("click",()=>{
                localStorage.clear();
                location.reload();
                
            });
           

