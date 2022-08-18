let htmlContentToAppend1 = "";
document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";//oculto el mensaje de funcionalidad en desarrollo
    htmlContentToAppend1 += `
    <img src="img/login.png">
    
    <div class="text-center p-4">
                    <h3>`+ "Inicio de sesión" +`</h3> 
                    
                    <div class="form-group">
                    <form action="" id="first-formulario">
                      <label for="email">Email:</label>
                      <input type="email" class="form-control form-control-lg" id="enteremail" placeholder="Email" name="uname">
                      <h6 class="d-none" id="no-email">`+ "Ingresá tu email" +`</h6>
                    <br>
                      <label for="pwd">Contraseña:</label>
                      <input type="password" class="form-control form-control-lg" id="enterpassword" placeholder="Contraseña" name="password">
                      <h6 class="d-none" id="no-pass">`+ "Ingresá tu contraseña (mayor a 10 caracteres)" +`</h6>
                      <br>
                      <input type="submit" class="btn btn-primary btn-lg" id="boton">
                  </form>
                  </div>
          </div>
    `;
    document.getElementsByClassName("container")[0].innerHTML = htmlContentToAppend1;


    document.getElementById('first-formulario').addEventListener('submit', function(evento){    
      let textoEmail = document.getElementById('enteremail').value;
      let textoPass = document.getElementById('enterpassword').value;

      if (textoEmail.length === 0){
      evento.preventDefault();
      document.getElementById("no-pass").className = "text-danger";
      document.getElementById("no-email").className = "text-danger";
      console.log('Ingresó un email vacío');
    }
    if (textoPass.length === 0){
      evento.preventDefault();
      document.getElementById("no-pass").className = "text-danger";
      document.getElementById("no-email").className = "text-danger";
      console.log('Ingresó contraseña vacía');
    }
    if (textoEmail.length < 10 && textoEmail.length != 0){
      evento.preventDefault();
      document.getElementById("no-pass").className = "text-danger";
      document.getElementById("no-email").className = "text-danger";
      console.log('Ingresó un email incompleto');
    }
    if (textoPass.length < 10 && textoPass.length != 0){
      evento.preventDefault();
      document.getElementById("no-pass").className = "text-danger";
      document.getElementById("no-email").className = "text-danger";
      console.log('Contraseña demasiado corta');
    }
    
    if (textoEmail.length >= 10){
      if (textoPass.length >= 10){
        evento.preventDefault();
        document.getElementById("no-pass").className = "d-none";
        document.getElementById("no-email").className = "d-none";
        console.log('Se envian los datos');
        window.location.href="home.html";      }
    }
    })


