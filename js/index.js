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
htmlContentToAppend2 += `<li class="nav-item">
<a class="nav-link" href="">`+localStorage.getItem('usernameValue')+`</a></li>`;
document.getElementsByClassName('navbar-nav w-100 justify-content-between')[0].innerHTML+=htmlContentToAppend2;