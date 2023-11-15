//RECARGA//

window.addEventListener("keyup", function (e) {
    if (e.key === "F5") {
        document.getElementById('loadingOverlay').style.display = 'flex';
        setTimeout(function () {
            location.reload(true);
        }, 3000);
    }
  });
  
  //RECARGA//