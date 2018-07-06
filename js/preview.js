"use strict";

(function() {

  var bigPhoto = document.querySelector(".big-picture");
  var containerComments = document.querySelector(".social__comments");
  var templateComment = document.querySelector("#comment").content.querySelector(".social__comment");
  var caption = document.querySelector(".social__caption");
  var socialCommentCount = document.querySelector(".social__comment-count");
  var socialCommentLoadmore = document.querySelector(".social__loadmore");
  var bigPhotoCancelButton = bigPhoto.querySelector(".big-picture__cancel"); 
  
  var getBigPhotoComments = function (photo) {
    containerComments.innerHTML = ""
    var bigPhotoComments = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var elm = templateComment.cloneNode(true); 
      elm.querySelector(".social__picture").src = photo.comments[i].avatar;
      elm.querySelector(".social__text").textContent = photo.comments[i].text; 
      bigPhotoComments.appendChild(elm);
    };
    return bigPhotoComments;
  };

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeBigPhoto();
    };
  };
  
  var closeBigPhoto = function () {
    bigPhoto.classList.add("hidden");
    document.removeEventListener("keydown", onBigPhotoEscPress);
  };
  
  var openBigPhoto = function (photo) {
    document.addEventListener("keydown", onBigPhotoEscPress);
    bigPhotoCancelButton.addEventListener("click", function () {
      closeBigPhoto();
    }); 

    bigPhoto.classList.remove("hidden");
    socialCommentCount.classList.add ("visually-hidden");
    socialCommentLoadmore.classList.add ("visually-hidden");
  
    bigPhoto.querySelector(".big-picture__img").src = photo.url;
    bigPhoto.querySelector(".comments-count").textContent = photo.comments.length;
    bigPhoto.querySelector(".likes-count").textContent = photo.likes;
    caption.textContent = photo.description;
    containerComments.appendChild(getBigPhotoComments(photo));
  };  
  
  window.preview = {
    open : openBigPhoto,
  };
}());
