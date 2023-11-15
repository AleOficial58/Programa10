
const facturasData = JSON.parse(localStorage.getItem('facturas'));

const facturasTable = facturasData.map((factura) => {
    return [
        factura.facturaID,
        factura.fecha,
        factura.clienteNombre + " " + factura.clienteApellido,
        factura.total,
        `<button onclick="descargarFactura(this)" data-clienteID="${factura.clienteID}" data-facturaID="${factura.facturaID}">Descargar</button>
        <button onclick="VerFactura(this)" data-clienteID="${factura.clienteID}" data-facturaID="${factura.facturaID}">Ver</button>
        <button class="botonEliminar" onclick="EliminarFactura(this)" data-clienteID="${factura.clienteID}" data-facturaID="${factura.facturaID}">EliminarFactura</button>`
    ]
})


$('#facturasTable').DataTable({
    data: facturasTable,
    columns: [
        { title: "ID" },
        { title: "FECHA" },
        { title: "CLIENTE" },
        { title: "TOTAL" },
        { title: "OPCIONES" },
    ]
});


function EliminarFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');

    Swal.fire({
        title: `¿Está seguro que desea eliminar la factura ${facturaID}?`,
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarla',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            // Mostrar el overlay antes de la eliminación
            document.getElementById('loadingOverlay').style.display = 'flex';

            // Simular una demora de 2 segundos antes de continuar con la eliminación
            setTimeout(() => {
                let facturas = JSON.parse(localStorage.getItem('facturas'))
                facturas = facturas.filter(factura => factura.facturaID != facturaID);
                localStorage.setItem('facturas', JSON.stringify(facturas));

                let data = JSON.parse(localStorage.getItem("RegistroEnvioData"));
                data = data.filter(registro => registro.facturaID != facturaID);
                localStorage.setItem('RegistroEnvioData', JSON.stringify(data));

                location.reload();

                // Ocultar el overlay después de 2 segundos
                setTimeout(() => {
                    document.getElementById('loadingOverlay').style.display = 'none';
                }, 2000);

                Swal.fire(
                    'Factura eliminada',
                    `La factura ${facturaID} ha sido eliminada correctamente`,
                    'success'
                );
            }, 2000); // 2 segundos de demora
        }
    });
}


function VerFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    
    document.getElementById('loadingOverlay').style.display = 'flex'; // Muestra el loading

    setTimeout(function () {
        location.href = `facturaVer.html?facturaID=${facturaID}`;
    }, 2000); // Simula una demora de 2 segundos antes de redirigir
}


function descargarFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    window.open(`facturaDescargar.html?facturaID=${facturaID}`)
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


