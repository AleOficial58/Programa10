document.getElementById('btnRegistrarCliente').addEventListener('click', Guardar);

function Guardar() {
  var aNuevoRegistro = [],
    sCedula = '',
    sNombre = '';

  sCedula = document.getElementById('txtCedula').value;
  sNombre = document.getElementById('txtNombre').value;

  console.log('Cedula: ' + sCedula);
  console.log('Nombre: ' + sNombre);
}
