let formularioCita = document.getElementById("formularioCita");
let btnEnviar = document.getElementById("btnEnviar")

let nombreInput = document.getElementById("nombre");
let apellidoInput = document.getElementById("apellido");
let emailInput = document.getElementById("email");
let telefonoInput = document.getElementById("telefono");
let cedulaInput = document.getElementById("cedula");
let fechaInput = document.getElementById("fecha");
let horaInput = document.getElementById("hora");
let arquitectoInput = document.getElementById("arquitecto");

let contenedorCitas = document.getElementById("contenCitas")

let data = JSON.parse(localStorage.getItem("formData")) || [];

formularioCita.addEventListener("submit",e=>{
    e.preventDefault();


        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const email = emailInput.value;
        const telefono = telefonoInput.value;
        const cedula = cedulaInput.value;
        const fecha = fechaInput.value;
        const hora = horaInput.value;
        const arquitecto = arquitectoInput.value;

        const fechaR = data.some(({ fecha }) => fecha === fechaInput.value);
        const horaR = data.some(({ hora }) => hora === horaInput.value);
        const arquiOcup = data.some(({arquitecto})=>arquitecto === arquitectoInput.value)
        console.log(fechaR);
        console.log(arquiOcup);
        
        if(nombre== "" || apellido =="" || telefono == "" || cedula == "" || fecha == "" || hora == "" ){
            swal("todos los campos son obligatorios","","error")
        }else{
            if(fechaR && arquiOcup && horaR){
                swal("fecha no disponible","","error")
                formularioCita.reset();
                return;
            
            }else{
                const nuevaData = {nombre,apellido,email,telefono,cedula,fecha,hora,arquitecto}
                    data.push(nuevaData);
                    guardarDataLS();
                    actualTable();
                    formularioCita.reset();
                    swal("Cita Agendada","","success")
            }
        }

        // if(fechaR && arquiOcup && horaR){
        //     swal("fecha no disponible","","error")
        //     formularioCita.reset();
        //     return;
        
        // }else{
        //     const nuevaData = {nombre,apellido,email,telefono,cedula,fecha,hora,arquitecto}
        //         data.push(nuevaData);
        //         guardarDataLS();
        //         actualTable();
        //         formularioCita.reset();
        //         swal("Cita Agendada","","success")
        // }
})

function guardarDataLS() {
    localStorage.setItem("formData",JSON.stringify(data));
}
function actualTable() {
    contenedorCitas.innerHTML = ``;

    data.forEach(function(item,index) {
        const row = document.createElement("tr");
        const nombreCelda = document.createElement("td");
        const apellidoCelda = document.createElement("td");
        const emailCelda = document.createElement("td");
        const telefonoCelda = document.createElement("td");
        const cedulaCelda = document.createElement("td");
        const fechaCelda = document.createElement("td");
        const horaCelda = document.createElement("td");
        const arquitectoCelda = document.createElement("td");
        const accionCelda = document.createElement("td")

        const editarBoton = document.createElement("button")
        const eliminarBoton = document.createElement("button")

        nombreCelda.textContent = item.nombre;
        apellidoCelda.textContent = item.apellido;
        emailCelda.textContent = item.email;
        telefonoCelda.textContent = item.telefono;
        cedulaCelda.textContent = item.cedula;
        fechaCelda.textContent = item.fecha;
        horaCelda.textContent = item.hora;
        arquitectoCelda.textContent = item.arquitecto;

        editarBoton.textContent = "✏";
        eliminarBoton.textContent = "❌";
        editarBoton.classList.add("botoneditar")
        eliminarBoton.classList.add("botoneliminar")

        editarBoton.addEventListener("click",()=>{
            editarData(index);
            
        })

        eliminarBoton.addEventListener("click",()=>{
            eliminarData(index);
        }) 

        accionCelda.appendChild(editarBoton);
        accionCelda.appendChild(eliminarBoton);

        row.appendChild(nombreCelda);
        row.appendChild(apellidoCelda);
        row.appendChild(emailCelda);
        row.appendChild(telefonoCelda);
        row.appendChild(cedulaCelda);
        row.appendChild(fechaCelda);
        row.appendChild(horaCelda);
        row.appendChild(arquitectoCelda);
        row.appendChild(accionCelda)

        contenedorCitas.appendChild(row)
    });
}

function editarData(index) {
    const item = data[index];
    nombreInput.value = item.nombre
    apellidoInput.value = item.apellido
    emailInput.value = item.email
    telefonoInput.value = item.telefono
    cedulaInput.value = item.cedula
    fechaInput.value = item.fecha
    horaInput.value = item.hora
    arquitectoInput.value = item.arquitecto

    data.splice(index,1);
    guardarDataLS();
    actualTable();
}

function eliminarData(index) {
    data.splice(index,1);
    guardarDataLS();
    actualTable();
    swal("dato eliminado","","success")
}
actualTable();


// script login

let contenGeneral = document.getElementById("contenGeneral")
let btnInicioSesion = document.getElementById("btnInicioSesion")
let btnCerrarSesion = document.getElementById("btncerrarSesion")
let cerrarLogin = document.getElementById("cerrarLogin")

const $submit = document.getElementById("submit"),
      $password = document.getElementById("password"),
      $email = document.getElementById("email2"),
      $visible = document.getElementById("visible");
let formulario =document.getElementById("formulario");

let arquitectos = [ // Lista de arquitectos

   {correo: "arquitecto1@gmail.com",
    contraseña: 12345  
   },

   {correo: "arquitecto2@gmail.com",
    contraseña: 54321  
   },

   {correo: "arquitecto3@gmail.com",
    contraseña: 11111  
   },

]

// guardamos los datos en localStorage
localStorage.setItem("arquitectos", JSON.stringify(arquitectos));

let datos = JSON.parse(localStorage.getItem("arquitectos"));
      
     
//  VALIDAR EL MOSTRAR CONTRASEÑA 
document.addEventListener("change", (e)=>{
if(e.target === $visible){
    if($visible.checked === false) $password.type= "password";
    else $password.type = "text";
    }
})
// VALIDAMOS INICIO SESION DE LOS ARQUITECTOS 
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const emailR = datos.some(({ correo }) => correo === $email.value);
    const passwordR = datos.some(({ contraseña }) => contraseña == $password.value);
        console.log(emailR);
        console.log(passwordR);
    if (emailR && passwordR) {
        // window.location.href = "index.html"
        contenGeneral.classList.remove("d-none")
        contenGeneral.classList.add("d-flex")
        formulario.reset();
        btnInicioSesion.classList.add("d-none")
        btnCerrarSesion.classList.remove("d-none")
        cerrarLogin.click();
        swal("BIENVENIDO","","")
    }else{
        swal("datos incorrectos","","error")
        formulario.reset();
    }
})

btnCerrarSesion.addEventListener("click",()=>{
    btnCerrarSesion.classList.toggle("d-none")
    btnInicioSesion.classList.toggle("d-none")
    contenGeneral.classList.remove("d-flex")
    contenGeneral.classList.add("d-none")
    cerrarLogin.click();
})

