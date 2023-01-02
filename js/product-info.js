// console.log(localStorage.getItem("identifyer"));
 // Oculto mensaje de alerta
 document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";

 //Agrego nombre de usuario del usuario en el nav
 let htmlContentToAppend2 = "";
 htmlContentToAppend2 += `<li class="nav-item dropdown">
 <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
 `+localStorage.getItem('usernameValue')+`
 </a>
 <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
   <li><a class="dropdown-item text-center" href="cart.html">Mi carrito</a></li>
   <li><a class="dropdown-item text-center" href="my-profile.html">Mi perfil</a></li>
   <li><a class="dropdown-item text-center" href="index.html">Cerrar sesión</a></li>
 </ul>
</li>`;
 document.getElementsByClassName('navbar-nav w-100 justify-content-between')[0].innerHTML+=htmlContentToAppend2;

//Event listener que carga elementos HTML una vez esté el DOM cargado.
//Antes obtiene la información de la API .json, específicamente la información de cada product.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            console.log(resultObj.data.name)
            let htmlContentToAppend = "";
            htmlContentToAppend = ` 

            <div class="d-flex justify-content-center container mt-5">
              <div class="card p-3 bg-white">

               <div><h2 class="text-center pt-2 display-4">`+resultObj.data.name+`</h2></div>
            
            <br>

                 <div class="d-grid gap-2 col-3 mx-auto">
                  <button class="btn btn-success" id="buyButton" type="button">Agregar al carrito</button>
            
                </div>
            <br>
                <div class="about-product text-center mt-2 mb-3"><img src="`+resultObj.data.images[0]+`" width="70%">
                </div>
                
                <div class="stats mt-2">
                    <div class="d-flex justify-content-between p-price"><p class="fw-bold">Precio</p>
                    <p>`+resultObj.data.currency+` `+resultObj.data.cost+`</p>
                    </div>
                    <div class="d-flex justify-content-between p-price"><p class="fw-bold">Descripción</p></div>
                    <p>`+resultObj.data.description+`</p>
                    <div class="d-flex justify-content-between p-price"><p class="fw-bold">Categoría</p></div>
                    <p>`+resultObj.data.category+`</p>
                    <div class="d-flex justify-content-between p-price"><p class="fw-bold">Cantidad de vendidos</p></div>
                    <p>`+resultObj.data.soldCount+`</p>
                    <div class="d-flex justify-content-between p-price"><p class="fw-bold">Más imágenes</p></div>
                </div>

                 <div class="card-group">
                 <div class="card">
                   <img class="card-img-top" src="`+resultObj.data.images[1]+`" alt="Card image cap">
                 </div>
                 <div class="card">
                   <img class="card-img-top" src="`+resultObj.data.images[2]+`" alt="Card image cap">
                 </div>
                 <div class="card">
                   <img class="card-img-top" src="`+resultObj.data.images[3]+`" alt="Card image cap">
                 </div>
               </div>
               </div>
               </div>    
               <div class="row">
                 <div class="card-deck" id="cat-list-container"></div>
               </div>

              <div class="container">
               <div class="row justify-content-center" id="row">
               <h4 class="text-center pt-2 pb-2">Productos Relacionados:</h4>
               </div>
            
            </div>
            </div>
            `
             document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;
             mostrarRelatedProducts(resultObj.data.relatedProducts);

               //Obtiene la información de los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

      if (resultObj.status === "ok"){

        let commentsArray = resultObj.data; //Si está todo ok, llama a la función que muestra los comentarios de usuarios.

        mostrarComments(commentsArray);

      }

    })} 


    document.getElementById("buyButton").addEventListener("click", function(e){
      addToCart(resultObj.data.id)
    })

    })

})

function addToCart(id) {

  var currentCart = JSON.parse(localStorage.getItem("allItems"));

  if(currentCart == null) currentCart = [];

  var newItem = id;

  var entry = { newItem,};

  localStorage.setItem("entry", JSON.stringify(entry));

  exists = currentCart.some(obj => obj.newItem === entry.newItem);

if (!exists) {

  currentCart.push(entry);

  localStorage.setItem("allItems", JSON.stringify(currentCart));

}else{
  alert("Ya agregaste este producto al carrito, podrás modificar la cantidad antes de pagar.")
}
  
};



function mostrarRelatedProducts(x){
  let relatedProductsToAppend = "";
  for (let i=0; i<x.length; i++){
  relatedProductsToAppend = `     

  <div class="col-md-4 cursor-active" onClick="clickeaCadaProducto(`+x[i].id+`)">

      <div class="card mb-4 box-shadow" >

          <img class="card-img-top" src="`+x[i].image+`" alt="Card image cap">

            <div class="card-body">

              <p class="card-text text-center">`+x[i].name+`</p>

            </div>
              
      </div>

    </div>


      `
      document.getElementById("row").innerHTML += relatedProductsToAppend;
    }
}

function clickeaCadaProducto(x){
    localStorage.setItem("identifyer", x);
    window.location.href = 'product-info.html';
}

function mostrarComments(x){ 
  //Función que muestra los comentarios. Recibe un array x con la información fetcheada.
  // console.log(x[1].user)

  // Appendea la parte estática de la página.
  if (x.length != 0){
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <h4 class="text-center pt-2">Comentarios</h4>`
    document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
    // Este for itera desde 0 a el largo de x, es decir, la cantidad de comentarios de la API.
    //Appendeará la información de cada entrada del array, nombre de usuario, hora en que usuario envió su comentario,
    //y su comentario.
    for (let i=0; i < x.length; i++){
      htmlContentToAppend =`
      <div class="list-group-item">
          <div class="row">
              <div class="col">
                <div class="star-container">
                </div>
                   <p class="fw-bold m-0">`+x[i].user+`</p><small>`+x[i].dateTime+`</small>
                   <p>` + x[i].description + `</p>
              </div>
          </div>
      </div>
        ` 
        document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
        mostrarRatings(x,i) //Llama a la función que mostrará la cantidad de estrellas que usuario dejó
        // siendo x el mismo array que recibió mostrarComments, el respectivo numero de la iteración.

      }
  }


  let commentsToAppendear = "";
      commentsToAppendear = `
      <h4 class="text-center pt-3">Comentar</h4>
      <h6 class="text-center pt-2">Tu opinión:</h6>
      <div class="input-group w-50% p-2">
         <textarea style="resize: none;" rows="5" class="form-control mb-3" id="inputComments" aria-label="With textarea"></textarea>
      </div>
    <div class="input-group mb-3 w-50% p-2">
      <select class="form-select" id="puntuacion" aria-label="Default select example">
        <option selected>Puntuación</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
     </select>
        <input class="btn btn-primary" id="submit" type="submit" value="Enviar">
    </div>
      
      `
      document.getElementById("cat-list-container").innerHTML += commentsToAppendear;

}

function mostrarRatings(x,n){ //Función que mostrará la cantidad de estrellas que usuario dejó
  // Recibe x array y n número. 
  let times = x[n].score;  //Cantidad de veces que deberá iterar, dependiendo de la cantidad de estrellas que usuario dejó.
  let estrellasParaAppendear = "";
  let estrellasVParaAppendear = "";
  for (let i=1; i<=times; i++){  //For que itera de 1 (porque la mínima estrella es 1), a la cantidad que dejó
    // Suma una estrella a estrellasParaAppendear, y luego las appendea.
    estrellasParaAppendear += `<i class="fa fa-star" aria-hidden="true"></i>`
  }
  document.getElementsByClassName("star-container")[n].innerHTML += estrellasParaAppendear; //Lo appendea en n, es decir, en el enésimo div de clase star-container
  for (let i=0; i<5-times; i++)
  {
    estrellasVParaAppendear += `<i class="far fa-star"></i>`
  }
  document.getElementsByClassName("star-container")[n].innerHTML += estrellasVParaAppendear;

}

