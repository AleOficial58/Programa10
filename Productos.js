$(document).ready(function() {
   
  var productosTable = $("#productosTable").DataTable({
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "precio" },
        { data: "stock" },
        { data: "descripcion" },
        { data: null }
      ],
      columnDefs: [
        {
          targets: -1,
          render: function(data, type, row) {
            return createActionsButtons(row);
          }
        }
      ]
    });
    var currentRow;

    
  
    // Verificar si hay datos en el almacenamiento local al cargar la página
    var productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      var productos = JSON.parse(productosGuardados);
      productosTable.rows.add(productos).draw();
    }
  
    $("#agregarProductoForm").submit(function(event) {
      event.preventDefault();
      var idProducto = generateUniqueID();
      var nombreProducto = $("#nombreProducto").val();
      var precioProducto = parseFloat($("#precioProducto").val());
      var stock = parseFloat($("#Stock").val());
      var descripcionProducto = $("#descripcionProducto").val();
  
      var porcentaje1 = parseFloat($("#porcentaje1").val());
      var porcentaje2 = parseFloat($("#porcentaje2").val());
      var porcentaje3 = parseFloat($("#porcentaje3").val());
      var porcentaje4 = parseFloat($("#porcentaje4").val());
      var descuento = parseFloat($("#descuento").val());
      var precioFinal = precioProducto
      if (![porcentaje1,porcentaje2, porcentaje3, porcentaje4].includes("") && ![porcentaje1,porcentaje2, porcentaje3, porcentaje4].includes(null)) {
        console.log(precioFinal)
         precioFinal = calcularPrecioFinal(precioProducto, porcentaje1, porcentaje2, porcentaje3, porcentaje4);
      }
      
      
      // aplicar descuento
      
    if (descuento) {
      precioFinal -= precioFinal * (descuento / 100)
    }
    
      var nuevoProducto = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioFinal,
        stock: stock,
        descripcion: descripcionProducto, 
        p1: porcentaje1, 
        p2: porcentaje2,
        p3: porcentaje3,
        p4: porcentaje4,
        precioBruto: precioProducto,
        descuento: descuento
      };
  
      productosTable.row.add(nuevoProducto).draw();
  
      guardarProductosEnLocalStorage();
  
      $("#modalProductos").modal("hide");
      $("#agregarProductoForm")[0].reset();
    });
  
    $("#actualizarProductoForm").submit(function(event) {
  
      event.preventDefault();
      var idProducto = $("#id-producto").val();
      var nombreProducto = $("#nombreProducto-act").val();
      var precioProducto = parseFloat($("#precioProducto-act").val());
      var stock = $("#Stock-act").val()
      var descripcionProducto = $("#descripcionProducto-act").val();
  
      var porcentaje1 = parseFloat($("#porcentaje1-act").val());
      var porcentaje2 = parseFloat($("#porcentaje2-act").val());
      var porcentaje3 = parseFloat($("#porcentaje3-act").val());
      var porcentaje4 = parseFloat($("#porcentaje4-act").val());
      var descuento = parseFloat($("#descuento-act").val());
      if (![porcentaje1,porcentaje2, porcentaje3, porcentaje4].includes("")) {
        precioFinal = calcularPrecioFinal(precioProducto, porcentaje1, porcentaje2, porcentaje3, porcentaje4);
      }
      
      // aplicar descuento

      if (descuento) {
        precioFinal -= precioFinal * (descuento / 100)
      }
      
      var rowData = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioFinal,
        stock: stock,
        descripcion: descripcionProducto,
        p1: porcentaje1, 
        p2: porcentaje2,
        p3: porcentaje3,
        p4: porcentaje4,
        precioBruto: precioProducto,
        descuento: descuento


      };
  
      productosTable.row(currentRow).data(rowData).draw();
  
      guardarProductosEnLocalStorage();
  
      $("#modalProductos-act").modal("hide");
      $("#actualizarProductoForm")[0].reset();
    });
  
    function createActionsButtons(row) {
      var editButton = '<button type="button" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#modalProductos-act">Editar</button>';
      var deleteButton = '<button type="button" class="btn btn-danger btn-delete">Eliminar</button>';
      return editButton + deleteButton;
    }

    $("#productosTable tbody").on("click", ".btn-edit", function() { 
      
      currentRow = $(this).closest("tr");
      var data = productosTable.row(currentRow).data();
      //var idProducto = data.id;
      //var nombreProducto = data.nombre;
      //var precioOriginal = data.precio; // Guardar el precio original sin los cálculos
      //var descripcionProducto = data.descripcion;
      
      let productos = JSON.parse(localStorage.getItem("productos"));
      const producto = productos.filter((p, index) => { 
        if (p.id == data.id) {
          return true
        }
    })[0]
    


      $("#id-producto").val(producto.id);
      $("#nombreProducto-act").val(producto.nombre);
      $("#precioProducto-act").val(producto.precioBruto); // Restablecer el precio original
      $("#Stock-act").val(producto.stock);
      $("#descripcionProducto-act").val(producto.descripcion);
      $("#porcentaje1-act").val(producto.p1);
      $("#porcentaje2-act").val(producto.p2);
      $("#porcentaje3-act").val(producto.p3);
      $("#porcentaje4-act").val(producto.p4);
      $("#descuento-act").val(producto.descuento)

    });
  
    $("#productosTable tbody").on("click", ".btn-delete", function() {
      var currentRow = $(this).closest("tr");
      var rowData = productosTable.row(currentRow).data();
      var nombreProducto = rowData.nombre;
  
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará el producto '" + nombreProducto + "'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          productosTable.row(currentRow).remove().draw();
          guardarProductosEnLocalStorage();
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado correctamente.", "success");
        }
      });
    });
  
    function generateUniqueID() {
      var id;
      do {
        id = Math.floor(Math.random() * 1000000); // Generar número aleatorio entre 0 y 999999
      } while (isIDUsed(id));
      return id;
    }
  
    function isIDUsed(id) {
      var used = false;
      productosTable.data().each(function(value) {
        if (value.id == id) {
          used = true;
          return false; // Salir del bucle
        }
      });
      return used;
    }

    
    function calcularPrecioFinal(precioProducto, porcentaje1, porcentaje2, porcentaje3, porcentaje4) {
      
      let resultado =  precioProducto + (precioProducto *  (porcentaje1 / 100));
      
      resultado += (resultado *  (porcentaje2 / 100));
      resultado += (resultado *  (porcentaje3 / 100));
      resultado += (resultado *  (porcentaje4 / 100));
      return resultado.toFixed(3);  // Redondear el resultado a 3 decimales
  
    }
  
    function guardarProductosEnLocalStorage() {
      var productos = productosTable.data().toArray();
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  });
  