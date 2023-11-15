
// Obtener referencia al dataTable
var dataTable = document.getElementById("clientesTable");

// Obtener referencia al select

var clienteSelect = document.getElementById("selectRegistros");
// Obtener los datos del Local Storage
var registros = obtenerRegistros();

if (registros) {

var table = new Tabulator("#tablaZonas", {
  data: obtenerRegistroZone(),
  
  layout:"fitColumns",
  index: "clienteID",
  initialSort:[
    {column:"order", dir:"asc"}, 
],
  columns: [
      { title: "Orden", field: "order", editor: "number", validator:["min:1", "unique"]},
      { title: "Nombre", field: "clienteNombre"},
      { title: "Apellido", field: "clienteApellido"},
      { title: "Zona", field: "clienteZone", editor: "input", headerFilter:"input", },//headerFilter:true, headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}},

      { title: "Acciones",
          formatter: "buttonCross",
          width: 100,
          align: "center",
          print: false,
          cellClick: function(e, cell) {
              // Obtener el ID de la fila o cualquier otro dato necesario
              var rowData = cell.getRow().getData();
              var clienteID = rowData.clienteID;
              
              Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará la zona definitivamente. ¿Deseas continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  let clientes = obtenerRegistroZone()
                  const cliente = clientes.find((cliente) => cliente[0] == clienteID)
                  const index = clientes.indexOf(cliente)
                  clientes.splice(index, 1)
                  localStorage.setItem('clientesZona', JSON.stringify(clientes));
                  
                  cell.getRow().delete()
                  
                  Swal.fire(
                    'Eliminado',
                    'La zona ha sido eliminada correctamente.',
                    'success'
                  )
                }
              });
          }
  
      }
  ],
  printHeader:"<h1>CLIENTES CON ZONAS ASIGNADAS</h1>"
});



table.on("cellEdited", function(row) {
  if (row.getField() === "order") {
      const registros = obtenerRegistroZone();

      const registro = registros.find(value => value.clienteID === row.getData().clienteID);

      if (registro) {
          registro.order = row.getData().order;
          localStorage.setItem("clientesZona", JSON.stringify(registros));
          table.setSort("order", "asc");
      }
  }

  if (row.getField() === "clienteZone") {
    localStorage.setItem('clientesZona', JSON.stringify(table.getData()));
  }
});


  // Generar las opciones del select con los registros del DataTable
  generarOpcionesSelect(clienteSelect, registros);
}

var btnAgregar = document.getElementById("btnAsignar")

// Escuchar el evento de cambio en el select
btnAgregar.addEventListener("click", function () {

  var selectedValue = clienteSelect.options[clienteSelect.selectedIndex].value;
  let zone = document.getElementById("inputZona").value
  if (selectedValue !== "-1" && zone !== "") {

    // Obtener todas las filas del DataTable
    var filas = table.getData();
    let isAdded = filas.some((fila) => fila.clienteID == selectedValue)
    if (isAdded) {
      Swal.fire({
        title: "Atención",
        text: `El cliente seleccionado ya se encuentra en la tabla`,
        icon: "error"
      })
    } else {

      let clientes = obtenerRegistros()
      const cliente = clientes.find((cliente) => cliente[0] == selectedValue)

      const clienteZona = obtenerRegistroZone()
      let counter;
      var rows = table.getData();
      console.log(rows)
      if (rows.length < 1){
        counter = 1;
      } else {
        var lastRow = rows[rows.length - 1];
        counter = lastRow.order + 1
      }
      const newClienteZona = {
        order: counter,
        clienteID: cliente[0], 
        clienteNombre: cliente[1], 
        clienteApellido: cliente[2], 
        clienteZone: zone, 
      }
      clienteZona.push(newClienteZona)
      table.addRow(newClienteZona)
      localStorage.setItem('clientesZona', JSON.stringify(clienteZona));
    }

  }
});

var btnPrintTable = document.querySelector("#printTableZonas");

btnPrintTable.addEventListener('click', () => {
  table.print("active", false, {columnGroups:false});
})


function obtenerRegistros() {

  var registros = localStorage.getItem("clientesData");
  if (registros) {
    return JSON.parse(registros);
  }
  return []; // Devolver un arreglo vacío si no hay registros
}
function obtenerRegistroZone() {

  const registros = localStorage.getItem("clientesZona");
  if (registros) {
    return JSON.parse(registros);
  }
  return []; // Devolver un arreglo vacío si no hay registros
}

function generarOpcionesSelect(selectElement, registros) {
  // Limpiar las opciones previas del select
  selectElement.innerHTML = "";

  // Agregar la opción "Seleccione un cliente"
  var option = document.createElement("option");
  option.value = "-1"; // Valor vacío
  option.textContent = "-- Selecone un cliente --";
  selectElement.appendChild(option);

  // Generar las opciones del select con los registros del DataTable
  registros.forEach(function (registro, index) {
    var option = document.createElement("option");
    option.value = registro[0]; // id como valor
    option.textContent = `${registro[1]} ${registro[2]}`; // Nombre del cliente como texto de la opción
    selectElement.appendChild(option);
  });
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
