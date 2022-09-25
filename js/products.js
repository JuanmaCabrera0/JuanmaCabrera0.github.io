const ORDER_ASC_BY_COST = "ascendente"; //Definimos el precio ascendente
const ORDER_DESC_BY_COST = "descendente"; //Definimos el precio descendente 
const ORDER_BY_SOLD_COUNT = "Relevance";
var currentSortCriteria = undefined;
var currentProductsArray = [];
var productsArray = [];
var minCost = undefined;
var maxCost = undefined;

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


function clickeaCadaProducto(x){
    let product = currentProductsArray[x];
    localStorage.setItem("identifyer", product.id);
    window.location.href = 'product-info.html';
  }

// funcion que recibe un criterio y hace un sort  de los productos según el caso
function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) //ascendente
  {
      result = array.sort(function(a, b) {
          let aCost = parseInt(a.cost);
          let bCost = parseInt(b.cost);

          if ( aCost < bCost ){ return -1; }
          if ( aCost > bCost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){ //descente
      result = array.sort(function(a, b) {
          let aCost = parseInt(a.cost);
          let bCost = parseInt(b.cost);

          if ( aCost > bCost ){ return -1; }
          if ( aCost < bCost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_SOLD_COUNT){ //relevancia
      result = array.sort(function(a, b) {
          let aSoldCount = parseInt(a.soldCount);
          let bSoldCount = parseInt(b.soldCount);

          if ( aSoldCount > bSoldCount ){ return -1; }
          if ( aSoldCount < bSoldCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

//Esta funcion muestra los productos, pasa por un filtro que chequea que min y max estén bien
// contempla los casos de mincost y maxcost vacìo por si usuario cliqueó filtrar sin poner nada, o solo
//llenó uno de los campos
function showProductsList(){

  let htmlContentToAppend = "";

  for(let i = 0; i < currentProductsArray.length; i++){
      let product = currentProductsArray[i];

      if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
          ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

      htmlContentToAppend += `
      <div class="list-group-item list-group-item-action cursor-active" onClick="clickeaCadaProducto(`+i+`)">
      <div class="row">
              <div class="col-3" >
              <img src="` + product.image + `" alt="` + product.desc + `" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                  <h4 class="m-3">`+ product.name+` - `+product.currency+`  `+product.cost+`</h4>
                  <small class="text-muted">`+ product.soldCount + ` vendidos</small>
                  </div>
                  <p class="mb-1">` + product.description + `</p>
              </div>
          </div>
      </div>
      `
      document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

  }
}
}
// 
function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
      currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

  showProductsList();
}
// esto se ejecuta cuando el DOM esté completamente cargado, obtiene los datos de la API y si está todo
// en orden, carga los productos por defecto en orden ascendente llamando a sortandshowproducts,
// también agrega el nombre de la categoría
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data.products);
          let htmlContentToAppend1 ="";
          let categoryName = resultObj.data.catName;
          htmlContentToAppend1 = `<p class="lead"> `+ "Verás aquí todos los productos de la categoría " + categoryName +`</p>`
          document.getElementsByClassName("text-center p-4")[0].innerHTML += htmlContentToAppend1;
      }
  });

//Agrego el contenido HTML que es estático, botones, inputs, textos etc.
  let htmlContentToAppend = "";
  htmlContentToAppend += `
  <div class="text-center p-4">
                  <h4 class="m-3">`+ "Productos" +`</h4> 
  </div> 
  <div class="container">
    <div class="row">
      <div class="col text-end">
        <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
          <input type="radio" class="btn-check" name="options" id="sortAsc">
          <label class="btn btn-light" for="sortDesc"><i class="fas fa-sort-amount-down mr-1"></i>$</label>
          <input type="radio" class="btn-check" name="options" id="sortDesc">
          <label class="btn btn-light" for="sortAsc"><i class="fas fa-sort-amount-up mr-1"></i>$</label>
          <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
          <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1">Rel.</i></label>
        </div>
      </div>
    </div>
  <div class="row">
  <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
    <div class="row container p-0 m-0">
      <div class="col">
        <p class="font-weight-normal text-end my-2">Precio</p>
      </div>
      <div class="col">
        <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
      </div>
      <div class="col">
        <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
      </div>
      <div class="col-3 p-0">
        <div class="btn-group" role="group">
          <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
          <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="row">
                <div class="card-deck" id="cat-list-container">
                </div>
            </div>

  `
  document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;

//Event listener de click que detecta cuando usuario cliqueó el botón y llama a la función sortandshow
// con el criterio correspondiente según el botón que se cliqueó.
  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_ASC_BY_COST);
  });

//Event listener de click que detecta cuando usuario cliqueó el botón y llama a la función sortandshow
// con el criterio correspondiente según el botón que se cliqueó.
  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_DESC_BY_COST);
  });

//Event listener de click que detecta cuando usuario cliqueó el botón y llama a la función sortandshow
// con el criterio correspondiente según el botón que se cliqueó.
  document.getElementById("sortByCount").addEventListener("click", function(){
      sortAndShowProducts(ORDER_BY_SOLD_COUNT);
  });
  
//Event listener de click que detecta cuando usuario cliqueó botón limpiar y establece mincost y maxcost
//como indefinidos, luego llama a showproductslist
  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCost = undefined;
      maxCost = undefined;

      showProductsList();
  });

      //escucho los clicks de filtrar, según lo que contengan los inputs de min y max se hacen algunas 
      // modificaciones. Si mincost no es indefinido (es decir, se puso algo en esa casilla), lo que
      // hace es redefinirlo como el entero más cercano, para evitar problemas con decimales. Luego llama
      // a showproducts denuevo.
  document.getElementById("rangeFilterCount").addEventListener("click", function(){

      minCost = document.getElementById("rangeFilterCountMin").value;
      maxCost = document.getElementById("rangeFilterCountMax").value;

      if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
          minCost = parseInt(minCost);
      }
      else{
          minCost = undefined;
      }

      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
          maxCost = parseInt(maxCost);
      }
      else{
          maxCost = undefined;
      }

      showProductsList();
  });   
});