"use strict";

var uploadFile = document.querySelector("#upload-file");
var uploadImage = document.querySelector(".img-upload__overlay");
var uploadCancel = uploadImage.querySelector("#upload-cancel");

var buttonMinus = uploadImage.querySelector(".resize__control--minus");
var buttonPlus = uploadImage.querySelector(".resize__control--plus");
var resizeValue = uploadImage.querySelector(".resize__control--value");

var scale = uploadImage.querySelector(".img-upload__scale");
var scaleLine = uploadImage.querySelector(".scale__line");
var scaleLevel = uploadImage.querySelector(".scale__level");
var scalePin = uploadImage.querySelector(".scale__pin");
var scaleValue = uploadImage.querySelector(".scale__value");

var effectsRadio = uploadImage.querySelector (".effects__radio"); 
var effects = uploadImage.querySelector(".img-upload__effects");
var preview = uploadImage.querySelector(".img-upload__preview");

var currentEffect;
var newEffect;

var onUploadImageEscPress = function (evt) {
  if (evt.keyCode === 27) {
    cancelUploadImage();
  };
};

var openUploadImage = function () {
  uploadImage.classList.remove("hidden");
  document.addEventListener("keydown", onUploadImageEscPress);
  effects.addEventListener("click", onEffectCheck);
  scalePin.addEventListener("mouseup", onScalePinMouseUp);
  currentEffect = "effects__preview--none";
};

var cancelUploadImage = function () {
  uploadImage.classList.add("hidden");
  document.removeEventListener("keydown", onUploadImageEscPress);
  uploadFile.value = "";
  preview.classList.replace(currentEffect, "effects__preview--none");
  preview.style.transform = "";
};

var resizeUploadImage = function (clickedButton) {
  var size = parseInt(resizeValue.value);
  clickedButton === "plus" ?
    size = size <= 75 ? size += 25 : size = 100
    :size = size >= 50 ? size -= 25 : size = 25;
  resizeValue.value = size + "%";
  preview.style.transform = "scale(" + size/100 + ")";
};

var setEffect = function (coefficient) {
  switch (currentEffect) {
    case "effects__preview--chrome":
      preview.style.filter = "grayscale(" + coefficient * 1 +")";
      break;
    case "effects__preview--sepia":
      preview.style.filter = "sepia(" + coefficient * 1 +")";
      break;
    case "effects__preview--marvin":
      preview.style.filter = "invert(" + coefficient * 100 +"%)";
      break;
    case "effects__preview--phobos":
      preview.style.filter = "blur(" + coefficient * 3 +"px)";
      break;
    case "effects__preview--heat":
      preview.style.filter = "brightness(" + (1 + coefficient * 2) +")";
      break;  
  };
};

var changeMarkupScale = function (coefficient) {
  var coefficientInPersent = Math.round(coefficient*100);
  scalePin.style.left = coefficientInPersent + "%";
  scaleLevel.style.width = coefficientInPersent + "%";
  scaleValue.value = coefficientInPersent;
};

var onScalePinMouseUp = function () {
  var lineLength = scaleLine.offsetWidth;
  var position = scalePin.offsetLeft;
  var coefficient = position / lineLength;
  changeMarkupScale (coefficient);
  setEffect(coefficient);
};

var onEffectCheck = function () {
  var selectedEffect = document.querySelector("input:checked").id;
  switch (selectedEffect) {
    case "effect-chrome":
      newEffect = "effects__preview--chrome";
      break;
    case "effect-sepia":
      newEffect = "effects__preview--sepia";
      break;
    case "effect-marvin":
      newEffect = "effects__preview--marvin";
      break;
    case "effect-phobos":
      newEffect = "effects__preview--phobos";
      break;
    case "effect-heat":
      newEffect = "effects__preview--heat";
      break;  
    default:
      newEffect = "effects__preview--none";
  };
  changeMarkupScale (1);
  preview.style.filter = "";
  preview.classList.replace(currentEffect, newEffect);
  newEffect === "effects__preview--none" ? scale.classList.add("hidden") : scale.classList.remove("hidden");
  currentEffect = newEffect;
};

uploadFile.addEventListener("change", function () {
  openUploadImage();
});

uploadCancel.addEventListener("click", function () {
  cancelUploadImage();
});

buttonMinus.addEventListener("click", function (){
  resizeUploadImage("minus");
});
buttonPlus.addEventListener("click", function (){
  resizeUploadImage("plus");
});