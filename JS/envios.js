let data = JSON.parse(localStorage.getItem("RegistroEnvioData"));

var tableProductos = $("#productos").DataTable({
  data: [],
  responsive: true,
  width: "100%",
  columns: [
    { title: "ID" },
    { title: "NOMBRe" },
    { title: "CANTIDAD" },
    { title: "PRECIO UNITARIO" },
    { title: "SUBTOTAL" },
  ],
});

//   factura.productos.length

var rows;

if (data) {
  rows = data.map((registro) => {
    let factura = JSON.parse(localStorage.getItem("facturas")).find((factura) => factura.facturaID == registro.facturaID);
    return [
      registro.cliente.nombre,
      registro.cliente.apellido,
      registro.cliente.direccion,
      registro.cliente.dni,
      factura.facturaID,
      `<button type="button" class="btn btn-primary" data-facturaID="${factura.facturaID}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ver productos
            </button>`,
      factura.total,
      registro.id,
    ];
  });
}

$("#registroEnvios").DataTable({
  data: rows,
  order: [[7, "asc"]],
  searching: true,
  searchDelay: 500,
  columns: [
    { title: "NOMBRE" },
    { title: "APELLIDO" },
    { title: "DIRECCIÓN" },
    { title: "DNI" },
    { title: "ID FACTURA" },
    { title: "PRODUCTOS" },
    { title: "TOTAL" },
    { title: "NO. PEDIDO" },
  ],
});

var myModal = document.getElementById("exampleModal");
myModal.addEventListener("shown.bs.modal", function (e) {
  const facturaID = e.relatedTarget.getAttribute("data-facturaID");
  let factura = JSON.parse(localStorage.getItem("facturas")).find(
    (factura) => factura.facturaID == facturaID
  );
  tableProductos.clear().draw();
  tableProductos.rows.add(factura.productos).draw();
});


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