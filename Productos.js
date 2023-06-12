$(document).ready(function() {
   
  var productosTable = $("#productosTable").DataTable({
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "precio" },
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
      var descripcionProducto = $("#descripcionProducto").val();
  
      var porcentaje1 = parseFloat($("#porcentaje1").val());
      var porcentaje2 = parseFloat($("#porcentaje2").val());
      var porcentaje3 = parseFloat($("#porcentaje3").val());
      var porcentaje4 = parseFloat($("#porcentaje4").val());
  
      var precioFinal = calcularPrecioFinal(precioProducto, porcentaje1, porcentaje2, porcentaje3, porcentaje4);
  
      var nuevoProducto = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioFinal,
        descripcion: descripcionProducto
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
      var descripcionProducto = $("#descripcionProducto-act").val();
  
      var porcentaje1 = parseFloat($("#porcentaje1-act").val());
      var porcentaje2 = parseFloat($("#porcentaje2-act").val());
      var porcentaje3 = parseFloat($("#porcentaje3-act").val());
      var porcentaje4 = parseFloat($("#porcentaje4-act").val());
  
      var precioFinal = calcularPrecioFinal(precioProducto, porcentaje1, porcentaje2, porcentaje3, porcentaje4);
  
      var rowData = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioFinal,
        descripcion: descripcionProducto
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
      debugger
      currentRow = $(this).closest("tr");
      var data = productosTable.row(currentRow).data();
      var idProducto = data.id;
      var nombreProducto = data.nombre;
      var precioOriginal = data.precio; // Guardar el precio original sin los cálculos
      var descripcionProducto = data.descripcion;
  
      $("#id-producto").val(idProducto);
      $("#nombreProducto-act").val(nombreProducto);
      $("#precioProducto-act").val(precioOriginal); // Restablecer el precio original
      $("#descripcionProducto-act").val(descripcionProducto);
      $("#precioOriginal").val(precioOriginal); // Guardar el precio original en el campo oculto
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

      let resultado = precioProducto *  (1 + (porcentaje1 / 100));
      resultado += resultado * (1 + (porcentaje2 / 100));
      resultado += resultado * (1 + (porcentaje3 / 100));
      resultado += resultado * (1 + (porcentaje4 / 100));
      return resultado.toFixed(3);  // Redondear el resultado a 2 decimales

    }
  
    function guardarProductosEnLocalStorage() {
      var productos = productosTable.data().toArray();
  
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  });
  