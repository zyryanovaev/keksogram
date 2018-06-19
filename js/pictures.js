"use strict";

var COUNT_PICTURES = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var MAX_COMMENTS = 5;
var MIN_NUMBER_AVATAR = 1;
var MAX_NUMBER_AVATAR = 6;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var containerPictures = document.querySelector(".pictures");
var templatePictures =  document.querySelector("#picture").content.querySelector(".picture__link");

var bigPhoto = document.querySelector(".big-picture");
var containerComments = document.querySelector(".social__comments");
var templateComment = document.querySelector("#comment").content.querySelector(".social__comment");
var caption = document.querySelector(".social__caption");
var socialCommentCount = document.querySelector(".social__comment-count");
var socialCommentLoadmore = document.querySelector(".social__loadmore");
var bigPhotoCancelButton = bigPhoto.querySelector(".big-picture__cancel"); 


var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * ((max) - min)) + min;
};

var getComments = function (){
  var comments = [];
  for (var i = 0; i < getRandomIntegerFromInterval (1, MAX_COMMENTS + 1); i++){
    var comment = COMMENTS[getRandomIntegerFromInterval(0, COMMENTS.length)];
    if (getRandomIntegerFromInterval(0, 2)){
      comment += COMMENTS[getRandomIntegerFromInterval(0, COMMENTS.length)];
    };
    comments[i] = {
      avatar: "img/avatar-"+ getRandomIntegerFromInterval(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR + 1) + ".svg",
      text: comment
    };
  };
  return comments;
};

var getDescription = function () {
  return DESCRIPTIONS[getRandomIntegerFromInterval(0, DESCRIPTIONS.length)];
};

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

var openBigPhoto = function (photo) {
  bigPhoto.classList.remove("hidden");
  socialCommentCount.classList.add ("visually-hidden");
  socialCommentLoadmore.classList.add ("visually-hidden");

  bigPhoto.querySelector(".big-picture__img").src = photo.url;
  bigPhoto.querySelector(".comments-count").textContent = photo.comments.length;
  bigPhoto.querySelector(".likes-count").textContent = photo.likes;
  caption.textContent = photo.description;
  containerComments.appendChild(getBigPhotoComments(photo));
};

var generatePictures = function (countPictures) {
  var photos = [];
  for (var i = 0; i < countPictures; i++) {
    var photo = {
      url: "photos/" + (i + 1) + ".jpg",
      likes: getRandomIntegerFromInterval (MIN_LIKE, MAX_LIKE + 1),
      comments: getComments(),
      description: getDescription()
    };
    photos.push(photo);
  };
  return photos;
};

var generateMarkup = function (photos){
  var pictures = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var elm = templatePictures.cloneNode(true);
    var photo = photos[i];
    elm.querySelector(".picture__img").src = photo.url;
    elm.querySelector(".picture__stat--comments").textContent = photo.comments.length;
    elm.querySelector(".picture__stat--likes").textContent = photo.likes;
    elm.addEventListener("click", function () {
      openBigPhoto(photo);
      bigPhoto.addEventListener("keydown", onBigPhotoEscPress);
    });
    pictures.appendChild(elm);
  };
  return pictures;
};

var renderMarkup = function (pictures) {
  containerPictures.appendChild(pictures);  
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

var photos = generatePictures (COUNT_PICTURES);
var markup = generateMarkup (photos);
renderMarkup (markup);

bigPhotoCancelButton.addEventListener("click", function () {
  closeBigPhoto();
}); 




