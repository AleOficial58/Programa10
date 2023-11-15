const loadData = () => {
    const fac = localStorage.getItem("facturas");
    if (fac) return JSON.parse(fac);
    return [];
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
}

const dataProcessed = (data, isFirst = false) => {
    let output = [];

    let date = document.querySelector("#date").value
    if (isFirst) date = new Date().toISOString().split("T")[0];

    const user = getCurrentUser();

    data.forEach((invoice, index) => {
        if (invoice.fecha == date && invoice.vendedor.id == user.id) {
            output.push({
                order: index,
                clientID: invoice.clienteID,
                client: `${invoice.clienteNombre} ${invoice.clienteApellido}`,
                amount: invoice.total,
                percentage: 0,
                percentage_value: 0.00
            })
        }

    });
    return output;
}

var table = new Tabulator("#comision", {
    data: dataProcessed(loadData(), true),
    layout: "fitColumns",
    index: "order",
    placeholder: "Debe selecionar una fecha",
    columns: [
        { title: "CLIENTE", field: "client" },
        {
            title: "MONTO", field: "amount", formatter: "money", formatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$ ",
                precision: 2,
            },
            bottomCalc: "sum", bottomCalcParams: {
                precision: 2,
            }

        },
        {
            title: "PORCENTAJE", field: "percentage", editor: "number", validator:["min:0", "max:100"], formatter: "money", formatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: " %",
                symbolAfter: "p",
                precision: 2,
            }
        },
        {
            title: "MONTO PORCENTAJE", field: "percentage_value", formatter: "money", formatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$ ",
                precision: 2,
            },
            bottomCalc: "sum", bottomCalcParams: {
                precision: 2,
            }
        },
    ],
    printHeader: `<h1>PLANILLA DE COMISIÓN DE ${getCurrentUser().first_name.toUpperCase()}  ${getCurrentUser().last_name.toUpperCase()}</h1>`
});

table.on("cellEdited", function (row) {
    if (row.getField() === "percentage") {
        let amount = parseFloat(row.getData().amount);
        let percentage = parseFloat(row.getData().percentage);
        let percentage_value = ((percentage / 100) * amount).toFixed(2)
        row.getRow().update({ percentage_value: percentage_value });
    }
});

document.querySelector("#date").addEventListener('change', () => {
    table.setData(dataProcessed(loadData()))
})

const btnApply = document.querySelector("#apply")
btnApply.addEventListener('click', () => {
    const _percentage = document.querySelector("#percentage").value;
    if (_percentage == "") return;

    const _data = table.getData();
    let data_processed = [];
    for (const key in _data) {
        let amount = parseFloat(_data[key].amount);
        let percentage = parseFloat(_percentage).toFixed(2);
        let percentage_value = ((percentage / 100) * amount).toFixed(2)

        data_processed.push({
            clientID: _data[key].clientID,
            client: _data[key].client,
            amount: amount,
            percentage: percentage,
            percentage_value: percentage_value,
        })
    }
    table.replaceData(data_processed)

})

var btnPrintTable = document.querySelector("#printTable");
btnPrintTable.addEventListener('click', () => {
    table.print(false, true);
})


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