function generarFactura() {
    var selectCliente = document.getElementById("clientes");
    var clienteSeleccionado = selectCliente.options[selectCliente.selectedIndex].text;
  
    var table = $('#productosTable').DataTable();
    var productoSeleccionado = "";
    var precioSeleccionado = "";
  
    $('#productosTable tbody tr.selected').each(function() {
      var rowData = table.row($(this)).data();
      productoSeleccionado = rowData[0];
      precioSeleccionado = rowData[1];
    });
  
    // Aquí puedes realizar cualquier otra acción con los datos del cliente y el producto seleccionados,
    // como calcular el precio total, generar un número de factura, etc.
  
    var facturaGenerada = document.getElementById("facturaGenerada");
    facturaGenerada.innerHTML = "Cliente: " + clienteSeleccionado + "<br>Producto: " + productoSeleccionado + "<br>Precio: " + precioSeleccionado;
  }
  