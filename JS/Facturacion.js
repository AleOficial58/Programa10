
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
        text: "Esta acción es inreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarla',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
            let facturas = JSON.parse(localStorage.getItem('facturas'))
            facturas.map((factura, index) => {
                if (factura.facturaID == facturaID) {
                    facturas.splice(index, 1)
                }
                
            })
            localStorage.setItem('facturas', JSON.stringify(facturas))
            let data = JSON.parse(localStorage.getItem("RegistroEnvioData"));
            data.map((registro, index) => { 
                if (registro.facturaID == facturaID) {
                    data.splice(index, 1)
                    
                }
            }) 
            localStorage.setItem('RegistroEnvioData', JSON.stringify(data))
            location.reload(); 
          Swal.fire(
            'Factura eliminada',
            `La factura ${facturaID} ha sido eliminada correctamente`,
            'success')
        }
      })


}


function VerFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    location.href = `facturaVer.html?facturaID=${facturaID}`
}

function descargarFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    window.open(`facturaDescargar.html?facturaID=${facturaID}`)

}




