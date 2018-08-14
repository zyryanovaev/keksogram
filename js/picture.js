"use strict";

(function() {

  var containerPictures = document.querySelector(".pictures");
  var templatePictures =  document.querySelector("#picture").content.querySelector(".picture__link");
    
  var generateMarkup = function(photo){
      var elm = templatePictures.cloneNode(true);
      elm.querySelector(".picture__img").src = photo.url;
      elm.querySelector(".picture__stat--comments").textContent = photo.comments.length;
      elm.querySelector(".picture__stat--likes").textContent = photo.likes;
      elm.addEventListener("click", function() {
        window.preview.open(photo);
      });
    return elm;
  };

  var removeItems = function() {
    var items = document.querySelectorAll(".picture__link");
    items.forEach (function(elment) {
      elment.remove();
    });
  };
  
  var renderMarkup = function(photos) {
    removeItems();
    var pictures = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      pictures.appendChild(generateMarkup(photos[i]));
    };
    containerPictures.appendChild(pictures); 
  };

  window.backend.download();
  window.picture = {
    render: renderMarkup
  };
}());
