"use strict";

(function() {
  var MIN_NUMBER_AVATAR = 1;
  var MAX_NUMBER_AVATAR = 6;
  var MIN_COUNT = 5;
  var STEP_COUNT = 5;

  var bigPhotoContainer = document.querySelector(".big-picture");
  var containerComments = document.querySelector(".social__comments");
  var templateComment = document.querySelector("#comment").content.querySelector(".social__comment");
  var caption = document.querySelector(".social__caption");
  var socialCommentCount = document.querySelector(".social__comment-count");
  var socialCommentLoadmore = document.querySelector(".social__loadmore");
  var bigPhotoCancelButton = bigPhotoContainer.querySelector(".big-picture__cancel"); 
  var showedComments = 0;
  var commentCount;
  var newComments;
  var bigPhoto;
  var bigPhotoComments;

  var getRandomIntegerFromInterval = function(min, max) {
    return Math.floor(Math.random() * ((max) - min)) + min;
  };

  var addBigPhotoComments = function(firstIndex, lastIndex) {
    for (var i = firstIndex; i < lastIndex; i++) {
      var elm = templateComment.cloneNode(true); 
      elm.querySelector(".social__picture").src = "img/avatar-"+ getRandomIntegerFromInterval(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR + 1) + ".svg",
      elm.querySelector(".social__text").textContent = bigPhoto.comments[i]; 
      bigPhotoComments.appendChild(elm);
    };
  };
  
  var showComments = function(loadmoreComment) {
    newComments = commentCount <= loadmoreComment ?  commentCount : loadmoreComment;
    socialCommentCount.textContent = newComments + " из " + commentCount + " комментариев" ;
    if (newComments === commentCount)
      socialCommentLoadmore.classList.add ("visually-hidden");
    addBigPhotoComments(showedComments, newComments);
    containerComments.appendChild(bigPhotoComments);
    showedComments = newComments;
  };

  var onSocialCommentLoadmoreClick = function() {
    showComments(newComments + STEP_COUNT);
  };

  var createBigPhotoComments = function() {
    containerComments.innerHTML = ""
    bigPhotoComments = document.createDocumentFragment();
    showComments(MIN_COUNT);
  };

  var onBigPhotoCancelButtonClick = function() {
    closeBigPhoto();
  };

  var onBigPhotoEscPress = function(evt) {
    if (evt.keyCode === 27) {
      closeBigPhoto();
    };
  };

  var removeEventListeners = function() {
    document.removeEventListener("keydown", onBigPhotoEscPress);
    bigPhotoCancelButton.removeEventListener("click", onBigPhotoCancelButtonClick);
    socialCommentLoadmore.removeEventListener("click", onSocialCommentLoadmoreClick);
  };

  var addEventListeners = function() {
    document.addEventListener("keydown", onBigPhotoEscPress);
    bigPhotoCancelButton.addEventListener("click", onBigPhotoCancelButtonClick);
    socialCommentLoadmore.addEventListener("click", onSocialCommentLoadmoreClick);
  };

  var closeBigPhoto = function() {
    bigPhotoContainer.classList.add("hidden");
    removeEventListeners();
    showedComments = 0;
  };

  var openBigPhoto = function(photo) {
    bigPhoto = photo;
    commentCount = photo.comments.length;
    
    bigPhotoContainer.classList.remove("hidden");
    socialCommentLoadmore.classList.remove ("visually-hidden");
    addEventListeners();
    
    createBigPhotoComments();
    bigPhotoContainer.querySelector(".big-picture__img").src = photo.url;
    bigPhotoContainer.querySelector(".likes-count").textContent = photo.likes;
    caption.textContent = photo.description;
  };  
  
  window.preview = {
    open : openBigPhoto,
  };
}());


