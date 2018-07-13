"use strict";
(function() {
  var URL_FOR_DOWNLOAD_DATA = "https://js.dump.academy/kekstagram/data";
  var URL_FOR_UPLOAD_DATA = "https://js.dump.academy/kekstagram"

  var checkStatus = function (xhr, onLoad, onError) {
    switch (xhr.status) {
      case 200:
        onLoad (xhr.response);
        break;
      default:
        onError ("Произошла ошибка с кодом " + xhr.status);
        break;
    };
  };

  var downloadData = function() {
    var xhr = new XMLHttpRequest ();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      checkStatus(xhr, window.picture.render, window.error.show);
    });
    xhr.open ("GET", URL_FOR_DOWNLOAD_DATA);
    xhr.send ();
  };

  var uploadData = function(data) {
    var xhr = new XMLHttpRequest ();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
        checkStatus(xhr, window.form.hide, window.error.show);    
    });
    xhr.open ("POST", URL_FOR_UPLOAD_DATA);
    xhr.send (data);
  };
  
  window.backend = {
    download: downloadData,
    upload: uploadData
  };
})();