$(document).ready(function() {
    var today = new Date();
    // var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var mesT = today.getMonth()+1 
    var mes = ''
    debugger
    if(mesT <= 9){
        mes = '0'+ mesT
    }else{
        mes = mesT.toString()
    }
    var date = today.getFullYear()+'-'+mes+'-'+today.getDate();
    var todasFacturasJSON = localStorage.getItem('facturas');
    var facturas = JSON.parse(todasFacturasJSON)
    debugger
    var facuturasFiltrasdas = facturas.filter(x => x.fecha == date)
    let todoProductos = new Productos();
    facuturasFiltrasdas.forEach(factura => {
        var productosItem = factura?.productos
        productosItem?.forEach(producto => {
            todoProductos.newProducto(producto[0], producto[1] ,producto[2])
        })
    })
    // Creamos un objeto para almacenar los resultados agrupados
    const resultado = {};

    // Recorremos el array de productos
    todoProductos?.productos?.forEach((producto) => {
    const { idProducto, nombre, cantidad } = producto;
    
    // Verificamos si ya existe una entrada para ese ID en el objeto resultado
    if (resultado[idProducto]) {
        // Si existe, sumamos la cantidad
        resultado[idProducto].cantidad += cantidad;
    } else {
        // Si no existe, creamos una nueva entrada en el objeto resultado
        resultado[idProducto] = { idProducto, nombre, cantidad };
    }
    });

    const resultadoArray = Object.values(resultado);
    debugger

    // var body = document.getElementsByTagName("body")[0];
    // Creamos un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var encabezado = document.createElement("tr");
        var celda1 = document.createElement("td");
        var celda2 = document.createElement("td");
        var textoCelda1 = document.createTextNode("Producto");
        var textoCelda2 = document.createTextNode("Cantidad");
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        encabezado.appendChild(celda1);
        encabezado.appendChild(celda2);
        tblBody.appendChild(encabezado);

    resultadoArray?.forEach(prod => {
        debugger
        var fila = document.createElement("tr");
        var celda1 = document.createElement("td");
        var celda2 = document.createElement("td");
        var textoCelda1 = document.createTextNode(prod?.nombre);
        var textoCelda2 = document.createTextNode(prod?.cantidad);
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        tblBody.appendChild(fila);
    })
    debugger
    // posicionamos el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    // body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", 2);
    tabla.setAttribute("id", "tabla");
    var result = document.getElementById("tablaReporte");
    result.appendChild(tabla);
    debugger
})

class Producto {
    idProducto;
    cantidad;
  
    constructor(idProducto, nombre, cantidad) {
      this.idProducto = idProducto;
      this.nombre = nombre;
      this.cantidad = cantidad;
    }
  }

  class Productos {
    constructor(){
        this.productos = []
      }
  
    newProducto(id, nombre, cantidad){
        let producto = new Producto(id, nombre, cantidad)
        this.productos.push(producto);
        return producto;
    }
  }

  function reiniciarCantidadDeProductos() {
    
  }

  //RECARGA//

window.addEventListener("keyup", function (e) {
    if (e.key === "F5") {
        document.getElementById('loadingOverlay').style.display = 'flex';
        setTimeout(function () {
            location.reload(true);
        }, 1000);
    }
  });
  
  //RECARGA//