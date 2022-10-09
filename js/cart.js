let cart = [];

let cartIDS = [];

let cart_id = `25801`;

const PROD_INF = `https://japceibal.github.io/emercado-api/products/`

document.getElementsByClassName("alert alert-danger text-center")[0].style.display = "none";

let currency = 0;

let subtotal = 0; 

let cost = 0;

let stock = 10; //Esta variable stock la pongo como 10 porque no tenemos información del stock del producto,
    //Si la tuvieramos sería esa misma. Es para evitar que usuario agregue al carrito infinitas cantidades de un producto.

let added = [];

function showCartInfo(x){ //Función que recibe el array con la data del carrito de usuario y lo manipula

    let htmlContentToAppendaux = ``;

    for(let i=0; i<x.length; i++){ //Este for recorre todo el length de cart y por cada iteración hace las cuentas necesarias y agrega el contenido HTML.
        
         subtotal = x[i].count*x[i].unitCost; //Calculo el subtotal como count por unit cost.

         cost = x[i].unitCost; //Y cost como unit cost, el costo por unidad del artículo.

         if (x[i].currency != "UYU"){ //Este if chequea si la divisa es UYU o USD. Iniciualmente currency la definí como 0 y digo que significa UYU. Si la currency
            //de la entrada iésima de mi array no es UYU, entonces currency es 1 (USD). De lo contrario es 0 (UYU).
            currency = 1;
         }else{currency = 0}
         
        htmlContentToAppendaux += //Agrego el contenido HTML a la tabla, con la información necesaria en el carrito.
        `
        <tr id=table">
        <td class="w-25"><img src="${x[i].image}" class="img-thumbnail" alt="..."></td>
        <td class="w-25"><div class=" d-flex">${x[i].name}</div></td>

        <td class="w-25"><div class=" d-flex">${x[i].currency} ${x[i].unitCost}</div></td>

        <td class="w-25">

          <div class="col-md-3 col-lg-1 d-flex mw-10">

           <input class="text-center" onkeydown="return false" onClick="calcSubtotal(${i},${cost},${currency})" id="cantidad${i}" min="1" max="${stock}" value="${x[i].count}" type="number">
        
           </div>
        </td>
        
        <td class="w-25"><div id="subtotal${i}" class="d-flex">${x[i].currency} ${subtotal}</div></td>
    </tr>
    
        `
//El input de arriba "prohibe" al usuario cambiar manualmente la cantidad de productos, únicamente podrá hacerlo clickeando los botones de arriba y abajo que están al lado del input.
//Esos botones llaman a la función calcSubtotal, que calculará el subtotal del artículo según el número de ejemplares que agregó el usuario.
    }

    document.getElementById("cart-body").innerHTML = htmlContentToAppendaux;
}

function calcSubtotal(i,costo,moneda){ //Función que calcula el subtotal cada vez que usuario modifica el valor de ejemplares de un artículo. Recibe la entrada específica de la iteración anterior,
    //el costo por unidad del producto y la divisa.

    if (moneda){currency = "USD"}else{currency = "UYU"} //Acá defino currency como un string UYU o USD dependiendo si es 0 o 1.

    let slotQty = "cantidad" + i; //Me refiero a la ID específica del input. Ejemplo, la entrada 0 de la tabla tendrá id = "cantidad0", la 1 ="cantidad1" y así.

    let slotSubtotal = "subtotal" + i; //Me refiero a la ID específica del subtotal. Ejemplo, la entrada 0 de la tabla tendrá id = "subtotal0", la 1 ="subtotal1" y así.

    let times = document.getElementById(slotQty).value; //Times será la cantidad de veces por las que tengo que multiplicar el valor unitario. Si usuario puso 6 será 6.

    subtotal = times * costo; //Acá calculo times por costo unitario y obtengo el nuevo subtotal.
    
    const oldSubtotal = document.getElementById(slotSubtotal); //Mi antiguo subtotal será este.
    
    const newSubtotal = document.createElement('div'); //Y aquí creo un div con mi nuevo subtotal

    newSubtotal.innerHTML = `<div id="subtotal${i}" class="d-flex">`+currency + ` ` + subtotal+`</div>`;

    oldSubtotal.parentNode.replaceChild(newSubtotal, oldSubtotal)  //Y por último reemplazo el viejo por el nuevo

    
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

        getJSONData(PROD_INF+x[i].newItem+`.json`).then(function(resultObj){ //Y hará un fetch por cada caso, utilizando la API + la id que se encuentra en la 
            //iésima entrada + .json.
            
            if (resultObj.status === "ok"){ 
        
                    cart.push( //Por cada fetch que haga en cada iteración, agregará una entrada al array cart con el formato id, name, count, unitcost,etc.
                            {
                                "id": resultObj.data.id,
                                "name": resultObj.data.name,
                                "count": 1,
                                "unitCost": resultObj.data.cost,
                                "currency": resultObj.data.currency,
                                "image": resultObj.data.images[0],
                            },
    
                    )
                    
                    showCartInfo(cart); //Y una vez que cart esté completa, es decir, tenga toda la info de cada producto que usuario tiene en carrito, llama a showcartinfo.
            }
        })

    }
}

