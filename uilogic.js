document.addEventListener("DOMContentLoaded", function() {
    loadTableFromLocalStorage(); // Carga la tabla desde el almacenamiento local al cargar el DOM
  
    document.querySelector('#btnListAgend').addEventListener('click', SaveRegistro);
  });
  
  function SaveRegistro() {
    var sNombre = document.querySelector('#firstName').value,
        sApellido = document.querySelector('#lastName').value,
        sDNI = document.querySelector('#dni').value,
        sZona = document.querySelector('#zone').value;
  
    addRegistroToSystem(sNombre, sApellido, sDNI, sZona);
    saveListToLocalStorage(); // Guarda la lista actualizada en el almacenamiento local
    loadTableFromLocalStorage(); // Carga la tabla actualizada desde el almacenamiento local
  }
  
  function addRegistroToSystem(pnombre, papellido, pdni, pzona) {
    var ListFriend = {
      nombre: pnombre,
      apellido: papellido,
      dni: pdni,
      zona: pzona,
    };
  
    listAgend.push(ListFriend);
  }
  
  function saveListToLocalStorage() {
    localStorage.setItem('LocallistAgend', JSON.stringify(listAgend));
  }
  
  function loadTableFromLocalStorage() {
    listAgend = getListFromLocalStorage();
    var tbody = document.querySelector('#clientTable tbody');
  
    tbody.innerHTML = '';
  
    for (var i = 0; i < listAgend.length; i++) {
      var row = tbody.insertRow(i);
      var nameCell = row.insertCell(0);
      nameCell.innerHTML = listAgend[i].nombre;
  
      var lastNameCell = row.insertCell(1);
      lastNameCell.innerHTML = listAgend[i].apellido;
  
      var dniCell = row.insertCell(2);
      dniCell.innerHTML = listAgend[i].dni;
  
      var zonaCell = row.insertCell(3);
      zonaCell.innerHTML = listAgend[i].zona;
    }
  }
  
  function getListFromLocalStorage() {
    var storedList = localStorage.getItem("LocallistAgend");
    return storedList ? JSON.parse(storedList) : [];
  }
  
