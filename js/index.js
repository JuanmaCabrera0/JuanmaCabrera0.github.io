document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
//console.log(localStorage.getItem('usernameValue'));
let htmlContentToAppend2 = "";
htmlContentToAppend2 += `
<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          `+localStorage.getItem('usernameValue')+`
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item text-center" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item text-center" href="my-profile.html">Mi perfil</a></li>
            <li><a class="dropdown-item text-center" href="index.html">Cerrar sesión</a></li>
          </ul>
        </li>`
        ;


document.getElementsByClassName('navbar-nav w-100 justify-content-between')[0].innerHTML+=htmlContentToAppend2;

// `+localStorage.getItem('usernameValue')+`