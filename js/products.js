const PRODUCTOS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

function clickeaCadaProducto(id) {
    console.log("le dió click")
}


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
    <div class="list-group" id="cat-list-container">
    </div>
    </div>
    </div>
    `
    //cambiamos category.productCount por category.name//




    document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;
    for(let i = 0; i < datos.products.length; i++){

            htmlContentToAppend += `
            <div onclick="clickeaCadaProducto()" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                    <img src="${datos.products[i].image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <h4 class="m-3">`+ datos.products[i].name +`</h4>
                        <small class="text-muted">`+ datos.products[i].soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">${datos.products[i].description}</p>
                    </div>
                </div>
            </div>
            `
        

            document.getElementsByClassName("pb-5 container")[0].innerHTML = htmlContentToAppend;
    }
    
})