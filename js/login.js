let htmlContentToAppend1 = "";
let htmlContentToAppend2 = "";
document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";//oculto el mensaje de funcionalidad en desarrollo
    htmlContentToAppend1 += `
    <img src="img/login.png" class="img-thumbnail">
    
    <div class="text-center p-4">
                    <h2>`+ "Inicio de sesión" +`</h2> 
                <form>
                     <div class="form-group" id="form1">
                     <br>
                     <label>Email</label>
                     <input type="email" id="email" class="form-control" aria-describedby="emailHelp" placeholder="Email">
                     <br>
                     <p class="text-danger d-none" id="faltaemail">Ingresa tu e-mail</p>
                     </div>
                    <div class="form-group" id="form2">
                    <br>
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" id="password" class="form-control" placeholder="Contraseña">
                    <br>
                    <p class="text-danger d-none" id="faltacontraseña">Ingresa tu contraseña</p>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" id=boton">Ingresar</button>
                </form>
    </div>
    
    `;
    document.getElementsByClassName("container")[0].innerHTML = htmlContentToAppend1;
    let textoEmail = document.getElementById('email');
    let textoPass = document.getElementById('password');
    let miBoton = document.getElementById('boton');
    miBoton.addEventListener('click', function(evento) {
        console.log(evento);
    });

    textoEmail.addEventListener('keypress', function(evento) {
        if (textoEmail.value.length < 2) {
            miBoton.disabled = true;
            console.log('No ingresó email');
            textoEmail.style.border = 'red solid 2px';
            document.getElementById("faltacontraseña").className = "text-danger";
            document.getElementById("faltaemail").className = "text-danger";
    
        } else {
            miBoton.disabled = false;
            console.log('Ingresó email');
            textoEmail.style.border = 'blue solid 1px';
            textoPass.style.border = 'blue solid 1px';
            document.getElementById("faltacontraseña").className = "text-danger d-none";
            document.getElementById("faltaemail").className = "text-danger d-none";
        }
    });