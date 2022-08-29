const PRODUCTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
let minPrice = undefined;
let maxPrice = undefined;
const ORDER_ASC_BY_COST = "LowestToHighest";
const ORDER_DESC_BY_COST = "HighestToLowest";
const ORDER_BY_PROD_COST = "Precio";
let currentProductsArray = [];
let currentSortCriteria = undefined;
function clickeaCadaProducto(id) {
    console.log("le dió click")
}

function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_COST){
      result = array.sort(function(a, b) {
          let aCost = parseInt(a.cost);
          let bCost = parseInt(b.cost);

          if ( aCost > bCost ){ return -1; }
          if ( aCost < bCost ){ return 1; }
          return 0;
      });
  }
  return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
      currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

  //Muestro las categorías ordenadas
  showProductsList();
}


window.addEventListener('DOMContentLoaded', (event) => {

  fetch(PRODUCTOS_URL)
  .then(function(respuesta){
      return respuesta.json()
  })
  .then(function(datos){


    //console.log(datos.products[0].name)//chevrolet onix joy
    document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";//oculto el mensaje de funcionalidad en desarrollo
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="text-center p-4">
                    <h4 class="m-3">`+ "Productos" +`</h4> 
                    <p class="lead"> `+ "Verás aquí todos los productos de la categoría " + datos.catName +`</p>
    </div> 
    <div class="container">
      <div class="row">
        <div class="col text-end">
          <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
            <input type="radio" class="btn-check" name="options" id="sortAsc">
            <label class="btn btn-light" for="sortAsc">A-Z</label>
            <input type="radio" class="btn-check" name="options" id="sortDesc">
            <label class="btn btn-light" for="sortDesc">Z-A</label>
            <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
            <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i></label>
          </div>
        </div>
      </div>

    <div class="row"> //Filtrar por precio
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
    `
    document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;
    showProductsList();
    
    function showProductsList(){
        for(let i = 0; i < datos.products.length; i++){

          if (((minPrice === undefined) || (minPrice != undefined && parseInt(datos.products[i].cost) >= minPrice)) &&
          ((maxPrice === undefined) || (maxPrice != undefined && parseInt(datos.products[i].cost) <= maxPrice))){

            htmlContentToAppend += `
            <div onclick="clickeaCadaProducto()" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                    <img src="${datos.products[i].image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <h4 class="m-3">`+ datos.products[i].name+` - `+datos.products[i].currency+`  `+datos.products[i].cost+`</h4>
                        <small class="text-muted">`+ datos.products[i].soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">${datos.products[i].description}</p>
                    </div>
                </div>
            </div>
            `

            `
      <div class= "col-md-4">
      <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                  <img src="` + product.image + `" alt="` + product.desc + `" class="img-thumbnail">
                  <br>
                      <h3 class="mb-1 text-center">`+ product.name + `</h3>
                      <hr>
                  <div class="card-body">
                  <p class="text-center">` + product.cost + ` ` + product.currency +  `</p>
                  <p class= "text-center">` + product.soldCount + ` artículos vendidos </p>
                  <p class="card-text">` + product.description + `</p>
      </div>
      </a>
      </div> 
      `

      
          }
            document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;
    
    
    
          }
    }


    document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
  });


    document.getElementById('rangeFilterCount').addEventListener("click", function(){
      minPrice = document.getElementById("rangeFilterCountMin").value;
      maxPrice = document.getElementById("rangeFilterCountMax").value;
      
      if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }
    showProductsList();


    });
    
    // chequea que el contenido del DOM esté cargado, para mostrar la lista de productos sin ningún filtro
    result.status = 'ok';
    currentProductsArray = datos;
    console.log(currentProductsArray);
    showProductsList();

    document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function(){
      sortAndShowProducts(ORDER_BY_PROD_COST);
  });


});


});