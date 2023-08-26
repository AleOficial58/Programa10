var listAgend = [];

function addRegistroToSystem(pnombre, papellido, pdni, pzona) {
  var ListFriend = {
    nombre: pnombre,
    apellido: papellido,
    dni: pdni,
    zona: pzona,
  };
  
  console.log(listAgend);
  listAgend.push(ListFriend);
  LocalStorageListAgend(listAgend);
  ImprimirTablaRegistro();
}
sessionStorage

function getListAgend() {
  var storedList = localStorage.getItem("LocallistAgend");
  if (storedList == null) {
    ListFriend = [];
  } else {
    ListFriend = JSON.parse(storedList);
  }
  return ListFriend;
}

function LocalStorageListAgend(plist) {
  localStorage.setItem('LocallistAgend', JSON.stringify(plist));
}
