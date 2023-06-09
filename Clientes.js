$(document).ready(function () {
    var table = $('#clientesTable').DataTable();
    // Obtener datos almacenados en el Local Storage y cargarlos en el DataTables
    var storedData = localStorage.getItem('clientesData');
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        table.rows.add(parsedData).draw();
    }
    function generateUniqueID() {
        var uniqueID = '';
        var digits = '0123456789';
        for (var i = 0; i < 6; i++) {
            uniqueID += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return uniqueID;
    }
    $('#agregarClienteForm').on('submit', function (e) {
        e.preventDefault();
        debugger

        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var dni = $('#dni').val();
        var localidad = $('#localidad').val();
        var direccion = $('#direccion').val();
        var telefono = $('#telefono').val();
        var condicion = $('#condicion').val();
        var codigoID = generateUniqueID();

        var rowData = [codigoID, nombre, apellido, dni, localidad, direccion, telefono, condicion];
        var editButton =
            '<button type="button" data-bs-toggle="modal" data-bs-target="#modalClientes-act" class="btn btn-sm btn-primary btn-editar" data-id="' +
            codigoID + '"> <i class="bi bi-pencil-square"></i></button>';
        var deleteButton = '<button type="button" class="btn btn-sm btn-danger btn-eliminar" data-id="' +
            codigoID +
            '"><i class="bi bi-trash3-fill"></i></button>';

        rowData.push(editButton + ' ' + deleteButton);
        table.row.add(rowData).draw();

        // Actualizar datos en el almacenamiento local
        var tableData = table.rows().data().toArray();
        localStorage.setItem('clientesData', JSON.stringify(tableData));

        // Limpiar el formulario
        $('#agregarClienteForm')[0].reset();
        $('#cerrar-cliente').click();
    });

    $('#actualizarClienteForm').on('submit', function (e) {
        e.preventDefault();
        debugger
        var id = $('#id-cliente').val();
        var fila = $('#rowS').val()
        var rowData = [id, $('#nombre-act').val(), $('#apellido-act').val(), $('#dni-act').val(),
            $('#localidad-act').val(), $('#direccion-act').val(), $('#telefono-act').val(), $('#condicion').val(), $('#botones').val()];
        table.row(fila).data(rowData).draw();
        var tableDatas = table.rows().data().toArray();
        localStorage.setItem('clientesData', JSON.stringify(tableDatas));
        $('#actualizarClienteForm')[0].reset();
        $('#cerrar-cliente-act').click();
    });

    // Delegación de eventos click para los botones de editar
    $('#clientesTable tbody').on('click', '.btn-editar', function () {
        debugger
        var clienteSeleccionado = table.row($(this).closest('tr')).data();
        var rowS = $(this).closest('tr')
        // var codigoID = $(this).data('id'); //obtener id
        // var storedData = JSON.parse(localStorage.getItem('clientesData')); //array clientes
        // var clienteSeleccionado = rowData.find(item => item[0] === codigoID.toString())//buscas el cliente por id
        if (clienteSeleccionado.length > 0) {//mapeo de datos del cliente
            $('#id-cliente').val(clienteSeleccionado[0]);
            $('#nombre-act').val(clienteSeleccionado[1]);
            $('#apellido-act').val(clienteSeleccionado[2]);
            $('#dni-act').val(clienteSeleccionado[3]);
            $('#localidad-act').val(clienteSeleccionado[4]);
            $('#direccion-act').val(clienteSeleccionado[5]);
            $('#telefono-act').val(clienteSeleccionado[6]);
            $('#condicion-act').val(clienteSeleccionado[7]);
            $('#botones').val(clienteSeleccionado[8])
            $('#rowS').val(rowS[0]._DT_RowIndex)
        }
        // var rowData = table.row($(this).closest('tr')).data();
        // Aquí puedes realizar la acción que necesites con los datos de la fila seleccionada
        // console.log('Editar', rowData);
    });

    $('#cerrar-cliente').on('click', function () {
        $('#nombre').val('');
        $('#apellido').val('');
        $('#dni').val('');
        $('#localidad').val('');
        $('#direccion').val('');
        $('#telefono').val('');
        $('#condicion').val('');
    });

    $('#button-cerrar').on('click', function () {
        $('#nombre').val('');
        $('#apellido').val('');
        $('#dni').val('');
        $('#localidad').val('');
        $('#direccion').val('');
        $('#telefono').val('');
        $('#condicion').val('');
    });

    $('#cerrar-cliente-act').on('click', function () {
        $('#nombre').val('');
        $('#apellido').val('');
        $('#dni').val('');
        $('#localidad').val('');
        $('#direccion').val('');
        $('#telefono').val('');
        $('#condicion').val('');
    });

    $('#button-cerrar-act').on('click', function () {
        $('#nombre').val('');
        $('#apellido').val('');
        $('#dni').val('');
        $('#localidad').val('');
        $('#direccion').val('');
        $('#telefono').val('');
        $('#condicion').val('');
    });

    // Delegación de eventos click para los botones de eliminar
    $('#clientesTable tbody').on('click', '.btn-eliminar', function () {
        if (!window.confirm(`Estas seguro que deseas eliminar este registro?`)) {
            return;
        }
        var codigoID = $(this).data('id');
        var rowData = table.row($(this).closest('tr')).data();
        // Aquí puedes realizar la acción que necesites con los datos de la fila seleccionada
        console.log('Eliminar', rowData);
        // Aquí puedes eliminar la fila de la tabla
        table.row($(this).closest('tr')).remove().draw();

        // Actualizar datos en el almacenamiento local
        var tableData = table.rows().data().toArray();
        localStorage.setItem('clientesData', JSON.stringify(tableData));
    });
});

// Función para obtener los datos del dataTable en Clientes.html
function obtenerDatosDataTable() {
    // Lógica para obtener los datos del dataTable
    // ...
  
    return dataTableData; // Retornar los datos obtenidos
  }
  
  // Obtener los datos del dataTable en Clientes.html
  var dataTableData = obtenerDatosDataTable();
  
  // Guardar los datos en el Local Storage
  localStorage.setItem('dataTableData', JSON.stringify(dataTableData));
  

  