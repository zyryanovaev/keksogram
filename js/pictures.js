"use strict";

var COUNT_PICTURES = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var MAX_COMMENTS = 10;
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max) - min)) + min;
}

var getComments = function (){
  var comments = [];
  for (var i = 0; i < getRandomInt (1, MAX_COMMENTS + 1); i++){
    var comment = COMMENTS[getRandomInt(0, COMMENTS.length)];
    if (getRandomInt(0, 2)){
      comment += COMMENTS[getRandomInt(0, COMMENTS.length)];
    }
    comments[i] = {
      avatar: "img/avatar-"+ getRandomInt(1,6) + ".svg",
      text: comment
    };
  }
  return comments;
}

var getDescription = function () {
  return DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)];
}
var photos = [];

for (var i = 0; i < COUNT_PICTURES; i++) {
  var photo = {
    url: "photos/" + (i + 1) + ".jpg",
    likes: getRandomInt (MIN_LIKE, MAX_LIKE + 1),
    comments: getComments(),
    description: getDescription()
  };
  photos.push(photo);
}

var containerPictures = document.querySelector(".pictures");
var templatePictures =  document.querySelector("#picture").content.querySelector(".picture__link");

var pictures = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  var elm = templatePictures.cloneNode(true);
  elm.querySelector(".picture__img").src = photos[i].url;
  elm.querySelector(".picture__stat--comments").textContent = photos[i].comments.length;
  elm.querySelector(".picture__stat--likes").textContent = photos[i].likes;
  pictures.appendChild(elm);
}

containerPictures.appendChild(pictures);

var bigPhoto = document.querySelector(".big-picture");
bigPhoto.classList.remove("hidden");
bigPhoto.querySelector(".big-picture__img").src = photos[0].url;
bigPhoto.querySelector(".comments-count").textContent = photos[0].comments.length;
bigPhoto.querySelector(".likes-count").textContent = photos[0].likes;

var containerComments = document.querySelector(".social__comments");
var templateComment = document.querySelector("#comment").content.querySelector(".social__comment");

var bigPhotoComments = document.createDocumentFragment();

for (var i = 0; i < photos[0].comments.length; i++) {
  var elm = templateComment.cloneNode(true); 
  elm.querySelector(".social__picture").src = photos[0].comments[i].avatar;
  elm.querySelector(".social__text").textContent = photos[0].comments[i].text; 
  bigPhotoComments.appendChild(elm);
}

containerComments.appendChild(bigPhotoComments);

var caption = document.querySelector(".social__caption");
caption.textContent = photos[0].description;

var socialCommentCount = document.querySelector(".social__comment-count");
socialCommentCount.classList.add ("visually-hidden");

var socialCommentLoadmore = document.querySelector(".social__loadmore");
socialCommentLoadmore.classList.add ("visually-hidden");