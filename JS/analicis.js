
var table1 = $('#facturasTable').DataTable({
    data: [],
    columns: [
        { title: "ID" },
        { title: "FECHA" },
        { title: "CLIENTE" },
        { title: "SUBTOTAL" }
    ],
    footerCallback: function (row, data, start, end, display) {
        var api = this.api();

        // Calcular la suma de la columna "Subtotal"
        var subtotalTotal = api.column(3, { page: 'current' }).data()
            .reduce(function (acc, value) {
                return acc + parseFloat(value);
            }, 0);

        // Agregar el valor de la suma debajo de la columna "Subtotal"
        $(api.column(3).footer()).html(subtotalTotal.toFixed(2));
        // $('#totalValue').text(subtotalTotal.toFixed(2));
    }
});


// load client in select field
const clientesData = JSON.parse(localStorage.getItem("clientesData"));
let option = document.createElement("option");
option.value = "";
option.text = "todos";
document.getElementById("cliente").appendChild(option);

clientesData.forEach((cliente) => {
    let option = document.createElement("option");
    option.value = cliente[0];
    option.text = cliente[1] + " " + cliente[2];
    document.getElementById("cliente").appendChild(option);
});


let btn = document.getElementById("btn-run")
function formatRow(fact) {
    return fact.map((factura) => {
        return [
            `<a href="facturaVer.html?facturaID=${factura.facturaID}">${factura.facturaID}</a>`,
            factura.fecha,
            factura.clienteNombre + " " + factura.clienteApellido,
            factura.total
        ]
    })
}

btn.addEventListener("click", () => {

    let start_date = document.getElementById("start_date").value
    let end_date = document.getElementById("end_date").value
    let cliente = document.getElementById("cliente")
    let clienteID = cliente.options[cliente.selectedIndex].value

    const facturasData = localStorage.getItem("facturas")
    const facturas = JSON.parse(facturasData)

    let range = facturas.filter((factura) => {
        if (clienteID != "") {
            if (
                factura.fecha >= start_date &&
                factura.fecha <= end_date
                && factura.clienteID == clienteID
                ) {
                return true;
            }
        } else {

            if (
                factura.fecha >= start_date &&
                factura.fecha <= end_date
                ) {
                return true;
            }
        }

    })
    table1.clear().draw();
    table1.rows.add(formatRow(range)).draw();


})



