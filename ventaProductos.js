
var table;

if (!localStorage.getItem('facturas')) {
    localStorage.setItem('facturas', JSON.stringify([]))
}


if (!localStorage.getItem('temporal')) {
    localStorage.setItem('temporal', JSON.stringify({
        clienteID: -1,
        productos: []
    }))
    table = $('#productosTable').DataTable({
        data: [],
        columns: [
            { title: "ID" },
            { title: "Producto" },
            { title: "Cantidad" },
            { title: "Precio" },
            { title: "Subtotal" }
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();

            // Calcular la suma de la columna "Subtotal"
            var subtotalTotal = api.column(4, { page: 'current' }).data()
                .reduce(function (acc, value) {
                    return acc + parseFloat(value);
                }, 0);

            // Agregar el valor de la suma debajo de la columna "Subtotal"
            $(api.column(4).footer()).html(subtotalTotal.toFixed(2));
            // $('#totalValue').text(subtotalTotal.toFixed(2));


        }
    })
}

if (JSON.parse(localStorage.getItem('temporal')).productos.length > 0) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Venta incompleta',
        text: "Existe una venta incompleta, ¿Desea continuar con la venta o crear una nueva?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'No, crear nueva',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let d = JSON.parse(localStorage.getItem('temporal'))
            document.getElementById('clientes').value = d.clienteID

            table = $('#productosTable').DataTable({
                data: d.productos,
                columns: [
                    { title: "ID" },
                    { title: "Producto" },
                    { title: "Cantidad" },
                    { title: "Precio" },
                    { title: "Subtotal" }
                ],
                footerCallback: function (row, data, start, end, display) {
                    var api = this.api();

                    // Calcular la suma de la columna "Subtotal"
                    var subtotalTotal = api.column(4, { page: 'current' }).data()
                        .reduce(function (acc, value) {
                            return acc + parseFloat(value);
                        }, 0);

                    // Agregar el valor de la suma debajo de la columna "Subtotal"
                    $(api.column(4).footer()).html(subtotalTotal.toFixed(2));
                    // $('#totalValue').text(subtotalTotal.toFixed(2));


                }
            })
            swalWithBootstrapButtons.fire(
                'Venta anterior',
                'La venta anterior fue cargada correctamente',
                'success'
            )

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            localStorage.setItem('temporal', JSON.stringify({
                clienteID: -1,
                productos: []
            }))

            table = $('#productosTable').DataTable({
                data: [],
                columns: [
                    { title: "ID" },
                    { title: "Producto" },
                    { title: "Cantidad" },
                    { title: "Precio" },
                    { title: "Subtotal" }
                ],
                footerCallback: function (row, data, start, end, display) {
                    var api = this.api();

                    // Calcular la suma de la columna "Subtotal"
                    var subtotalTotal = api.column(4, { page: 'current' }).data()
                        .reduce(function (acc, value) {
                            return acc + parseFloat(value);
                        }, 0);

                    // Agregar el valor de la suma debajo de la columna "Subtotal"
                    $(api.column(4).footer()).html(subtotalTotal.toFixed(2));
                    // $('#totalValue').text(subtotalTotal.toFixed(2));


                }
            })

            swalWithBootstrapButtons.fire(
                'Borrada',
                'Nueva venta creada',
                'success'
            )

        }
    })

} else {
    table = $('#productosTable').DataTable({
        data: [],
        columns: [
            { title: "ID" },
            { title: "Producto" },
            { title: "Cantidad" },
            { title: "Precio" },
            { title: "Subtotal" }
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();

            // Calcular la suma de la columna "Subtotal"
            var subtotalTotal = api.column(4, { page: 'current' }).data()
                .reduce(function (acc, value) {
                    return acc + parseFloat(value);
                }, 0);

            // Agregar el valor de la suma debajo de la columna "Subtotal"
            $(api.column(4).footer()).html(subtotalTotal.toFixed(2));
            // $('#totalValue').text(subtotalTotal.toFixed(2));


        }
    })
}



// $('#productosTable tbody').on('click', 'tr', function() {
//   if ($(this).hasClass('selected')) {
//     $(this).removeClass('selected');
//   } else {
//     table.$('tr.selected').removeClass('selected');
//     $(this).addClass('selected');
//   }
// });



function cargarProductos() {
    let selectProductos = document.getElementById("productos");
    let productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados);
    for (let i = 0; i < productos.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = productos[i].nombre;
        option.value = productos[i].id;
        selectProductos.appendChild(option);
    }
}

function cargarClientes() {
    let selectClientes = document.getElementById("clientes");
    let clientesGuardados = localStorage.getItem("clientesData");
    let clientes = JSON.parse(clientesGuardados);

    clientes.forEach(c => {
        let option = document.createElement("option");
        option.innerHTML = `${c[1]} ${c[2]}`;
        option.value = c[0];
        selectClientes.appendChild(option);
    });
}

function obtenerProductoPorID(id) {
    let productosGuardados = localStorage.getItem("productos");
    let productos = JSON.parse(productosGuardados);
    let producto = productos.find(p => p.id == id);
    return producto;
}




let btnAddProduct = document.getElementById("addProductToCar");
btnAddProduct.addEventListener("click", function () {

    let selectProductos = document.getElementById("productos");
    let clienteSelected = document.getElementById('clientes')
    let idProducto = selectProductos.options[selectProductos.selectedIndex].value
    let idCliente = clienteSelected.options[clienteSelected.selectedIndex].value
    if (idProducto == "" || idCliente == "") {
        Swal.fire({
            title: "Atención",
            text: `Debe selecionar un producto y un cliente`,
            icon: "error"
        })
    } else {


        selectProductos.selectedIndex = 0;

        let producto = obtenerProductoPorID(idProducto);

        let temp = JSON.parse(localStorage.getItem("temporal"))

        if (!temp.hasOwnProperty('productos')) {
            localStorage.setItem('temporal', JSON.stringify({
                clienteID: -1,
                productos: []
            }))
        }

        let flag = false;
        if (temp.productos.length > 0) {

            table.clear().draw();
            temp.productos = temp.productos.map(p => {

                if (p[0] == producto.id) {
                    p[2] = p[2] + 1; // incrementa 1 la cantidad
                    p[4] = p[2] * p[3]
                    flag = true;
                    table.row.add(p).draw();
                    return p;
                }
                table.row.add(p).draw();
                return p
            })

        }
        if (!flag) {
            table.clear().draw();
            let _p = [producto.id, producto.nombre, 1, producto.precio, producto.precio]
            temp.productos.push(_p)
            temp.productos.map(p => {
                table.row.add(p).draw();
            });
        }
        temp.clienteID = clienteSelected.options[clienteSelected.selectedIndex].value
        localStorage.setItem('temporal', JSON.stringify(temp))

    }
})


cargarClientes()
cargarProductos()

/*

-- Ahora de facturacion

*/

function generateUniqueID() {
    var uniqueID = '';
    var digits = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
        uniqueID += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return uniqueID;
}


var myModal = document.getElementById('exampleModal')
myModal.addEventListener('shown.bs.modal', function (e) {
    const facturaID = generateUniqueID()
    document.getElementById('facturaID').textContent = facturaID
    const fecha = new Date().toLocaleDateString();
    const total = document.getElementById('totalValue').textContent;
    const cID = document.getElementById('clientes').value != "" ? document.getElementById('clientes').value : JSON.parse(localStorage.getItem('temporal')).clienteID
    const cliente = JSON.parse(localStorage.getItem('clientesData')).find(c => c[0] == cID)
    const vendedor = JSON.parse(localStorage.getItem('usuarioActivo'))
    const productos = JSON.parse(localStorage.getItem('temporal')).productos;
    const factura = {
        facturaID: facturaID,
        clienteID: cliente[0],
        fecha: fecha,
        total: total,
        clienteNombre: cliente[1],
        clienteApellido: cliente[2],
        productos: productos,
        condicionVenta: "",
        entrega: "",
        vendedor: vendedor,
        zona: ""
    }


    document.querySelector(".left-section").innerHTML = `<div class="left-section">
    <h3 class="cliente30">Cliente: ${cliente[1]} ${cliente[2]}</h3>
    <p>Dirección: ${cliente[4]}</p>
    <p>IVA: ${cliente[7]}</p>
    <p>Condición de Venta: <span contenteditable id="condicionVenta">N/A</span></p>
    <p>Entrega: <span contenteditable id="entrega">N/A</span></p>
    </div>
    </div>`


    document.querySelector(".right-section").innerHTML = `<div class="right-section">
    <p class="right-info pedido">Nº Pedido: ${factura.facturaID}</p>
    <p class="right-info fecha">Fecha: ${factura.fecha}</p>
    <p class="right-info Vendedor">Vendedor: ${vendedor.first_name} ${vendedor.last_name}</p>
    <p class="right-info Zona">Zona: <span contenteditable id="zona">N/A</span></p>
    </div>`

    let facturas = JSON.parse(localStorage.getItem('facturas'))

    var table2 = $('#facturaTabla').DataTable({
        data: factura.productos,
        columns: [
            { title: "ID" },
            { title: "Producto" },
            { title: "Cantidad" },
            { title: "Precio" },
            { title: "Subtotal" }
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();

            // Calcular la suma de la columna "Subtotal"
            var subtotalTotal = api.column(4, { page: 'current' }).data()
                .reduce(function (acc, value) {
                    return acc + parseFloat(value);
                }, 0);

            // Agregar el valor de la suma debajo de la columna "Subtotal"
            $(api.column(4).footer()).html(subtotalTotal.toFixed(2));
            // $('#totalValue').text(subtotalTotal.toFixed(2));
        }
    })

    $("#GenFact").unbind("click")
    $("#GenFact").on("click", function () {
        factura.condicionVenta = document.getElementById('condicionVenta').textContent
        factura.entrega = document.getElementById('entrega').textContent
        factura.zona = document.getElementById('zona').textContent
        facturas.push(factura)
        localStorage.setItem('facturas', JSON.stringify(facturas))

        // Limpiar los productos del carrito
        localStorage.setItem('temporal', JSON.stringify({
            clienteID: -1,
            productos: []
        }))
        table.clear().draw();
        table2.clear().draw();
        document.getElementById("productos").selectedIndex = 0;
        document.getElementById('clientes').selectedIndex = 0;

        // redireccionar a facturacion
        location.href = "Facturacion.html"
    })

})
