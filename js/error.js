"use strict";
(function() {
  var errorMessage = document.querySelector(".error");

  var showError = function (message) {
    errorMessage.innerHTML = message;
    errorMessage.classList.remove("hidden");
    setTimeout(function () {errorMessage.classList.add("hidden")}, 5000);    
  };

  window.error = {
    show: showError
  };
}());



