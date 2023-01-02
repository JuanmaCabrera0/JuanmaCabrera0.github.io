let cart = [];

let cartIDS = [];

let cart_id = `25801`;

const PROD_INF = `https://japceibal.github.io/emercado-api/products/`

document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";

let subtotal = 0; 

let cost = 0;

let stock = 10; //Esta variable stock la pongo como 10 porque no tenemos información del stock del producto,
    //Si la tuvieramos sería esa misma. Es para evitar que usuario agregue al carrito infinitas cantidades de un producto.

let added = [];

let currency = 0; // significa uyu

let total = 0

function showCartInfo(x){ //Función que recibe el array con la data del carrito de usuario y lo manipula

    let htmlContentToAppendaux = ``;

    if (x.currency != 'UYU'){

        currency = 1;
    }

htmlContentToAppendaux += `

        <tr id=table">
        
        <td class="w-25"><img src="${x.images[0]}" class="img-thumbnail" alt="..."></td>

        <td class="w-25"><div class=" d-flex">${x.name}</div></td>

        <td class="w-25"><div class=" d-flex">${x.currency} ${x.cost}</div></td>

        <td class="w-25">

          <div class="col-md-3 col-lg-1 d-flex mw-10">

           <input class="text-center" onkeydown="return false" id="input${x.id}" onClick='calcSubtotal(${x.cost},${currency},${x.id})' min="1" max="${stock}" value="1" type="number">
        
           </div>

        </td>
        
        <td class="w-25"><div id="subtotal${x.id}" class="d-flex">${x.currency} ${x.cost}</div></td>
    </tr>
    
        `
        let htmlSTotal = ''

        if (x.currency === 'UYU'){

            subtotal = Math.round(subtotal + x.cost/40)
    }else{

        subtotal = Math.round(subtotal + x.cost)
    }


        htmlSTotal += `
        <span>Subtotal</span>

        <strong>USD ${subtotal}</strong>

        `

    document.getElementById('subtotalCost').innerHTML = htmlSTotal

    document.getElementById("cart-body").innerHTML += htmlContentToAppendaux;

    
}

let radio1 = document.getElementById('flexRadioDefault1')

let radio2 = document.getElementById('flexRadioDefault2')

let radio3 = document.getElementById('flexRadioDefault3')

let htmlSTotal = ''

let htmlShippingCost = ''

radio1.addEventListener('click', function(e){

    if (radio1.checked){

        calculateTotal(0.15)
    }
})
radio2.addEventListener('click', function(e){

    if (radio2.checked){

        calculateTotal(0.07)
    }
})
radio3.addEventListener('click', function(e){

    if (radio3.checked){

        calculateTotal(0.05)
    }
})


function calculateTotal(percentage){ //suma todos los subtotales para mostrar en total, y llama a la calculadora de porcentajes segun tipo de envio

    total = Math.round(subtotal*percentage + subtotal)

    shippingCost = Math.round(subtotal*percentage)

    htmlSTotal = `
    
        <span>Subtotal</span>

        <strong>USD ${total}</strong>

        `
        htmlShippingCost = `

        <div>

      <h6 class="my-0">Costo de envío</h6>
      
      <small class="text-muted">Según el tipo de envío</small>

      </div>

      <strong>USD ${shippingCost}</strong>

        `

    document.getElementById('totalCost').innerHTML = htmlSTotal

    document.getElementById('shippingCost').innerHTML = htmlShippingCost
}

function calcSubtotal(cost,currency,id){ //calcula el subtotal de cada producto cuando usuario suma o resta ejemplares

    let htmlTotal = ''

    let slotInput = 'input' + id;

    let slotProductSubtotal = 'subtotal' + id

    let inputSlot = document.getElementById(slotInput).value

    if (currency === 0){

    subtotal = Math.round(subtotal + cost/40)

    let subtotalSlot = Math.round(inputSlot*cost)

    const oldSubtotal = document.getElementById(slotProductSubtotal); 
    
    const newSubtotal = document.createElement('div'); 

    newSubtotal.innerHTML = `<td class="w-25"><div class="d-flex" id="subtotal${id}">USD `+subtotalSlot+`</div></td>`
    
    oldSubtotal.parentNode.replaceChild(newSubtotal, oldSubtotal) 

    htmlTotal += `

        <span>Subtotal</span>

        <strong>UYU ${subtotal}</strong>

        `
    document.getElementById('subtotalCost').innerHTML = htmlTotal


}else{

    subtotal = Math.round(subtotal + cost)

    let subtotalSlot = Math.round(inputSlot*cost)

    const oldSubtotal = document.getElementById(slotProductSubtotal); 
    
    const newSubtotal = document.createElement('div'); 

    newSubtotal.innerHTML = `<td class="w-25"><div class="d-flex" id="subtotal${id}">UYU `+subtotalSlot+`</div></td>`
    
    oldSubtotal.parentNode.replaceChild(newSubtotal, oldSubtotal) 

    htmlTotal += `

        <span>Subtotal</span>

        <strong>USD ${subtotal}</strong>

        `
    document.getElementById('subtotalCost').innerHTML = htmlTotal


}

if(radio1.checked){

    calculateTotal(0.15)

}else if (radio2.checked){

    calculateTotal(0.07)

}else{

    calculateTotal(0.05)
}

}

function goBack(){
    window.location.href = "categories.html"
}

document.addEventListener("DOMContentLoaded", function(e){ //Event listener que ejecutará una función cuando el DOM esté 100% cargado.


    getJSONData(CART_INFO_URL+cart_id+`.json`).then(function(resultObj){ //Fetcheará la data del JSON que contiene el producto que usuario tiene en su carrito por defecto.
        
        if (resultObj.status === "ok")
        {
            cartIDS = JSON.parse(localStorage.getItem("allItems")); //Si está todo OK, redefino a cartIDS como el array de IDS de items que tengo en  el local storage.
            //Este array fue recogiendo todas las IDS de los productos a los que usuario les dio "comprar".

            if(cartIDS != null){ //Si cartsIDS no resulta nulo, es decir, usuario fue al carrito habiendo agregado al menos 1 producto, se ejecuta lo siguiente
                
                cartIDS.push(
                    {
                        "newItem": resultObj.data.articles[0].id, //A ese array le falta el producto que usuario tenía por defecto, por tanto lo pusheo.
                    },
            ) 
            getAddedData(cartIDS); //Y posteriormente llamo a la función getAddedData, que trabajará con los items.

            }else{ //Si no, es decir, usuario fue al carrito sin agregar productos, pasa esto:

                cart.push(resultObj.data.articles[0]) //Pusheo la data de articles del carrito de usuario por defecto

                    showCartInfo(cart) //Y llama a showcartinfo sin pasar por getaddeddata, pues no necesita agregar nada más.
        }

        }
        

    });
});

function getAddedData(x){ //getaddedData recibe un array (el que contiene a todas las IDS de los productos que usuario agregó al carrito.)

    for(let i=0; i<x.length; i++){ //Este for recorrerá a lo largo de todo el length de x.

        getJSONData(PROD_INF+x[i].newItem+`.json`).then(function(resultObj){ 

            if (resultObj.status === "ok"){ 

              showCartInfo(resultObj.data)

            }
        })


    }


}

