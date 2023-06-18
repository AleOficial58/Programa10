
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


    let facturas = JSON.parse(localStorage.getItem('facturas'))
    facturas.map((factura, index) => {
        if (factura.facturaID == facturaID) {
            facturas.splice(index, 1)
        }
    })
    localStorage.setItem('facturas', JSON.stringify(facturas))

    location.reload();
}


function VerFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    location.href = `facturaVer.html?facturaID=${facturaID}`
}

function descargarFactura(btn) {
    const facturaID = btn.getAttribute('data-facturaID');
    window.open(`facturaDescargar.html?facturaID=${facturaID}`)

}




