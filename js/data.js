"use strict";
(function() {
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
  
  window.data = generatePictures (COUNT_PICTURES);
})();
