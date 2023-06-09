// Clase Producto
class Producto {
  constructor(id, zona, precio) {
    this.id = id;
    this.zona = zona;
    this.precio = precio;
  }
}
// Clase Cliente
class Cliente {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

// Clase Venta
class Venta {
  constructor(id, zona, precio, cliente) {
    this.id = id;
    this.zona = zona;
    this.precio = precio;
    this.cliente = cliente;
  }
}

// Clase SistemaVentas
class SistemaVentas {
  constructor() {
    this.inventario = [];
    this.ventas = [];
  }

  agregarProducto() {
    const id = document.getElementById("idProducto").value;
    const zona = document.getElementById("zonaProducto").value;
    const precio = document.getElementById("precioProducto").value;

    const producto = new Producto(id, zona, precio);
    this.inventario.push(producto);

    this.actualizarTablaInventario();
    this.limpiarCamposProducto();
  }

  realizarVenta() {
    const idVenta = document.getElementById("idVenta").value;
    const nombreCliente = document.getElementById("nombreClienteVenta").value;
    const apellidoCliente = document.getElementById("apellidoClienteVenta").value;
    const dniCliente = document.getElementById("dniClienteVenta").value;

    const producto = this.inventario.find((p) => p.id === idVenta);

    if (producto) {
      const cliente = new Cliente(nombreCliente, apellidoCliente, dniCliente);
      const venta = new Venta(producto.id, producto.zona, producto.precio, cliente);

      this.ventas.push(venta);

      // Eliminar el producto del inventario
      const index = this.inventario.indexOf(producto);
      this.inventario.splice(index, 1);

      this.actualizarTablaInventario();
      this.actualizarTablaVentas();
      this.limpiarCamposVenta();
    }
  }

  buscarProducto() {
    const searchTerm = document.getElementById("buscarInput").value.toLowerCase();

    const productosEncontrados = this.inventario.filter(
      (p) =>
        p.id.toLowerCase().includes(searchTerm) ||
        p.zona.toLowerCase().includes(searchTerm) ||
        p.precio.toString().includes(searchTerm)
    );

    this.actualizarTablaInventario(productosEncontrados);
  }

  buscarCliente() {
    const searchTerm = document.getElementById("buscarCliente").value.toLowerCase();

    const ventasCliente = this.ventas.filter(
      (v) =>
        v.cliente.nombre.toLowerCase().includes(searchTerm) ||
        v.cliente.apellido.toLowerCase().includes(searchTerm) ||
        v.cliente.dni.includes(searchTerm)
    );

    this.actualizarTablaVentas(ventasCliente);
  }

  restaurarInventario() {
    this.inventario = [];

    // Restaurar inventario original
    const productosOriginales = [
      new Producto("001", "Zona A", 100),
      new Producto("002", "Zona B", 200),
      new Producto("003", "Zona C", 300),
      new Producto("004", "Zona A", 150),
      new Producto("005", "Zona B", 250),
    ];

    this.inventario = productosOriginales;

    this.actualizarTablaInventario();
  }

  actualizarTablaInventario(productos = this.inventario) {
    const tablaInventario = document.getElementById("tablaInventario");
    const tbody = tablaInventario.querySelector("tbody");

    // Limpiar tabla
    tbody.innerHTML = "";

    // Llenar tabla con productos
    productos.forEach((p) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.zona}</td>
        <td>${p.precio}</td>
      `;
      tbody.appendChild(row);
    });
  }

  actualizarTablaVentas(ventas = this.ventas) {
    const tablaVentas = document.getElementById("tablaVentas");
    const tbody = tablaVentas.querySelector("tbody");

    // Limpiar tabla
    tbody.innerHTML = "";

    // Llenar tabla con ventas
    ventas.forEach((v) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${v.id}</td>
        <td>${v.zona}</td>
        <td>${v.precio}</td>
        <td>${v.cliente.nombre} ${v.cliente.apellido} (${v.cliente.dni})</td>
      `;
      tbody.appendChild(row);
    });
  }

  limpiarCamposProducto() {
    document.getElementById("idProducto").value = "";
    document.getElementById("zonaProducto").value = "";
    document.getElementById("precioProducto").value = "";
  }

  limpiarCamposVenta() {
    document.getElementById("idVenta").value = "";
    document.getElementById("nombreClienteVenta").value = "";
    document.getElementById("apellidoClienteVenta").value = "";
    document.getElementById("dniClienteVenta").value = "";
  }
}

// Instancia del sistema de ventas
const sistemaVentas = new SistemaVentas();

// Eventos de botones
document.getElementById("agregarBtn").addEventListener("click", () => {
  sistemaVentas.agregarProducto();
});

document.getElementById("ventaBtn").addEventListener("click", () => {
  sistemaVentas.realizarVenta();
});

document.getElementById("buscarBtn").addEventListener("click", () => {
  sistemaVentas.buscarProducto();
});

document.getElementById("buscarClienteBtn").addEventListener("click", () => {
  sistemaVentas.buscarCliente();
});

document.getElementById("restaurarBtn").addEventListener("click", () => {
  sistemaVentas.restaurarInventario();
});
