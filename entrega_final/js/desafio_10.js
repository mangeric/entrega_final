const array_comidas=[];
const carrito=[];
const nombre=$('#nombre');
const precio=document.getElementById('precio');
const menu=document.getElementById('menu');
const items=document.getElementById('items');
const footer=document.getElementById('footer');
const templeate_carrito=document.getElementById('template-carrito');
const templeate_footer=document.getElementById('template-footer');
const nuevo=$('#menu');

class Comida{
    constructor(id,nombre,precio,stock,cantidad,compra){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.cantidad=cantidad||0;
        this.compra=compra||0;
    } 
    aumentarCantidad(){
        this.cantidad++;
    }
    restarCantiad(){
        this.cantidad--;
    }
}


const URLJSON = "catalogo.json";
$.getJSON(URLJSON, function (respuesta, estado){
    if(estado === "success"){
        let misDatos = respuesta;
        const clase= $('#menu');
        for(const comida of misDatos ){
            array_comidas.push(new Comida(comida.id, comida.nombre, comida.precio, comida.stock))
        }
        for(const comida of array_comidas){
            const contenedor = document.createElement('div')
            contenedor.className='card'
            contenedor.innerHTML=`
                                <img src="img/img_${comida.id}.jpg" class="card-img-top" alt=${comida.nombre}>
                                <div class="card-body">
                                    <h5 class="card-title">${comida.nombre}</h5>
                                    <p class="card-text">$ ${comida.precio}</p>
                                    <button id=${comida.id} class="btn btn-primary comprar btnMostrar">Comprar</button>
                                </div>`
            clase.append(contenedor)
            
            $(`#${comida.id}`).click(() => comprar(comida))
        }
    
    }
  
})



function comprar(producto){
    console.log(producto)
    let compra = carrito.find(el=> el.nombre=== producto.nombre)
    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
            console.log("se aumento la cantidad")
        }else{
            alert('no hay mas stock')
        }
    }else{
        carrito.push(producto);
        producto.aumentarCantidad();
       
    }    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    pintar_carrito(carrito);
    total(carrito);
    
    
    
}

function cargarLocalStorage(){
    let carro = JSON.parse(localStorage.getItem('carrito'))
    if(carro){
        for(let i = 0; i < carro.length; i++){
            carrito.push(new Comida(carro[i].id, carro[i].nombre, carro[i].precio, carro[i].stock, carro[i].cantidad))
        }
    }
    console.log(carrito)
    pintar_carrito(carrito);
   
}



function pintar_carrito(carrito){
    $("#items").empty();
    for(let i=0; i<carrito.length;i++){
        $("#items").append(`<div id="template-carrito" class="card carro;">
            <img src="img/img_${carrito[i].id}.jpg" class="card-img-top" alt=${carrito[i].nombre} width="336" height="232">
            <div class="card-body">
            <h5 class="card-title">${carrito[i].nombre}</h5>
            <p  id="precio${carrito[i].id}"  class="card-text bg-dark text-white text-center">$ ${carrito[i].precio*carrito[i].cantidad}</p>
            <p id="cantidad${carrito[i].id}" class="card-text bg-dark text-white text-center ">Cantidad: ${carrito[i].cantidad}</p>
            <button id="sumar${carrito[i].id}" class="btn btn-info btn-sm mx-auto text-center">
            +
            </button>
            <button id="restar${carrito[i].id}" class="btn btn-danger btn-sm mx-auto text-center ">
                -
            </button>
            
            </div>
            </div>
            `
        );
      
        $(`#template-carrito`).append(() => {
            $(`#template-carrito`).addClass("animate__animated animate__slideInDown")
          
            })
        $(`#restar${carrito[i].id}`).click(()=>{
            restar(carrito[i], $(`#restar${carrito[i].id}`))
        }) 
        $(`#sumar${carrito[i].id}`).click(()=>{
            sumar(carrito[i], $(`#sumar${carrito[i].id}`))
        })
       
    }
}
function sumar(carro,btn){
    carro.aumentarCantidad();   
    $(`#cantidad${carro.id}`).html(`Cantidad:${carro.cantidad}`)
    $(`#precio${carro.id}`).html(`$ ${carro.cantidad*carro.precio}`)
    if(carro.cantidad>=carro.stock){
        btn.attr('disabled',true)
        console.log("no hay mas stock");
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    total(carrito);
}

function restar(carro,btn1){
    carro.restarCantiad();
    $(`#cantidad${carro.id}`).html(`Cantidad:${carro.cantidad}`)
    $(`#precio${carro.id}`).html(`$ ${carro.cantidad*carro.precio}`)
    if(carro.cantidad <=0){
        btn1.attr('disabled',true)
        
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    total(carrito);
}

function total(carrito){
      let precio=0;
        for(let i = 0; i < carrito.length; i++){
            precio=precio+carrito[i].precio*carrito[i].cantidad; 
            $(`#servicios`).html(`<h1>Total=${precio}`)

        }

    }


    cargarLocalStorage();







/*
const add_carrito=e=>{
    console.log(e.target);
    if(e.target.classList.contains('btn-primary')){}
}
menu.addEventListener('click',e =>{
    add_carrito(e);
})
*/

